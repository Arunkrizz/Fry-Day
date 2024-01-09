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


function updateOrderViewModal({ socket,isOpen, onOpen, onClose,order,refetchUpdateDelivery,setRefetchUpdateDelivery}) {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = useState('outside')

    const updateOrderDelivery=(order)=>{
        try {
            axios.post('/api/hotel/updateOrderDelivery',
            {orderId:order.order._id}).then(()=>{
              setRefetchUpdateDelivery(!refetchUpdateDelivery)
              socket.emit("orderAccepted",  order.order.userId );
            })
        } catch (error) {
            console.log("order delivery error",error)
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
                updateOrderDelivery({order})
                setRefetchUpdateDelivery(!refetchUpdateDelivery)
                }} mr={4} >Update order as Delivered</Button>
       
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default updateOrderViewModal