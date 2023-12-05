import React, { useEffect } from 'react'
import NavPill from '../../components/RestaurantComponents/NavPills'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from "react-router-dom";


function LandingPage() {
  const navigate = useNavigate()
  const { hotelInfo } = useSelector((state) => state.hotelAuth);
console.log(hotelInfo,"landing page res ")

  useEffect(()=>{
    if(hotelInfo){
      console.log("landing useeffect")
      navigate('/hotel/home')
    }
  },[])

  return (
    <>
    <div>
    <h3  style={{
                    
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom:"30px"
                    
                   
                }}>Why should you partner with Fry-Day?</h3>
    <h5
    style={{
                    
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:"10px"
        
       
    }}>Fry-Day enables you to get 60% more revenue, 10x new customers and boost your brand</h5>
    <h5
    style={{
                    
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
        
       
    }}>visibility by providing insights to improve your business.  </h5>
    </div>
    <div style={{ display: 'flex' ,marginRight:"20px", marginLeft:"50px"}}>
        <NavPill value={"1000+ cities"} value2={"in India"}  style={{marginLeft:"20px"}}/> 
        <NavPill value={"3 lakh+"} value2={"restaurant listings"}/>
        <NavPill value={"5.0 crore+"} value2={"monthly orders"}/>
        <NavPill value={"10.0 crore+"} value2={"saisfied Customers"}/>
        
      
    </div>
    </>
  )
}

export default LandingPage