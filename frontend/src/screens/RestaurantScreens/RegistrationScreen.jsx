import React from 'react'
import ProgressBar from  '../../components/RestaurantComponents/ProgressBarStepper.jsx'
import RegForm1 from '../../components/RestaurantComponents/RegistrationForm1.jsx'
import RegForm2 from '../../components/RestaurantComponents/RegistrationForm2.jsx'
import RegForm3 from '../../components/RestaurantComponents/RegistrationForm3.jsx'
import   '../../styles/restaurantRegistration.css'
import AddProductForm from '../../components/RestaurantComponents/AddProduct.jsx'
import  { ProgressBarContext } from '../../../store/progressBarStore.jsx'; 
import {useContext,useEffect} from 'react';
import HotelHeader from '../../components/RestaurantComponents/Header';
import RegistrationStepper from '../../components/RestaurantComponents/ResgistrationStepper.jsx'


function RegistrationScreen() {
  const { activeStep } = useContext(ProgressBarContext);
 

  return (
    <div className="container1" >
    
  <div >
    <RegistrationStepper />
  </div>
 <div style={{ marginLeft:"60px", width: '60%' }}>
    
    {activeStep === 0 ? <RegForm1 /> : null}
        {activeStep === 1 ? <RegForm2 /> : null}
        {activeStep === 2 ? <RegForm3 /> : null}

  </div>
 

 
  {/* <div>
  <AddProductForm/>
  </div> */}
  {/* <div>
  <HeaderList/>
  </div> */}
</div>
  )
}

export default RegistrationScreen