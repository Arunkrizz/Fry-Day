import React from 'react'
import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap';
import GoogleAuth from '../UserComponents/GoogleoAuth.jsx'
import GoogleAuthSignIn from '../UserComponents/GoogleoAuthsignIn.jsx'
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';


const LoginuserModal = ({showLoginUserModal, setShowLoginUserModal,showRegisterUserModal, setshowRegisterUserModal, registerSubmit, userRegisterName, setUserRegisterName, userRegisterMobile, setUserRegisterMobile, userRegisterEmail, setUserRegisterEmail, userRegisterPassword, setUserRegisterPassword, confirmPassword, setConfirmPassword,submitHandler, userEmail,setUserEmail,userPassword,setUserPassword,imageState,setImageState }) => {

    const [emailError, setEmailError] = useState('');
    const navigate =useNavigate()


    const handleSignUp = async () => {
      try {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, userRegisterEmail, userRegisterPassword);
  
        // Send email verification
        await sendEmailVerification(userCredential.user);
  
        // Inform user to check email for verification link
        alert('Verification email sent. Please check your email.');
  
      } catch (error) {
        console.error('Error signing up:', error.message);
      }
    };

    return (
    < >
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
                    
            <Button variant="primary" onClick={submitHandler} >
              sign In
            </Button>
            <Button variant="primary" onClick={()=>{
              setImageState(true)
              setShowLoginUserModal(false)
              navigate('/forgotPassword')
              }} >
              Forgot Password
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
            <Button variant="primary"  onClick={async(e)=>{
             await  handleSignUp()
              registerSubmit(e)
             
              }} disabled={''}>
              sign Up
            </Button>
          </Modal.Footer>
        </Modal>

  </>
  )
}

export default LoginuserModal