import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import ErrorPage from './screens/ErrorScreen.jsx';
import NotFoundPage from './screens/404ErrorScreen.jsx'
//? ==================================== User Screens Import ====================================
import PrivateRoutes from './screens/PrivateRoutes.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import HomePage from './screens/userScreens/HomePage.jsx';
import ChatScreen from './screens/userScreens/ChatScreen.jsx'
import Cart from './screens/userScreens/CartScreen.jsx'
import EmailVerificationComponent from './components/UserComponents/EmailVerificationComponent.jsx'
import ForgotPasswordScreen from './screens/userScreens/forgotPasswordScreen.jsx'
import PasswordOtpVerify from './screens/userScreens/PasswordOtpVerify.jsx'
import UpdateProfileScreen from './screens/userScreens/UpdateProfileScreen.jsx'
import ManageAddress from './screens/userScreens/ManageAddress.jsx'
import OrderScreen from './screens/userScreens/OrderScreen.jsx'

//? ==================================== Admin Screens Import ====================================
import AdminPrivateRoutes from './screens/adminScreens/PrivateRoutes.jsx';
import AdminHomeScreen from './screens/adminScreens/HomeScreen.jsx';
import AdminLoginScreen from './screens/adminScreens/LoginScreen.jsx';
import AdminRegisterScreen from './screens/adminScreens/RegisterScreen.jsx';
import AdminProfileScreen from './screens/adminScreens/ProfileScreen.jsx';
import UsersManagementScreen from './screens/adminScreens/UsersManagementScreen.jsx';
import LandingPage from './screens/userScreens/LandingPage.jsx'
import AdminSignIn from './screens/adminScreens/AdminSignIn.jsx';
import AdminRegister from './screens/adminScreens/AdminRegister.jsx';
import CategoriesManagementScreen from './screens/adminScreens/CategoryManagementScreen.jsx';
import ReportedPostsScreen from './screens/adminScreens/ReportedPostManagement.jsx';

//? ======================================Restaurant Screen imports ===================================
import RestaurantLandingPage from './screens/RestaurantScreens/LandingPage.jsx'
import RegistrationScreen from './screens/RestaurantScreens/RegistrationScreen.jsx';
import RegistrationCompleted from './screens/RestaurantScreens/registrationCompleted.jsx';
import RestaurantManagement from './screens/adminScreens/RestaurantManagement.jsx'
import RestaurantLogin from './screens/RestaurantScreens/LoginScreen.jsx'
import RestaurantHome from './screens/RestaurantScreens/Homescreen.jsx'
import HotelChatScreen from './screens/RestaurantScreens/ChatScreen.jsx';
import LiveScreen from './screens/RestaurantScreens/LiveScreen.jsx';
import RestaurantPrivateRoutes from './screens/RestaurantScreens/RestaurantPrivateRoutes.jsx'
import ResetPassword from './screens/userScreens/ResetPasswordScreen.jsx'
import DashboardRestaurant from './screens/RestaurantScreens/DashboardRestaurant.jsx';

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path='/' element={ <App/> } >

<Route path='/error-page' element={<ErrorPage/>} />

<Route path='*' element={<NotFoundPage/>} />

      { /* ===================================== User Routes ===================================== */ }

      <Route index={true} path='/' element={ <HomeScreen /> } />

     
      <Route path="/user/emailVerified" element={<EmailVerificationComponent/>} />

      <Route path='/forgotPassword' element={ <ForgotPasswordScreen /> } />

      <Route path='/passwordOtpVerify' element={<PasswordOtpVerify />} />

      <Route path='/resetPassword' element={<ResetPassword />} />




      <Route path='/login' element={ <LoginScreen /> } />

      <Route path='/register' element={ <RegisterScreen /> } />

      {/* USER PRIVATE ROUTES */}
      <Route path='' element={ <PrivateRoutes /> } >

      {/* <Route path='/user/live' element={ <LiveScreen/>  } /> */}
        
        <Route path='/user/profile' element={ <ProfileScreen /> } />

        <Route path='/user/myOrders' element={ <OrderScreen /> } />

        <Route path='/user/updateProfile' element={<UpdateProfileScreen />}/>

        <Route path='/user/manageAddress' element={<ManageAddress />}/>

        <Route index={true} path='/user/home/*' element={ <HomePage /> } />

        <Route path='/user/chat' element={<ChatScreen />} />

        <Route path='/user/cart' element={<Cart />}/>




        {/* <Route  path='/user/restaurant' element={ <RestaurantProfile /> } /> */}

      </Route>

      { /* ===================================== Restaurant Routes ===================================== */ }

      {/* <Route path='/hotel' element={ <RestaurantLandingPage />  } /> */}
      <Route path='/hotel' element={ <RestaurantLandingPage/>  } />

      <Route path='/hotel/register' element={ <RegistrationScreen/>  } />

      <Route path='/hotel/registerCompleted' element={ <RegistrationCompleted/>  } />

      {/* <Route path='/hotel/login' element={ <RestaurantLogin/>  } /> */}

       {/* USER PRIVATE ROUTES */}
       <Route path='' element={ <RestaurantPrivateRoutes /> } >

       <Route path='/hotel/live' element={ <LiveScreen/>  } />
        
       <Route path='/hotel/home/*' element={ <RestaurantHome/>  } />

       <Route path='/hotel/chat' element={ <HotelChatScreen/>  } />

       <Route path='/hotel/dashboard' element={ <DashboardRestaurant/>  } />


      </Route>
      



      
      { /* ===================================== Admin Routes ===================================== */ }

      <Route path='/admin' element={ <AdminHomeScreen /> } />
  

      {/* <Route path='/admin/login' element={ <AdminLoginScreen /> } /> */}
      <Route path='/admin/login' element={ <AdminSignIn /> } />

      {/* <Route path='/admin/register' element={ <AdminRegisterScreen /> } /> */}
      <Route path='/admin/register' element={ <AdminRegister /> } />

      <Route path='/admin/error-page' element={<ErrorPage/>} />

      {/* ADMIN PRIVATE ROUTES */}
      <Route path='' element={ <AdminPrivateRoutes /> } >
        
        <Route path='/admin/profile' element={ <AdminProfileScreen /> } />

        <Route path='/admin/manage-users' element={ <UsersManagementScreen /> } />
        
        <Route path='/admin/manage-hotels' element={ <RestaurantManagement /> } />

        <Route path='/admin/manage-categories' element={ <CategoriesManagementScreen /> } />
        
        <Route path='/admin/reported-posts' element={ <ReportedPostsScreen /> } />



      </Route>

    </Route>

  )

);



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store} >

    <React.StrictMode>
    <ChakraProvider>
      
      <RouterProvider router={ router } />
  
    </ChakraProvider>

    </React.StrictMode>

  </Provider>

);
