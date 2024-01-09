import React from 'react'
import { Button, Modal, Form as BootstrapForm } from "react-bootstrap";
import { useState } from "react";
import GoogleAuth from '../UserComponents/GoogleoAuth.jsx'

function RegisterModal() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
  
    const [showRegisterUserModal, setshowRegisterUserModal] = useState(false);
  
  
  
  
    const handleShowRegisterUserModal = () => {
     
        setshowRegisterUserModal(true);
      };


  return (
    <div >
      <Modal show={showRegisterUserModal} onHide={() => setshowRegisterUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    </BootstrapForm>
                   <h6>or sign up with google</h6> <GoogleAuth/>
                </Modal.Body>
                <Modal.Footer>
                 
                    <Button variant="primary" onClick={''} disabled={''}>
                      sign Up
                    </Button>
                </Modal.Footer>
            </Modal>
     
    </div>
  )
}

export default RegisterModal