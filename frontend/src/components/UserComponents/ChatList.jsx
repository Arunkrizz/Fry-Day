import { Box, Stack, Text } from "@chakra-ui/layout"
import { Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react"
import { ChatState } from "../context/chatProvider"
import { useEffect } from "react"
import { useSelector } from 'react-redux';
import { useFetchChatMutation,useDeleteNotificationMutation ,useMarkAsReadUpdateMutation} from '../../slices/userApiSlice'
import { getSender } from "../config/chatLogics"
import { BellIcon,Icon } from "@chakra-ui/icons";
import NotificationBadge from 'react-notification-badge'
import { Effect } from "react-notification-badge"
import { format } from 'date-fns';

const ChatList = ({fetchAgain}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { selectedChat, setSelectedChat, chats, setChats, notification, setNotification } = ChatState()
  const [fetchChat] = useFetchChatMutation()
  const [markAsRead] = useDeleteNotificationMutation()
  const [markMsgRead] =useMarkAsReadUpdateMutation()
  const userId = userInfo.id
  const toast = useToast()

  const fetchChats = async () => {
    try {
      const { data } = await fetchChat()
      setChats(data)
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error Occurred, Cant fetch Chat List",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      })
    }
  }

  useEffect(() => {
    fetchChats()
  }, [])

  const handleNotificationClick = async (notification) => {
    try {
        setSelectedChat(notification.chat);
        setNotification((prevNotifications) => [
          ...prevNotifications.filter((n) => n?._id !== notification?._id),
        ]);

        await markMsgRead(notification?.chat?._id).then(fetchChats())

        if (notification._id) {
            // Execute only for notifications from the database
            await markAsRead(notification?._id);
        }
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
};


  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="1g"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <Menu>
        
        <MenuButton p={1}>
          <NotificationBadge
            count={notification?.length}
            effect={Effect.SCALE}
          />
          <BellIcon fontSize="2xl" m={1} />
        </MenuButton>
        <MenuList pl={2}>
          {!notification?.length && "No New Messages"}
            {notification?.map((notif) => (
            <MenuItem
              key={notif._id}
              onClick={() => handleNotificationClick(notif)}
            >
               {`New Message from ${getSender(userId, notif?.chat?.users,notif?.chat?.restaurants)}`}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="1g"
        overflow="hidden"
      >
        {chats ? (
          <Stack overflow="scroll">
            {chats && chats?.length > 0 ? (
              
              <Stack overflow="scroll">
                {console.log(chats,"chats ")}
                {chats.map((chat) => (
                  <Box
                  onClick={async () => {
                    setSelectedChat(chat)
                    await markMsgRead(chat?._id).then(fetchChats())
                    
                  }}
                    cursor="pointer"
                    bg={selectedChat?._id === chat?._id ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat?._id === chat?._id ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                  >
                     <Text  style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {getSender(userId, chat?.users,chat?.restaurants)}
                      {chat?.read?.users.read ? <Box display="inline-block" position="relative">
                        <Icon boxSize={7} viewBox='0 0 200 200' color='green.500'>
                          <path fill='currentColor' d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0' />
                        </Icon>
                       
                      </Box> : ""}
                    </Text>
                
                    <small style={{ color: "black", display:"flex" }}>
              {!(selectedChat?._id === chat?._id)&&chat?.latestMessage?.content}
              <p style={{marginLeft:"5px", color: "gray"}}>{format(new Date(chat?.latestMessage?.createdAt), "h:mm a")}</p>
              </small>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Text>
                No Chats to Display
              </Text>
            )}

          </Stack>
        ): (
          <Text>
            No Chats to Display
          </Text>
        )}
      </Box>
    </Box>        
  )
}

export default ChatList