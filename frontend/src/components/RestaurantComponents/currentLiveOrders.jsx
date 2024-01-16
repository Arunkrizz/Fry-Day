import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box, Text, VStack,useDisclosure } from '@chakra-ui/react';
import io from 'socket.io-client'
import { useSelector } from 'react-redux';
import OrderViewModal from './OrderViewModal';
import { Button } from 'react-bootstrap';
import { FaLastfmSquare } from 'react-icons/fa';
const ENDPOINT = "https://sevenlier.online"
let socket

const currentLiveOrders = ({refetchAcceptedOrders,setRefetchAcceptedOrders}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { hotelInfo } = useSelector((state) => state.hotelAuth);

    const [liveOrders, setLiveOrders] = useState([])
    const [order,setOrder]=useState([])
    const [refetchLiveOrders,setRefetchLiveOrders] =useState(false)

    useEffect(() => {
        if (hotelInfo) {
          socket = io(ENDPOINT)
          socket.emit("setupHotel", hotelInfo.hotelInfo._id)
          
        }

        socket.on('orderUpdate',()=>{
          console.log("order up sockt");
          fetchLiveOrders()
          setRefetchLiveOrders(!refetchLiveOrders)
        })

      }, [hotelInfo])


    const fetchLiveOrders = async () => {
        try {
            await axios.post('/api/hotel/fetchLiveOrders').then((response) => {
                // console.log(response, "res from fetch live orders")
                setLiveOrders(response.data.liveOrders)
            })
        } catch (error) {
            console.log("error in live order fetch", error)
        }
    }
    useEffect(() => {
        fetchLiveOrders()

    }, [refetchLiveOrders])
    return (

    <div>
    
      <Box
        borderWidth="3px"
        p="4"
        borderRadius="md"
        width="300px" // Set the desired width
        textAlign="center" // Center content inside the box
      >
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Live Orders
      </Text>
      {liveOrders.length === 0 && <Text  color="gray.500"   >No Orders</Text>}

      <VStack align="start" spacing="4" textAlign="center">
        {liveOrders.map((item, index) => (
          <Box
            key={index}
            borderWidth="1px"
            p="4"
            borderRadius="md"
            width="250px"
            boxShadow="md"
          >
            {item.products.map((product, index) => (
              <Box key={index} display="flex" justifyContent="space-between">
                <Text>{product?.product?.title}</Text>
                <Text color="red">x{product?.quantity}</Text>
              </Box>
            ))}
            <Text fontWeight="bold" mt="2">
              Total: ₹{item?.totalAmount}
            </Text>
            <Button
              onClick={() => {
                onOpen();
                setOrder(item);
                setRefetchLiveOrders(!refetchLiveOrders);
              }}
              mt="3"
              colorScheme="blue"
            >
              View
            </Button>
          <OrderViewModal socket={socket} setRefetchAcceptedOrders={setRefetchAcceptedOrders} refetchAcceptedOrders={refetchAcceptedOrders} isOpen ={isOpen} onOpen={onOpen} onClose={onClose} order={order} refetchLiveOrders={refetchLiveOrders} setRefetchLiveOrders={setRefetchLiveOrders} />

          </Box>
        ))}
      </VStack>
    </Box>
    
   
  </div>
    )
}

export default currentLiveOrders