import React from 'react'
import {  Button, Form as BootstrapForm } from 'react-bootstrap';
import { useState } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useEffect } from 'react';

const DeliveryAddressModal = ({ submitHandler, isOpen, onOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const btnRef = React.useRef()

const submit =()=>{
  try {
    const formData = new FormData();
    formData.append('name', firstName);
    formData.append('address', address);
    formData.append('pincode', pincode);
    formData.append('mobile', mobile);
    formData.append('paymentMethod', paymentMethod);
   
    submitHandler(FormData)
  } catch (error) {
    console.log(error)
  }
}


  return (
    < >
      <>
        {/* <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Open
      </Button> */}
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
          size={"sm"}
        >
          {/* {console.log("lazyy1")} */}
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Set Delivery Address</DrawerHeader>

            <DrawerBody>

              <BootstrapForm >

                <BootstrapForm.Group controlId="firstName">
                  <BootstrapForm.Label>First Name</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }

                  />
                </BootstrapForm.Group>



                <BootstrapForm.Group controlId="address">
                  <BootstrapForm.Label>Address</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="pincode">
                  <BootstrapForm.Label>Pincode</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    value={pincode}
                    onChange={(e) =>
                      setPincode(e.target.value)
                    }
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="mobile">
                  <BootstrapForm.Label>Mobile</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value)
                    }
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group>
                  <BootstrapForm.Label as="legend">Payment Method</BootstrapForm.Label>
                  <BootstrapForm.Check
                    type="radio"
                    label="Cash On Delivery (COD)"
                    id="cod"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <BootstrapForm.Check
                    type="radio"
                    label="Online Payment"
                    id="online"
                    name="paymentMethod"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                  />
                </BootstrapForm.Group>

              </BootstrapForm>


              <Button style={{ marginTop: "40px" }} variant="primary" onClick={() => {
                submit()
                onClose()
              }} >
                Proceed to checkout

              </Button>


            </DrawerBody>

            <DrawerFooter>
              {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='blue' mr={3} onClick={()=>{
              onClose()
              submitHandler()
              }}>
              Set Delivery Address
            </Button> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>



    </>
  )
}

export default DeliveryAddressModal