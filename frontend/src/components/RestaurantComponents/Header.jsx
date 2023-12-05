import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form as BootstrapForm } from "react-bootstrap";
import { toast } from "react-toastify";

import { useHotelLogoutMutation } from '../../slices/hotelApiSlice.js';
import { useHotelLoginMutation } from '../../slices/hotelApiSlice.js';
import { logout, setCredential } from '../../slices/hotelAuthSlice.js';




function Header() {

  const [hotelEmail, setHotelEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [hotelPassword, setHotelPassword] = useState("");
  const [showLoginHotelModal, setShowLoginHotelModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useHotelLogoutMutation();



  const [isHovered, setIsHovered] = useState(false);
  const [hotelState, setHotelState] = useState(null)
  // console.log((!hotelState&&hotelInfo),"state")

  // console.log(hotelInfo,hotelState,"header")

  const [hotelLogin] = useHotelLoginMutation();

  const submitHandler = async (e) => {
    console.log("hotel sign in")
    e.preventDefault();

    try {
      //   navigate('/home');
      console.log("login resss");
      const responseFromApiCall = await hotelLogin({ email: hotelEmail, password: hotelPassword }).unwrap();

      dispatch(setCredential({ ...responseFromApiCall }));
      setShowLoginHotelModal(false)

      navigate('/hotel/home');

    } catch (err) {

      toast.error(err?.data?.message || err?.error);

    }

  };



  const showLoginModal = () => {
    setShowLoginHotelModal(true)
  }


  const { hotelInfo } = useSelector((state) => state.hotelAuth);


  // console.log(hotelInfo, "header res")



  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlehotelState = () => {
    setHotelState(true)
  }



  const buttonStyle = {
    backgroundColor: isHovered ? '#0056b3' : '#0074d9',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    marginRight: '10px',
    paddingRight: '20px'
  };

  const buttonStyle2 = {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',

  };

  const imageSrc = "https://b.zmtcdn.com/mx-onboarding-hero87f77501659a5656cad54d98e72bf0d81627911821.webp";

  const logOutHandler = async () => {

    try {

      setHotelState(false)

      await logoutApiCall().unwrap();

      dispatch(logout());

      navigate('/hotel');

    } catch (err) {

      console.log(err);

    }

  }

  // console.log(hotelInfo.hotelInfo.restaurantName,"hotelInfo 12")

  return (
    <div>
      <header>

        <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
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

                {hotelInfo ? (

                  <>

                    <NavDropdown
                      title={hotelInfo.hotelInfo.restaurantName}
                      id="hotelName">

                      {/* <LinkContainer to='/hotel/profile'>
  <NavDropdown.Item> Profile </NavDropdown.Item>
</LinkContainer> */}

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
                        <h5  >Sign In</h5>
                      </Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/register">
                      <Nav.Link>
                        <h5 > Sign Up</h5>
                      </Nav.Link>
                    </LinkContainer>
                  </>
                )}

              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>

      </header>

      {(((!hotelInfo) && (!hotelState))) ? (
        <div
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100vh', // You can adjust the height as needed
            color: 'white', // Set the text color to white
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',


          }}
        >

          <div className="v26_3767">
            <div className="v26_3768"><h3>Partner with FRY-DAY</h3></div>
            <div className="v26_3771"><h3>at 0% commission for the 1st month!</h3></div>
            <div className="v26_3773"><h6>And get ads worth INR 1500. Valid for new
              restaurant partners in select cities.</h6></div>
            <div>
              <Link to="/hotel/register">
                <button
                  style={buttonStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handlehotelState}


                >
                  Register your restaurant
                </button>
              </Link>

              {/* <Link to="/hotel/login"> */}
              <button
                style={buttonStyle2}
                onClick={showLoginModal}
              >Login to view your existing restaurants</button>
              {/* </Link> */}

            </div>
          </div>

        </div>
      ) : ("")}


      <Modal show={showLoginHotelModal} onHide={() => setShowLoginHotelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BootstrapForm >



            <BootstrapForm.Group controlId="email">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <BootstrapForm.Control
                type="email"
                value={hotelEmail}
                onChange={(e) =>
                  setHotelEmail(e.target.value)
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
                value={hotelPassword}
                onChange={(e) =>
                  setHotelPassword(e.target.value)
                }
              />
            </BootstrapForm.Group>

          </BootstrapForm>

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
    </div>
  )
}

export default Header