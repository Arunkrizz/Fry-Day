import { Box, Text } from '@chakra-ui/layout'
import { FormControl} from '@chakra-ui/form-control'
import { Spinner, IconButton, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Input } from "@chakra-ui/input";
import { ChatState } from '../context/chatProvider'
import { getSender } from '../config/chatLogics'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useSendMessagesMutation, useFetchMessagessMutation ,useFetchNotificationssMutation,useReadMessagesUpdatesMutation,useFetchChatsMutation} from '../../slices/hotelApiSlice'
import "../styles/message.css"
import ScrollableChat from './ScrollableChat'
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:5000"
let socket,selectedChatCompare;
const SingleChat = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const [socketConnected,setSocketConnected]= useState(false)
    const [sendNewMessage] = useSendMessagesMutation()
    const [fetchAllMessages] = useFetchMessagessMutation()
    const [typing,SetTyping]=useState(false)
    const [isTyping,setIsTyping] = useState(false)
    const [fetchNotifications] = useFetchNotificationssMutation()
    const [updateReadMessages] = useReadMessagesUpdatesMutation()
    const [fetchChat] = useFetchChatsMutation()

    const { selectedChat, setSelectedChat, notification, setNotification, chats, setChats } = ChatState()
    const { hotelInfo } = useSelector((state) => state.hotelAuth);
// console.log(userInfo,"userii")
    const userId = hotelInfo.hotelInfo._id

    const toast = useToast()

    
   
 
    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit("setup", hotelInfo.hotelInfo._id)
        socket.on("connected", () => setSocketConnected(true))
        socket.on("typing",()=>setIsTyping(true))
        socket.on("stop typing",()=>setIsTyping(false))
     },[])
    //  useEffect(()=>{
    //      socket.on('message received',(newMessageReceived)=>{
    //          if(!selectedChatCompare || selectedChatCompare._id !==newMessageReceived.chat._id){
    //              // give notification 
    //              console.log(selectedChatCompare, selectedChatCompare._id ,newMessageReceived.chat._id,"io");
    //          }else{
    //              setMessages([...messages,newMessageReceived])
    //          }
    //      })
    //  })

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
           socket.emit('stop typing',selectedChat._id)
            try {
                const { data } = await sendNewMessage({ content: newMessage, chatId: selectedChat._id,type:"Restaurant" });
                // console.log("data", data)

                socket.emit('new Message', data)
                setMessages([...messages, data]);
                setNewMessage(""); 
            } catch (error) {
                toast({
                    title: "Error occurred",
                    description: "Failed to send message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                });
            }
        }
    };

  


    const fetchMessages = async () => {
        if (!selectedChat) return
        setLoading(true)
        try {
            const { data } = await fetchAllMessages(selectedChat._id);
            setMessages(data)
            console.log("messages")
            // console.log("messagesData", data)
            setLoading(false)

            socket.emit("join chat", selectedChat._id)
        } catch (error) { 
            toast({
                title: "Error occurred",
                description: "Failed to Load messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }
    }

    const fetchMessage = async () => {
        if (!selectedChat) return
        setLoading(true)
        try {
            const { data } = await fetchAllMessages(selectedChat._id);
            setMessages(data)
            // console.log("messages")
            // console.log("messagesData", data)
            setLoading(false)

            socket.emit("join chat", selectedChat._id)
        } catch (error) { 
            toast({
                title: "Error occurred",
                description: "Failed to Load messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }
    }




    useEffect(() => {
        fetchMessages()
       selectedChatCompare = selectedChat
    }, [selectedChat])

    const fetchChats = async () => {
        try {
          const { data } = await fetchChat()
        //   console.log("data", data);
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

useEffect( () => {
    socket.on("message received", async (newMessageReceived) => {
       
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {

        console.log("msg rcvd");
        fetchChats()

        await updateReadMessages(newMessageReceived.chat._id)

      
        const existingNotification = notification.find((n) => n.chat._id === newMessageReceived.chat._id);
  
        if (!existingNotification) {
          setNotification([newMessageReceived, ...notification]);
        const chat =await fetchMessage()
          //   setFetchAgain(!fetchAgain)
        } else {

          // Update the existing notification
          setNotification([
            ...notification.filter((n) => n.chat._id !== newMessageReceived.chat._id),
            newMessageReceived,
          ]);
          const chat =await fetchMessage()
          
        }
      } else {
        console.log(messages,"else msg rcvd");
        const chat =await fetchMessage()
        // setMessages([...messages, newMessageReceived]);
      }
    });
  }, [ selectedChatCompare]);

  useEffect(() => {
    const fetchNotificationsData = async () => {
        try {
            const { data } = await fetchNotifications();
            // console.log("notifications: ", data);
            setNotification(data);
        } catch (error) {
            console.error('Error fetching notifications:', error.message);
        }
    };

    fetchNotificationsData();
}, []);
    
    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        //typjng indicator
        if(!socketConnected) return

        if(!typing){
            SetTyping(true)
            socket.emit('typing',selectedChat._id)
        }
        let lastTypingTime = new Date().getTime()
        let timerLength= 3000
        setTimeout(()=>{
            let timeNow= new Date().getTime()
            let timeDiff=timeNow-lastTypingTime

            if(timeDiff>=timerLength && typing){
                socket.emit('stop typing', selectedChat._id)
                SetTyping(false)
            }
        },timerLength)

    }

  return (
    <>
        {selectedChat ? (
            <>
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    px={2}
                    w="100%"
                    fontFamily="work sans"
                    display="flex"
                    justifyContent={{ base: "space-between" }}
                    alignItems="center"
                >
                    <IconButton 
                        display={{base: "flex", md: "none"}}
                        icon={<ArrowBackIcon />}
                        onClick={()=>setSelectedChat("")}
                    />
                    {getSender(userId, selectedChat.users,selectedChat.restaurants)}
                  
                </Text>
                <Box
                    display="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflow="hidden"
                >
                      {loading ? (
                          <Spinner
                              size="xl"
                              w={20}
                              h={20}
                              alignSelf='center'
                              margin="auto"
                          />
                      ) : (
                          <div className='messages'>
                            <ScrollableChat messages={messages} />
                          </div>
                      )}

                      <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                          {isTyping? <div>typing...</div>:<></>}
                          
                          <Input
                              value={newMessage}
                              variant="filled"
                              bg="#E0E0E0"
                              placeholder='Enter New Message'
                              onChange={typingHandler}
                          />
                      </FormControl>
                </Box>
            </>
        ) : (
            <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                <Text fontSize="3xl" pb={3} fontFamily="work sans">
                    Click on a user to start chatting
                </Text>
            </Box>
        )}
    </>
  )
}

export default SingleChat