import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/UserComponents/FormContainer";
import InputGroup from 'react-bootstrap/InputGroup';

import { useDispatch, useSelector } from "react-redux";

import { setCredentials } from "../../slices/authSlice";
import { useChangeAddressMutation } from "../../slices/userApiSlice";

import { toast } from "react-toastify";

import Loader from "../../components/UserComponents/Loader";

import {
  FiMapPin
  
} from 'react-icons/fi';






const ManageAddress = () => {


  const [name, setName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [locality, setLocality] = useState("");
  const [mobile, setMobile] = useState("");
  const [accessLatitude, setAccessLatitude] = useState('');
  const [accessLongitude, setAccessLongitude] = useState('');

  // set addresss in state

  const dispatch = useDispatch();

  const { userInfo } = useSelector( (state) => state.auth );

  const [ changeAddress, { isLoading } ] = useChangeAddressMutation()

  
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



  useEffect(() => {
// console.log(userInfo,"u info in mnge address");
    setName(userInfo?.address?.name);
    setStreetName(userInfo?.address?.streetName)
    setLocality(userInfo?.address?.locality)
    setMobile(userInfo?.address?.mobile)
    setAccessLatitude(userInfo?.address?.latitude)
    setAccessLongitude(userInfo?.address?.longitude)

  },[ userInfo, userInfo?.address?.name])

  const submitHandler = async (e) => {
    
    e.preventDefault();
    
    

      try{

        const formDatas = new FormData();

        formDatas.append('name', name);
        formDatas.append('streetName', streetName);
        formDatas.append('locality', locality);
        formDatas.append('mobile', mobile);
        formDatas.append('latitude', accessLatitude);
        formDatas.append('longitude', accessLongitude);

        // console.log(formData,"formdata")

        const responseFromApiCall = await changeAddress( formDatas ).unwrap();
        console.log(responseFromApiCall,"responseFromApiCall mnge address")

        dispatch( setCredentials( { ...responseFromApiCall } ) ); // chnge userinfo if necessary
        
        toast.success( "Address updated successfully" );

      }catch(err){

        toast.error( err?.data?.message || err?.error );

      }

    

  };



  return (
    <FormContainer>


      <h3 style={{
            display: "block",
            marginTop: "5px",
            marginLeft: "100px",
            marginBottom: "5px",
      }}>Update Address</h3>

      <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">            
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name here..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                ></Form.Control>
            </Form.Group>
            
            <Form.Group className="my-2" controlId="StreetName">            
                <Form.Label>Street name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Street name"
                    value={streetName}
                    onChange={(e) => setStreetName(e.target.value)}
                    required
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="locality">
                <Form.Label>Locality</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter locality"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    required
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="mobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                ></Form.Control>
            </Form.Group>

            <InputGroup className="mb-3">
      <InputGroup.Text>Latitude and Longitude</InputGroup.Text>
      <Form.Control aria-label="Latitude"   value={accessLatitude}  onChange={(e)=>setAccessLatitude(e.target.value)}  required/>
      <Form.Control aria-label="Longitude"  value={accessLongitude} onChange={(e)=>setAccessLongitude(e.target.value)} required />
      <Button style={{ display: 'flex', alignItems: 'center' }} onClick={detectLocation}><FiMapPin />Detect</Button>
    </InputGroup>

            <Button type="submit" variant="primary" className="mt-3"> Save </Button>
      </Form>

      { isLoading && <> <Loader/> </>}
      
    </FormContainer>
  );
};

export default ManageAddress;
