import { Box, Stack, Text } from "@chakra-ui/layout"
import { ChatState } from "../context/chatProvider"
import { useEffect } from "react"
import { useSelector } from 'react-redux';
import { useToast } from "@chakra-ui/react"
import { useFetchChatMutation } from '../../slices/userApiSlice'
import { getSender } from "../config/chatLogics"

const ChatList = ({fetchAgain}) => {
//   const { userInfo } = useSelector((state) => state.userAuth);
  const { userInfo } = useSelector((state) => state.auth);
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState()
  const [fetchChat] = useFetchChatMutation()
  // console.log(userInfo,"user chat info")
  const userId = userInfo.id
  const toast = useToast()

  const fetchChats = async () => {
    try {
      const { data } = await fetchChat()
      console.log("data", data);
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
  }, [fetchAgain])

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
            {chats && chats.length > 0 ? (
              <Stack overflow="scroll">
                {chats.map((chat) => (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                  >
                    <Text>
                      {/* {getSender(userId, chat.users,chat.restaurants)} */}
                      {getSender(userId, chats[0].users,chats[0].restaurants)}
                    </Text>
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