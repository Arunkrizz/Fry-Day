import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import { useLoginMutation } from "../../slices/userApiSlice";
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/userApiSlice.js';
import { logout } from '../../slices/authSlice.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form as BootstrapForm } from "react-bootstrap";
import { useState } from "react";
import GoogleAuth from '../UserComponents/GoogleoAuth.jsx'
import GoogleAuthSignIn from '../UserComponents/GoogleoAuthsignIn.jsx'

import Image from 'react-bootstrap/Image';
import { setCredentials } from "../../slices/authSlice";
import { useRegisterMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";



const Header = () => {
  const imageSrc = "https://imgs.search.brave.com/y9lqo7VFEmKaJ2oUfWfQuu6FmOkDkMtNfQCv1phQ9m0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA0/NzA0MTE3L3Bob3Rv/L3Jlc3RhdXJhbnQt/cGxhdGVzLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NaEZk/Tl9xVmd6b0hvdi1r/Z0Z4MHFXU1cwblpo/dDRsWlYxemluQzNF/YTQ0PQ";

 
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState('');

  const [userPassword, setUserPassword] = useState("");
  const [showLoginUserModal, setShowLoginUserModal] = useState(false);

  const [userRegisterName, setUserRegisterName] = useState("");
  const [userRegisterMobile, setUserRegisterMobile] = useState("");
  const [userRegisterEmail, setUserRegisterEmail] = useState("");
  const [userRegisterPassword, setUserRegisterPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState('')
  const [showRegisterUserModal, setshowRegisterUserModal] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();
  const [login] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();


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



  const registerSubmit = async (e) => {
    console.log("api called")
    e.preventDefault();
    let passwordValidation
    let emailValidation

    if(userRegisterPassword !== confirmPassword){

      toast.error('Passwords do not match.');

    }else{
      passwordValidation= validatePassword(userRegisterPassword) 
      emailValidation =validateEmail(userRegisterEmail)

    }
   
    try{

      if (passwordValidation && emailValidation){
      console.log("api called")

    const responseFromApiCall = await register( { userRegisterName, userRegisterEmail, userRegisterPassword, userRegisterMobile } ).unwrap();

    dispatch( setCredentials( { ...responseFromApiCall } ) );
        
    navigate('/user/home');
    setshowRegisterUserModal(false)
    }
  }
  catch(err){
    toast.error( err?.data?.message || err?.error );
  }
}




const submitHandler = async (e) => {

  e.preventDefault();

  try {
    navigate('/user/home');
    const responseFromApiCall = await login( { userEmail, userPassword } ).unwrap();

    dispatch( setCredentials( { ...responseFromApiCall } ) );
    setShowLoginUserModal(false)
    
    navigate('/user/home');

  }catch(err){

    toast.error( err?.data?.message || err?.error );

  }

};







  const { userInfo } = useSelector((state) => state.auth);

 


  const [logoutApiCall] = useLogoutMutation();

  const logOutHandler = async () => {

    try {

      await logoutApiCall().unwrap();

      dispatch(logout());

      navigate('/');

    } catch (err) {

      console.log(err);

    }

  }

  return (
    <>
      <header>

        <Navbar bg="warning" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <img src="https://imgs.search.brave.com/UPk5vAgbZ0zWZfNEatWlf4oh46zkN7cEa1hV4Yg1iH8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcGxhdGZvcm0u/OTlzdGF0aWMuY29t/Ly9WNGE3NXJlMHU0/c1paeWZtNXNfVGhK/cU43SlU9LzEyMXg1/Njo5NDB4ODc1L2Zp/dC1pbi81MDB4NTAw/Lzk5ZGVzaWducy1j/b250ZXN0cy1hdHRh/Y2htZW50cy8xMDYv/MTA2NjM3L2F0dGFj/aG1lbnRfMTA2NjM3/MDU2" alt="Logo"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                marginTop: "5px",
                marginLeft: "115px",
                marginBottom: "10px",
              }} />
            <LinkContainer to="/">
              <Navbar.Brand ><h2>Fry-Day</h2> </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="ms-auto">

                {userInfo ? (

                  <>

                    <NavDropdown title={userInfo.name} id="userName">

                      <LinkContainer to='/profile'>
                        <NavDropdown.Item> Profile </NavDropdown.Item>
                      </LinkContainer>

                      <NavDropdown.Item onClick={logOutHandler} > Logout </NavDropdown.Item>

                    </NavDropdown>

                  </>

                ) : (
                  <>

                    <LinkContainer to="/hotel">
                      <Nav.Link>
                        <h5>Add Restaurant</h5>
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <h5 onClick={() => setShowLoginUserModal(true)} >Sign In</h5>
                      </Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/register">
                      <Nav.Link>
                        <h5 onClick={() => setshowRegisterUserModal(true)} > Sign Up</h5>
                      </Nav.Link>
                    </LinkContainer>
                  </>
                )}

              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>

      </header>
      <div >
        <Modal show={showLoginUserModal} onHide={() => setShowLoginUserModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BootstrapForm >

           

              <BootstrapForm.Group controlId="email">
                <BootstrapForm.Label>Email</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="email"
                  value={userEmail}
                  onChange={(e) =>
                    setUserEmail(e.target.value)
                  }
                  isInvalid={!!emailError}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {emailError}
                </BootstrapForm.Control.Feedback>
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
              
            </BootstrapForm>
            <h6>or sign in with google</h6> <GoogleAuthSignIn setShowLoginUserModal={setShowLoginUserModal} />
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={() => setShowAddUserModal(false)}>
                        Cancel
                    </Button> */}
                    
            <Button variant="primary" onClick={submitHandler} >
              sign In
              {/* {isUpdating ? "Adding..." : "Add User"} */}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showRegisterUserModal} onHide={() => setshowRegisterUserModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BootstrapForm>

              <BootstrapForm.Group controlId="name">
                <BootstrapForm.Label>Name</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="text"
                  value={userRegisterName}
                  onChange={(e) =>
                    setUserRegisterName(e.target.value)
                  }
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="mobile">
                <BootstrapForm.Label>Mobile</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="tel"
                  value={userRegisterMobile}
                  onChange={(e) =>
                    setUserRegisterMobile(e.target.value)
                  }
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="email">
                <BootstrapForm.Label>Email</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="email"
                  value={userRegisterEmail}
                  onChange={(e) =>
                    setUserRegisterEmail(e.target.value)
                  }
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="password">
                <BootstrapForm.Label>Password</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="password"
                  value={userRegisterPassword}
                  onChange={(e) =>
                    setUserRegisterPassword(e.target.value)
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

            </BootstrapForm>
            <h6>or sign up with google</h6> <GoogleAuth setshowRegisterUserModal={setshowRegisterUserModal} />
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={() => setShowAddUserModal(false)}>
                        Cancel
                    </Button> */}
            <Button variant="primary"  onClick={registerSubmit} disabled={''}>
              sign Up
              {/* {isUpdating ? "Adding..." : "Add User"} */}
            </Button>
          </Modal.Footer>
        </Modal>

        <>
         {userInfo ?null:<Image src={imageSrc} className="no-padding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} fluid />} 
        </>
      </div>
    </>
  );
};

export default Header;