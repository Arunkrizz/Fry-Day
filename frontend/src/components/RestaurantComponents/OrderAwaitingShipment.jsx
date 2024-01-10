import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box, Text, VStack, useDisclosure } from '@chakra-ui/react';
import io from 'socket.io-client'
import { useSelector } from 'react-redux';
import ShipOrderViewModal from './shipOrderViewModal';
import { Button } from 'react-bootstrap';
import { FaLastfmSquare } from 'react-icons/fa';
const ENDPOINT = "http://43.205.83.14:5000"
let socket

const AcceptedOrders = ({ refetchAcceptedOrders, setRefetchAcceptedOrders, refetchUpdateDelivery, setRefetchUpdateDelivery }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { hotelInfo } = useSelector((state) => state.hotelAuth);

  const [ordersToShip, setOrdersToShip] = useState([])
  const [order, setOrder] = useState([])

  useEffect(() => {
    if (hotelInfo) {
      socket = io(ENDPOINT)
      socket.on('AcceptedOrderUpdate', () => {
        setRefetchAcceptedOrders(!refetchAcceptedOrders)
      })
    }
  }, [hotelInfo])


  const fetchAcceptedOrders = async () => {
    try {
      await axios.post('/api/hotel/fetchAcceptedOrders').then((response) => {
        setOrdersToShip(response.data.acceptedOrders)
      })
    } catch (error) {
      console.log("error in live order fetch", error)
    }
  }
  useEffect(() => {
    fetchAcceptedOrders()

  }, [refetchAcceptedOrders])
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
          Orders to ship
        </Text>
        {ordersToShip.length == 0 && <Text color="gray.500"   >No Orders to ship</Text>}


        <VStack align="start" spacing="4" textAlign="center">
          {ordersToShip.map((item, index) => (
            <Box
              key={index}
              borderWidth="1px"
              p="4"
              borderRadius="md"
              width="250px"
              boxShadow="md"
            >            {item.products.map((product, index) => (
              <Box key={index} display="flex" justifyContent="space-between">
                <Text>{product.product.title}</Text>
                <Text color="red">x{product.quantity}</Text>
              </Box>
            ))}
              <Text fontWeight="bold" mt="2">
                Total: ₹{item.totalAmount}
              </Text>
              <Button
                onClick={() => {
                  onOpen();
                  setOrder(item);
                }}
                mt="3"
                colorScheme="blue"
              >
                View
              </Button>
              
              <ShipOrderViewModal socket={socket} isOpen={isOpen} onOpen={onOpen} onClose={onClose} order={order} refetchAcceptedOrders={refetchAcceptedOrders} setRefetchAcceptedOrders={setRefetchAcceptedOrders} refetchUpdateDelivery={refetchUpdateDelivery} setRefetchUpdateDelivery={setRefetchUpdateDelivery} />
            </Box>
          ))}
        </VStack>
      </Box>
    </div>

  )
}

export default AcceptedOrders