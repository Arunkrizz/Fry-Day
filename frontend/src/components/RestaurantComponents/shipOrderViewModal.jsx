import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    HStack,
    Text,
    
  } from '@chakra-ui/react'
import React,{ useState } from 'react'
import axios from 'axios'


function ShipOrderViewModal({socket, isOpen, onOpen, onClose,order,refetchAcceptedOrders, setRefetchAcceptedOrders,refetchUpdateDelivery,setRefetchUpdateDelivery }) {
    const [scrollBehavior, setScrollBehavior] = useState('outside')

    const shipOrder=(order)=>{
        try {
            axios.post('/api/hotel/shipOrder',
            {orderId:order.order._id}).then(()=>{
                setRefetchAcceptedOrders(!refetchAcceptedOrders)
                setRefetchUpdateDelivery(!refetchUpdateDelivery)
                socket.emit("orderAccepted",  order.order.userId );
                
            })
        } catch (error) {
            console.log("order accept error",error)
        }
    }


 
  
    const btnRef = React.useRef(null)
    return (
      <>

       
<Modal onClose={onClose} finalFocusRef={btnRef} isOpen={isOpen} scrollBehavior={scrollBehavior}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Order Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {order?.products?.map((product, index) => (
        <VStack key={index} spacing={2} align="start">
          <HStack>
            <Text fontWeight="bold">Product:</Text>
            <Text>{product.product.title}</Text>
            <Text color="red">x{product.quantity}</Text>
          </HStack>
        </VStack>
      ))}
      <Text fontWeight="bold" mt={4}>
        Total: ₹{order?.totalAmount}
      </Text>
      <VStack spacing={2} align="start" mt={4}>
        <Text fontWeight="bold">Address:</Text>
        <Text>Name: {order?.deliveryDetails?.name}</Text>
        <Text>Street name: {order?.deliveryDetails?.streetName}</Text>
        <Text>Mobile: {order?.deliveryDetails?.mobile}</Text>
        <Text>Locality: {order?.deliveryDetails?.locality}</Text>
      </VStack>
    </ModalBody>
            <ModalFooter>
            <Button colorScheme='green' onClick={()=>{
                onClose()
                 shipOrder({order})
               
                }} mr={4} >Ship to customer</Button>
            
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default ShipOrderViewModal