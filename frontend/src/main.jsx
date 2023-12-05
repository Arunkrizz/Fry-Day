import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

//? ==================================== User Screens Import ====================================
import PrivateRoutes from './screens/PrivateRoutes.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import HomePage from './screens/userScreens/HomePage.jsx';
import ChatScreen from './screens/userScreens/ChatScreen.jsx'


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


//? ======================================Restaurant Screen imports ===================================
import RestaurantLandingPage from './screens/RestaurantScreens/LandingPage.jsx'
import RegistrationScreen from './screens/RestaurantScreens/RegistrationScreen.jsx';
import RegistrationCompleted from './screens/RestaurantScreens/registrationCompleted.jsx';
import RestaurantManagement from './screens/adminScreens/RestaurantManagement.jsx'
import RestaurantLogin from './screens/RestaurantScreens/LoginScreen.jsx'
import RestaurantHome from './screens/RestaurantScreens/Homescreen.jsx'
import HotelChatScreen from './screens/RestaurantScreens/ChatScreen.jsx';
import RestaurantPrivateRoutes from './screens/RestaurantScreens/RestaurantPrivateRoutes.jsx'

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path='/' element={ <App/> } >

      { /* ===================================== User Routes ===================================== */ }

      <Route index={true} path='/' element={ <HomeScreen /> } />

     

      <Route path='/login' element={ <LoginScreen /> } />

      <Route path='/register' element={ <RegisterScreen /> } />

      {/* USER PRIVATE ROUTES */}
      <Route path='' element={ <PrivateRoutes /> } >
        
        <Route path='/user/profile' element={ <ProfileScreen /> } />

        <Route index={true} path='/user/home/*' element={ <HomePage /> } />

        <Route path='/user/chat' element={<ChatScreen />} />

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
        
       <Route path='/hotel/home/*' element={ <RestaurantHome/>  } />

       <Route path='/hotel/chat' element={ <HotelChatScreen/>  } />


      </Route>
      



      
      { /* ===================================== Admin Routes ===================================== */ }

      <Route path='/admin' element={ <AdminHomeScreen /> } />
  

      {/* <Route path='/admin/login' element={ <AdminLoginScreen /> } /> */}
      <Route path='/admin/login' element={ <AdminSignIn /> } />

      {/* <Route path='/admin/register' element={ <AdminRegisterScreen /> } /> */}
      <Route path='/admin/register' element={ <AdminRegister /> } />

      {/* ADMIN PRIVATE ROUTES */}
      <Route path='' element={ <AdminPrivateRoutes /> } >
        
        <Route path='/admin/profile' element={ <AdminProfileScreen /> } />

        <Route path='/admin/manage-users' element={ <UsersManagementScreen /> } />
        
        <Route path='/admin/manage-hotels' element={ <RestaurantManagement /> } />

        <Route path='/admin/manage-categories' element={ <CategoriesManagementScreen /> } />


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
