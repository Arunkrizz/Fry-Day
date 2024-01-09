import React from 'react'
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { Form } from "react-bootstrap";


import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import {
  FiMapPin
  
} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';


const DeliveryAddressModal = ({ submitHandler, isOpen, onOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [mobile, setMobile] = useState("");
  const [accessLatitude, setAccessLatitude] = useState('');
  const [accessLongitude, setAccessLongitude] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [submitted, setSubmitted] = useState(false);
  const btnRef = React.useRef()
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setFirstName(userInfo?.address?.name);
    setAddress(userInfo?.address?.streetName)
    setLocality(userInfo?.address?.locality)
        setMobile(userInfo?.address?.mobile)
        setAccessLatitude(userInfo?.address?.latitude)
        setAccessLongitude(userInfo?.address?.longitude)
    
      },[ userInfo, userInfo?.address?.name])

       
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setAccessLatitude(crd.latitude)
    setAccessLongitude(crd.longitude)
    
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }



  const detectLocation=()=>{
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
}


  const submit = () => {
    try {
      const formDatas = new FormData();
      formDatas.append('name', firstName);
      formDatas.append('address', address);
      formDatas.append('locality', locality);
      formDatas.append('mobile', mobile);
      formDatas.append('latitude', accessLatitude);
      formDatas.append('longitude', accessLongitude);
      formDatas.append('paymentMethod', paymentMethod);

      submitHandler(formDatas)
    } catch (error) {
      console.log(error)
    }
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setAccessLatitude(crd.latitude)
    setAccessLongitude(crd.longitude)

  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }



  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);


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

                    isInvalid={firstName?.trim() === ''}
                    required
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    Please enter your name.
                  </BootstrapForm.Control.Feedback>

                </BootstrapForm.Group>



                <BootstrapForm.Group controlId="address">
                  <BootstrapForm.Label>Street name</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    isInvalid={address?.trim() === ''}
                    required
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    Please enter your street name.
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="Locality">
                  <BootstrapForm.Label>Locality</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    value={locality}
                    onChange={(e) =>
                      setLocality(e.target.value)
                    }
                    isInvalid={locality?.trim() === ''}
                    required
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    Please enter your locality.
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="mobile">
                  <BootstrapForm.Label>Mobile</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value)
                    }
                    isInvalid={mobile?.trim().length <10 }
                    required
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    Please enter your mobile no.
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <InputGroup className="mb-3">
      <InputGroup.Text>Latitude and Longitude</InputGroup.Text>
      <Form.Control aria-label="Latitude"   value={accessLatitude}  onChange={(e)=>setAccessLatitude(e.target.value)}  required/>
      <Form.Control aria-label="Longitude"  value={accessLongitude} onChange={(e)=>setAccessLongitude(e.target.value)} required />
      <Button style={{ display: 'flex', alignItems: 'center' }} onClick={detectLocation}><FiMapPin />Detect</Button>
    </InputGroup>

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
             
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>



    </>
  )
}

export default DeliveryAddressModal