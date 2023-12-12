import React from 'react'
import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap';
import GoogleAuth from '../UserComponents/GoogleoAuth.jsx'
import GoogleAuthSignIn from '../UserComponents/GoogleoAuthsignIn.jsx'
import { useState } from 'react';



const LoginuserModal = ({ showLoginUserModal, setShowLoginUserModal,showRegisterUserModal, setshowRegisterUserModal, registerSubmit, userRegisterName, setUserRegisterName, userRegisterMobile, setUserRegisterMobile, userRegisterEmail, setUserRegisterEmail, userRegisterPassword, setUserRegisterPassword, confirmPassword, setConfirmPassword,submitHandler }) => {
    const [userEmail, setUserEmail] = useState("");
    const [emailError, setEmailError] = useState('');
    const [userPassword, setUserPassword] = useState("");
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

  </>
  )
}

export default LoginuserModal