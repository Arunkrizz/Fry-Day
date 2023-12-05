import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form as BootstrapForm } from "react-bootstrap";
import { useState } from "react";
import Card from 'react-bootstrap/Card';



function LoginScreen() {

    const [userEmail, setUserEmail] = useState("");
    const [emailError, setEmailError] = useState('');

    const [userPassword, setUserPassword] = useState("");
    const variant = 'Light'
    return (
        <div>
            <Card
              bg={variant.toLowerCase()}
              key={"1"}
              text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
              className="mb-2"
              style={{ paddingLeft: "20px", paddingTop: '20px', paddingBottom: '20px' }}
              >
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
            </Card>
        </div>
    )
}

export default LoginScreen