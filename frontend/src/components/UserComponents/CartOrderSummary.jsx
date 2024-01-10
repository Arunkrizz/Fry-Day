import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
  useDisclosure 
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'
import React, { lazy, Suspense, useState,useEffect } from 'react';
import axios from 'axios'
const AddressModal = lazy(() => import('./DeliveryAddressModal'));
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'

const ENDPOINT = "http://43.205.83.14:5000"
let socket,orderPlaced;

import { useSelector } from 'react-redux';




const OrderSummaryItem = (props) => {

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(()=>{
    socket = io(ENDPOINT)
    socket.emit("setup", userInfo.id)
    socket.on('orderUpdatessss',()=>{
      console.log("user side socket");
    })
 },[userInfo])

  const { label, value, children } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  )
}

export const CartOrderSummary = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showDeliveryAddressModal, setShowDeliveryAddressModal] = useState(false)
  const navigate =useNavigate()

  const checkoutSubmitHandler = (formData) => {
    try {
      console.log(formData.getAll('name'));
      axios.post('/api/users/checkout',formData).then((response)=>{
        socket.emit("orderPlaced", { orderPlaced: response.data.orderId });        
        navigate('/user/myOrders')
        
      })
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        {props.cartItems.map((item, i) => (
          <OrderSummaryItem key={i} label="Subtotal" value={formatPrice(item.quantity * item.product.price)} />
        ))}
      
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(props.total)}
          </Text>
        </Flex>
      </Stack>
      <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />} onClick={
        ()=>{
          setShowDeliveryAddressModal(true)
          onOpen()
        }}>
        Checkout
      </Button>
      <Suspense fallback={<div>Loading...</div>}>
       { showDeliveryAddressModal&&<AddressModal
          showDeliveryAddressModal={showDeliveryAddressModal}
          setShowDeliveryAddressModal={setShowDeliveryAddressModal}
          submitHandler={checkoutSubmitHandler}
           isOpen={isOpen}
            onOpen={onOpen}
             onClose={onClose} 


        />}
      </Suspense>
    </Stack>
  )
}