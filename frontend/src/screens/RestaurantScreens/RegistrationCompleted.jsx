import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


function RegistrationCompleted() {



  // console.log(hotelInfo.hotelInfo.approved,"hotelinfo")

  return (
    <>
     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}><h1 style={{ color: "red" }}>registrationCompleted Pending approval go to home to view status</h1>
     <Link to='/hotel/home'>
      <Button variant="outline-info" id="button-addon2" style={{ marginTop: "20px" }} >
            Home
          </Button>
          </Link>
      </div>
       
    </>
  )
}

export default RegistrationCompleted