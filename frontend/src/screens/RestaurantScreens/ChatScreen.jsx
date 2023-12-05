import { ChatState } from "../../components/context/chatProvider"
import { ChakraProvider } from "@chakra-ui/react"
import { Box } from "@chakra-ui/layout"
// import ChatSideDrawer from "../../components/RestaurantComponents/ChatSideDrawer"
import ChatList from "../../components/RestaurantComponents/ChatList"
import ChatBox from "../../components/RestaurantComponents/ChatBox"
import { useSelector } from 'react-redux';

import { useState,useEffect } from 'react';
import '../../styles/productDetails.css';
import { useAccessChatsMutation } from "../../slices/hotelApiSlice"
import { useToast } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'

const ChatScreen = () => {



    const {setSelectedChat, chats, setChats} = ChatState()
    const [loadingChat, setLoadingChat] = useState("")
    const [getChat] = useAccessChatsMutation()
    const navigate = useNavigate()

    const toast = useToast()

    const { hotelInfo } = useSelector((state) => state.hotelAuth);
   
    // const userId = hotelInfo.hotelInfo._id

    // useEffect(()=>{
    //     const accessChat = async (userId) => {
    //         try {
    //             setLoadingChat(true)
    //             const { data } = await getChat(userId)
    //             if (!chats.find((c) => c._id === data._id)) {
    //               setChats([data, ...chats])
    //               setSelectedChat(data)
    //             }
    //             setSelectedChat(data)
    //             setLoadingChat(false)
    //             navigate('/hotel/chat')
                
    //         } catch (error) {
    //             toast({
    //                 title: "Error fetching the Chat",
    //                 description: error.message,
    //                 status: "error",
    //                 duration: 5000,
    //                 isClosable: true,
    //                 position: "bottom-left"
    //               })
    //               console.log("hi",error.message)
    //         }
    //       }

    //       accessChat(userId)

    // },[userId])

    return (
       
            <div style={{width: "100%"}}>
                {/* <ChatSideDrawer /> */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    height="91.5vh"
                    padding="10px"
                >
                    <ChatList />
                    <ChatBox />
                </Box>
            </div>
        
    )
}

export default ChatScreen