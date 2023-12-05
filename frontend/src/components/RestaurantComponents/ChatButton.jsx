import { useState } from 'react';
import '../../styles/productDetails.css';
import PropTypes from 'prop-types';
import { ChatState } from "../../components/context/chatProvider"
import { useAccessChatsMutation } from '../../slices/hotelApiSlice'
import { useToast } from "@chakra-ui/react"
import { Spinner } from '@chakra-ui/spinner';
import { useNavigate } from 'react-router-dom'


const ChatButton = ({ userId }) => {

  // console.log(userId," hotel id chat button");
    const {setSelectedChat, chats, setChats} = ChatState()
    const [loadingChat, setLoadingChat] = useState("")
    const [getChat] = useAccessChatsMutation()
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
          navigate('/hotel/chat')
          
      } catch (error) {
          toast({
              title: "Error fetching the Chat",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left"
            })
            console.log("hi",error.message)
      }
    }
    //  toast.error(error?.message || error?.error);

    return (
      <>
        <div
        className="followButton"
        style={{
            // color: 'white',  
            // backgroundColor: '#007BFF',  
            // fontSize: 16,
            // fontFamily: 'Roboto',
            // fontWeight: '700',
            // padding: '8px 16px',  
            // border: 'none',  
            // borderRadius: '4px',  
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

// ChatButton.propTypes = {
//     userId: PropTypes.string.isRequired
// };

export default ChatButton