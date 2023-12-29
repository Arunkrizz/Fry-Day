import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box, Text, VStack,useDisclosure } from '@chakra-ui/react';
import io from 'socket.io-client'
import { useSelector } from 'react-redux';
import ShipOrderViewModal from './shipOrderViewModal';
import { Button } from 'react-bootstrap';
import { FaLastfmSquare } from 'react-icons/fa';
const ENDPOINT = "http://localhost:5000"
let socket

const AcceptedOrders = ({refetchAcceptedOrders,setRefetchAcceptedOrders}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { hotelInfo } = useSelector((state) => state.hotelAuth);

    const [ordersToShip, setOrdersToShip] = useState([])
    const [order,setOrder]=useState([])
    // const [refetchAcceptedOrders,setRefetchAcceptedOrders] =useState(false)

    useEffect(() => {
        if (hotelInfo) {
          socket = io(ENDPOINT)
        //   socket.emit("setupHotel", hotelInfo.hotelInfo._id)
          socket.on('AcceptedOrderUpdate',()=>{
            setRefetchAcceptedOrders(!refetchAcceptedOrders)
          })
        }
      }, [hotelInfo])


    const fetchAcceptedOrders = async () => {
        try {
            await axios.post('/api/hotel/fetchAcceptedOrders').then((response) => {
                console.log(response, "res from fetch acceptedOrders ")
                setOrdersToShip(response.data.acceptedOrders)
            })
        } catch (error) {
            console.log("error in live order fetch", error)
        }
    }
    useEffect(() => {
        console.log("refetch accepted");
        fetchAcceptedOrders()

    }, [refetchAcceptedOrders])
    return (

        <div>
            <Box borderWidth="3px" p="4" borderRadius="md" marginLeft={5} 
              width="300px"  // Set the desired width
              >
      <Text fontSize="xl" fontWeight="bold" mb="4">
         Orders to ship
      </Text>
      <VStack align="start" spacing="2">
        {ordersToShip.map((item, index) => (
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
                // setRefetchLiveOrders(!refetchLiveOrders)
                }}>View</Button>
            <ShipOrderViewModal isOpen ={isOpen} onOpen={onOpen} onClose={onClose} order={order} refetchAcceptedOrders={refetchAcceptedOrders} setRefetchAcceptedOrders={setRefetchAcceptedOrders} />
          </Box>
        ))}
 {ordersToShip.length==0&&<h3>No Orders to ship</h3> }
      </VStack>
    </Box>
        </div>

    )
}

export default AcceptedOrders