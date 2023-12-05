import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';  
import Card from 'react-bootstrap/Card'; 
import  { ProgressBarContext } from '../../../store/progressBarStore.jsx'; 
import React,{useState,useContext,useEffect} from 'react'; 
import { toast } from "react-toastify";
// import axios from 'axios';

function FormFloatingCustom() {

  const {postDetails, setPostDetails, handleNext } = useContext(ProgressBarContext);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [accessLatitude, setAccessLatitude] = useState('');
  const [accessLongitude, setAccessLongitude] = useState('');
  const [cities,setCities]=useState([]) 



  const handlePushDetails=()=>{
    const updatedPostDetails = [{restaurantName:restaurantName,restaurantAddress:restaurantAddress,mobile:mobile,ownerName:ownerName,ownerEmail:ownerEmail,accessLatitude:accessLatitude,accessLongitude:accessLongitude}];
    setPostDetails(updatedPostDetails)
    console.log(postDetails,"jj")
  }

  const validateEmail = (email) => {
    // A simple email validation regex pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  function validateMobileNumber(number) {
    // Define a regular expression for a generic mobile number
    var pattern = /^\d{10}$/;

    // Test the number against the pattern
    return pattern.test(number);
}

  const isFormValid = () => {
    // Check if every field is filled
    if (
      restaurantName.trim() === '' ||
      restaurantAddress.trim() === '' ||
      // mobile.length() < 10  ||
      ownerName.trim() === '' 
     
    ) {
      // Return false if any field is empty
      return false;
    }else if (!validateMobileNumber(mobile)){
      toast.error('Please fill a valid mobile no.');
      return false
    }else if( !validateEmail(ownerEmail)){
      toast.error('Please fill in a valid email.');
      return false;
    }else{

      // Return true if all fields are filled
      return true;
    }
  };

  const handleOnClick = () => {
    // Check if the form is valid before proceeding
    if (isFormValid()) {
      handlePushDetails();
      handleNext();
    } else {
      // Display an error message or take other actions as needed
    
      toast.error('Please fill in all fields approprietly before proceeding.');
      
    }
  };

  const handleRestaurantNameChange = (event) => {
    setRestaurantName(event.target.value);
  };

  const handleRestaurantAddressChange = (event) => {
    setRestaurantAddress(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleOwnerNameChange = (event) => {
    setOwnerName(event.target.value);
  };

  const handleOwnerEmailChange = (event) => {
    setOwnerEmail(event.target.value);
  };

  const handleAccessLocationChange = (event) => {
    setAccessLocation(event.target.value);
  };

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
  }, []);

  

    const variant = 'Light'
  return (
    <>
     <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          className="mb-2"
          style={{ paddingLeft: "20px", paddingTop: '20px', paddingBottom: '20px', paddingRight:"20px",  }}
        >
          <h3 style={{paddingBottom:"30px"}}>Restaurant Information</h3>
      
      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder="Restaurant Name"
          value={restaurantName}
          onChange={handleRestaurantNameChange}
          required
        />
        <label htmlFor="floatingInputCustom">Restaurant Name </label>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingPasswordCustom"
          type="text"
          placeholder="Restaurant complete address"
          value={restaurantAddress}
          onChange={handleRestaurantAddressChange}
          required
        />
        <label htmlFor="floatingPasswordCustom">Restaurant complete address</label>
      </Form.Floating>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
        <Form.Control
          placeholder="Mobile"
          aria-label="Mobile"
          aria-describedby="basic-addon1"
          value={mobile}
          onChange={handleMobileChange}
          required
        />
      </InputGroup>

      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingOwnerNameCustom"
          type="text"
          placeholder="name"
          value={ownerName}
          onChange={handleOwnerNameChange}
          required
        />
        <label htmlFor="floatingOwnerNameCustom">Restaurant Owner name</label>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingOwnerEmailCustom"
          type="email"
          placeholder="email"
          value={ownerEmail}
          onChange={handleOwnerEmailChange}
          required
        />
        <label htmlFor="floatingOwnerEmailCustom">Restaurant owner email address</label>
      </Form.Floating>

      

      <InputGroup className="mb-3">
      <InputGroup.Text>Latitude and Longitude</InputGroup.Text>
      <Form.Control aria-label="Latitude"   value={accessLatitude}  onChange={(e)=>setAccessLatitude(e.target.value)}  required/>
      <Form.Control aria-label="Longitude"  value={accessLongitude} onChange={(e)=>setAccessLongitude(e.target.value)} required />
    </InputGroup>
   

      <Button variant="outline-info" id="button-addon2" onClick={handleOnClick}>
          Next
        </Button>
      </Card>
    </>
  );
}

export default FormFloatingCustom;