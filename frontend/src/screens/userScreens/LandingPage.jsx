import React from 'react';
import Image from 'react-bootstrap/Image';
import { Button, Modal, Form as BootstrapForm } from "react-bootstrap";
import { useState } from "react";
import GoogleAuth from '../../components/UserComponents/GoogleoAuth'



function FluidExample() {
  const imageSrc = "https://imgs.search.brave.com/y9lqo7VFEmKaJ2oUfWfQuu6FmOkDkMtNfQCv1phQ9m0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA0/NzA0MTE3L3Bob3Rv/L3Jlc3RhdXJhbnQt/cGxhdGVzLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NaEZk/Tl9xVmd6b0hvdi1r/Z0Z4MHFXU1cwblpo/dDRsWlYxemluQzNF/YTQ0PQ";
  
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [showAddUserModal, setShowAddUserModal] = useState(false);




    const handleOpenAddUserModal = () => {
     
        setShowAddUserModal(true);
      };
  

  return (
    <div >
      <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
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
                   <h6>or sign in with google</h6> <GoogleAuth/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={''} disabled={''}>
                      sign In
                    </Button>
                </Modal.Footer>
            </Modal>
      <Image src={imageSrc} className="no-padding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} fluid />
    </div>
  );
}

export default FluidExample;
