import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, {  useState } from 'react';
import { useHotelRegister2Mutation } from "../../slices/hotelApiSlice";
import { toast } from "react-toastify";
import {  Form as BootstrapForm } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate } from "react-router-dom";





function CheckApiExample() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState('')

    const { hotelInfo } = useSelector((state) => state.hotelAuth);

    const navigate=useNavigate()

    const [hotelRegister2] = useHotelRegister2Mutation();

    // console.log(hotelInfo.hotelInfo._id,"redux store")

    
  function validatePassword(password) {
    // Define criteria
    var lengthCriteria = 8;
    var uppercaseCriteria = 1;
    var lowercaseCriteria = 1;
    var digitCriteria = 1;
    var specialCharacterCriteria = 1;

    // Check length
    if (password.length < lengthCriteria) {
      toast.error("Password must be at least " + lengthCriteria + " characters long.");
        return false
    }

    // Check uppercase letters
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
        return false
    }

    // Check lowercase letters
    if (!/[a-z]/.test(password)) {
      toast.error( "Password must contain at least one lowercase letter.");
        return false
      
    }

    // Check digits
    if (!/\d/.test(password)) {
      toast.error("Password must contain at least one digit.");
      return false
    }

    // Check special characters
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password must contain at least one special character: !@#$%^&*(),.?\":{}|<>");
      return false
    }

    // If all criteria are met
    return true
}

  const validateEmail = (email) => {
    // A simple email validation regex pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };


    const handleOnClick= async()=>{

      
        let passwordValidation
        let emailValidation
    
        if(userPassword !== confirmPassword){
    
          toast.error('Passwords do not match.');
    
        }else{
          passwordValidation= validatePassword(userPassword) 
          emailValidation =validateEmail(userEmail)
    
        }
        if(passwordValidation&&emailValidation){

            try {
                
                const responseFromApiCall=await hotelRegister2({Id:hotelInfo.hotelInfo._id,Email:userEmail,Password:userPassword})
                
                navigate('/hotel/registerCompleted');
            } catch (error) {
              console.log(error,"err")  
            }
        }
    }

    
  
   


  return (
    <div style={{marginTop:"60px"}} >

      <Card   bg={"light"}
                key={"1"}
                text={"dark"}
                className="mb-2"
                style={{ paddingLeft: "20px", paddingTop: '20px', paddingBottom: '20px',paddingRight:"20px" }}>
                    <BootstrapForm>
                       
             

                        <BootstrapForm.Group controlId="email">
                            <BootstrapForm.Label>Email</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="email"
                                value={userEmail}
                                onChange={(e) =>
                                    setUserEmail(e.target.value)
                                }
                            />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="password">
                            <BootstrapForm.Label>Password</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="password"
                                value={userPassword}
                                onChange={(e) =>
                                    setUserPassword(e.target.value)
                                }
                            />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="confirmPassword">
                <BootstrapForm.Label>Confirm password</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />
              </BootstrapForm.Group>
                        
                
                <Button variant="outline-info" id="button-addon2" style={{ marginTop:"20px"}} onClick={handleOnClick}>
                    Register
                </Button>
               
                    </BootstrapForm>

                    </Card>
          
     
    </div>
  )
}

export default CheckApiExample;