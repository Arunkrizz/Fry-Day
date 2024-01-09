import { useState } from 'react';
import '../../styles/productDetails.css';
import PropTypes from 'prop-types';
import { ChatState } from "../../components/context/chatProvider"
import { useAccessChatMutation } from '../../slices/userApiSlice'
import { useToast } from "@chakra-ui/react"
import { Spinner } from '@chakra-ui/spinner';
import { useNavigate } from 'react-router-dom'


const ChatButton = ({ userId }) => {
    const {setSelectedChat, chats, setChats} = ChatState()
    const [loadingChat, setLoadingChat] = useState("")
    const [getChat] = useAccessChatMutation()
    const navigate = useNavigate()

    const toast = useToast()

    const accessChat = async (userId) => {
      try {
          setLoadingChat(true)
          const { data } = await getChat(userId)
          if (!chats.find((c) => c._id === data._id)) {
            setChats([data, ...chats])
            setSelectedChat(data)
          }
          setSelectedChat(data)
          setLoadingChat(false)
          navigate('/user/chat')
          
      } catch (error) {
          toast({
              title: "Error fetching the Chat",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left"
            })
            console.log("error:",error.message)
      }
    }

    return (
      <>
        <div
        className="followButton"
        style={{  
            cursor: 'pointer',
        }}
        onClick={() => accessChat(userId)}
        > 
            Message
        </div>
        {loadingChat && <Spinner size="lg" borderWidth= "6px" ml="auto" display="flex" />}
      </>

    )
}



export default ChatButton