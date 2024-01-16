import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box, Text, VStack,useDisclosure } from '@chakra-ui/react';
import io from 'socket.io-client'
import { useSelector } from 'react-redux';
import UpdateOrderViewModal from './updateOrderViewModal';
import { Button } from 'react-bootstrap';
const ENDPOINT = "https://sevenlier.online"
let socket

const updateOrderDelivered = ({refetchUpdateDelivery,setRefetchUpdateDelivery}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { hotelInfo } = useSelector((state) => state?.hotelAuth);
    const [ordersShipped,setOrdersShipped] =useState([])
    const [order,setOrder]=useState([])

    useEffect(() => {
        if (hotelInfo) {
          socket = io(ENDPOINT)
          socket.emit("setupHotel", hotelInfo?.hotelInfo?._id)
          socket.on('orderShipped',()=>{
            setRefetchUpdateDelivery(!refetchUpdateDelivery)
          })
        }
      }, [hotelInfo])


    const fetchShippedOrders = async () => {
        try {
            await axios.post('/api/hotel/fetchShippedOrders').then((response) => {
                setOrdersShipped(response?.data?.ordersShipped)
            })
        } catch (error) {
            console.log("error in live order fetch", error)
        }
    }
    useEffect(() => {
        fetchShippedOrders()

    }, [refetchUpdateDelivery])
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
        Update Delivery Status
      </Text>
      {ordersShipped.length==0&&<Text  color="gray.500"   >No Orders</Text> }


      <VStack align="start" spacing="4" textAlign="center">
        {ordersShipped.map((item, index) => (
         <Box
         key={index}
         borderWidth="1px"
         p="4"
         borderRadius="md"
         width="250px"
         boxShadow="md"
        >            {item.products.map((product, index) => (
                      <Box key={index} display="flex" justifyContent="space-between">
                        <Text>{product?.product?.title}</Text>
                        <Text color="red">x{product.quantity}</Text>
                      </Box>
                    ))}
                    <Text fontWeight="bold" mt="2">
                      Total: ₹{item?.totalAmount}
                    </Text>
                    <Button
              onClick={() => {
                onOpen();
                setOrder(item);
              }}
              mt="3"
              colorScheme="blue"
            >View</Button>
            <UpdateOrderViewModal socket={socket} isOpen ={isOpen} onOpen={onOpen} onClose={onClose} order={order} refetchUpdateDelivery={refetchUpdateDelivery} setRefetchUpdateDelivery={setRefetchUpdateDelivery} />
          </Box>
        ))}

      </VStack>
    </Box>
        </div>

    )
}

export default updateOrderDelivered