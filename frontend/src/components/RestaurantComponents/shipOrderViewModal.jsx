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


function ShipOrderViewModal({ isOpen, onOpen, onClose,order,refetchAcceptedOrders, setRefetchAcceptedOrders }) {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = useState('outside')

    const shipOrder=(order)=>{
        try {
            axios.post('/api/hotel/shipOrder',
            {orderId:order.order._id}).then(()=>{
                setRefetchAcceptedOrders(!refetchAcceptedOrders)
                
            })
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
                 shipOrder({order})
               
                }} mr={4} >Ship to customer</Button>
            
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default ShipOrderViewModal