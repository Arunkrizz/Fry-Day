import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box, Text, VStack,useDisclosure } from '@chakra-ui/react';
import io from 'socket.io-client'
import { useSelector } from 'react-redux';
import OrderViewModal from './OrderViewModal';
import { Button } from 'react-bootstrap';
import { FaLastfmSquare } from 'react-icons/fa';
const ENDPOINT = "http://localhost:5000"
let socket

const currentLiveOrders = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { hotelInfo } = useSelector((state) => state.hotelAuth);

    const [liveOrders, setLiveOrders] = useState([])
    const [order,setOrder]=useState([])
    const [refetchLiveOrders,setRefetchLiveOrders] =useState(false)

    useEffect(() => {
        if (hotelInfo) {
          socket = io(ENDPOINT)
          socket.emit("setupHotel", hotelInfo.hotelInfo._id)
          socket.on('orderUpdate',()=>{
            setRefetchLiveOrders(!refetchLiveOrders)
          })
        }
      }, [hotelInfo])


    const fetchLiveOrders = async () => {
        try {
            await axios.post('/api/hotel/fetchLiveOrders').then((response) => {
                console.log(response, "res from fetch live orders")
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
            <Box borderWidth="3px" p="4" borderRadius="md" marginLeft={5} 
              width="300px"  // Set the desired width
              >
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Live Orders
      </Text>
      <VStack align="start" spacing="2">
        {liveOrders.map((item, index) => (
          <Box key={index} borderWidth="1px" p="4" borderRadius="md"  width="250px">
            {item.products.map((product,index)=>(
                <Box key ={index} display="flex">
                <Text  marginRight="4" >{product.product.title}</Text>
                <Text color="red">x{product.quantity}</Text>
                </Box>
            ))}
            <Text>Total:  ₹{item.totalAmount}</Text>
            <Button  onClick={()=>{
                onOpen()
                setOrder(item)
                setRefetchLiveOrders(!refetchLiveOrders)
                }}>View</Button>
            <OrderViewModal isOpen ={isOpen} onOpen={onOpen} onClose={onClose} order={order} refetchLiveOrders={refetchLiveOrders} setRefetchLiveOrders={setRefetchLiveOrders} />
          </Box>
        ))}

      </VStack>
    </Box>
        </div>

    )
}

export default currentLiveOrders