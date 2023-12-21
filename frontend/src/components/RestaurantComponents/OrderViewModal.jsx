import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    
  } from '@chakra-ui/react'
import React,{ useState } from 'react'
import axios from 'axios'


function OrderViewModal({ isOpen, onOpen, onClose,order,refetchLiveOrders, setRefetchLiveOrders }) {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = useState('outside')

    const acceptOrder=(order)=>{
        try {
            axios.post('/api/hotel/acceptOrder',
            {orderId:order.order._id})
            // console.log(order.order._id,"accpt order")
        } catch (error) {
            console.log("order accept error",error)
        }
    }
    const rejectOrder=(order)=>{
        try {
            axios.post('/api/hotel/rejectOrder',
            {orderId:order.order._id})
            // console.log(order.order._id,"accpt order")
        } catch (error) {
            console.log("order accept error",error)
        }
    }
  
    const btnRef = React.useRef(null)
    return (
      <>
      
  
        {/* <Button mt={3} ref={btnRef} onClick={onOpen}>
          Trigger modal
        </Button> */}
  
        <Modal
          onClose={onClose}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          scrollBehavior={scrollBehavior}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Lorem count={15} /> */}
              
             {order?.products?.map((product,index)=>(
             <>
             <div style={{display:"flex"}}>
                <h5 style={{marginRight:"5px"}}>Product:</h5>
                <h5>{product.product.title} </h5>
                <p style={{color:"red"}}>x{product.quantity}</p>
                </div>
                
                </>
              ))
              }
              <h4>Total:₹{order?.totalAmount} </h4>
              <h5>Address:</h5>
              <p>Name:{order?.deliveryDetails?.name}</p>
              <p>Address:{order?.deliveryDetails?.address}</p>
              <p>Mobile:{order?.deliveryDetails?.mobile}</p>
              <p>Pincode:{order?.deliveryDetails?.pincode}</p>
             
            </ModalBody>
            <ModalFooter>
            <Button onClick={()=>{
                onClose()
                acceptOrder({order})
                setRefetchLiveOrders(!refetchLiveOrders)
                }} mr={4} >Accept</Button>
              <Button onClick={()=>{
                onClose()
                rejectOrder({order})
                setRefetchLiveOrders(!refetchLiveOrders)
                }}
                color={"red"} >Reject</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default OrderViewModal