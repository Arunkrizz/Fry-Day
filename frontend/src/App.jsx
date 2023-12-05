import { Outlet, useLocation } from "react-router-dom";
// import { Container } from "react-bootstrap";
import UserHeader1 from "./components/UserComponents/UserSideBar.jsx";
import UserHeader from "./components/UserComponents/Header";
import AdminHeader from "./components/AdminComponents/AdminHeader";
import AdminSidebar from './components/AdminComponents/AdminSideBar.jsx'
import HotelHeader from './components/RestaurantComponents/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/UserComponents/Footer'
// import GoogleAuth from './components/UserComponents/GoogleoAuth.jsx'
import React, {  useContext } from "react";
import ProgressBarContext from "../store/progressBarStore.jsx";
import RegistrationHeader from "./components/RestaurantComponents/RegistrationHeader.jsx";
import ChatProvider from "./components/context/chatProvider.jsx";




const App = () => {

  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");
  const isHotelPage = location.pathname.startsWith("/hotel");
  const isUserPage =  location.pathname.startsWith("/user"); 
  const isHotelRegPage = location.pathname.startsWith("/hotel/register");


  let header;
if(isAdminPage){
  header=<AdminSidebar/>
}else if(isHotelRegPage){
  header=<RegistrationHeader/>
}
else if(isHotelPage){
  header=<HotelHeader/>
}else if(isUserPage){
  header=<UserHeader1/>
}else {
  header=<UserHeader/>
}


  
  return (

    <>


      
<ProgressBarContext>
<ChatProvider>
  {header}
  
      {/* { isAdminPage ? <AdminHeader/> : <UserHeader/> } */}

      <ToastContainer />

        
       {(isUserPage||isAdminPage) ?"":<Outlet/>} 
       
      
      

     
      {/* {(!isAdminPage)?<Footer/>:null} */}

      </ChatProvider>

      </ProgressBarContext>

      
   
   
    </>

  );

}

export default App;
