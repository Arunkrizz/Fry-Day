import React from 'react'
import { Button, Modal, Form as BootstrapForm } from "react-bootstrap";
import { useState } from "react";
import GoogleAuth from '../UserComponents/GoogleoAuth'

function SignInModal() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
  
    const [showAddUserModal, setShowAddUserModal] = useState(false);
  
  
  
  
    const handleOpenAddUserModal = () => {
     
        setShowAddUserModal(true);
        // console.log(showAddUserModal,"shown")
      };


  return (
    <div >
      <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BootstrapForm>
                       
                    <BootstrapForm.Group controlId="name">
                            <BootstrapForm.Label>Name</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="text"
                                value={userName}
                                onChange={(e) =>
                                    setUserEmail(e.target.value)
                                }
                            />
                        </BootstrapForm.Group>

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
                   <h6>or sign in with google</h6> <GoogleAuth/>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={() => setShowAddUserModal(false)}>
                        Cancel
                    </Button> */}
                    <Button variant="primary" onClick={''} disabled={''}>
                      sign In
                        {/* {isUpdating ? "Adding..." : "Add User"} */}
                    </Button>
                </Modal.Footer>
            </Modal>
     
    </div>
  )
}

export default SignInModal