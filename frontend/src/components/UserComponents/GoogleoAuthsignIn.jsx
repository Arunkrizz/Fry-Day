import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../../slices/authSlice";
import { useGoogleLoginMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


function GoogleoAuthSignIn(props) {



  const [googleSignIn, { isLoading }] = useGoogleLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  return (

    <div>
   

<GoogleOAuthProvider clientId="1086782616571-ai35ufuc30c4l62ffa9eesb4o20abutg.apps.googleusercontent.com">
<GoogleLogin
onSuccess={async (credentialResponse) => {
  try{
    navigate('/user/home');
    const decoded = jwtDecode(credentialResponse.credential);
   
    
      const responseFromApiCall = await googleSignIn( { userName:decoded.name, userPicture:decoded.picture, userEmail:decoded.email } ).unwrap();
      dispatch( setCredentials( { ...responseFromApiCall } ) );
      props.setShowLoginUserModal(false)

  }catch(err){
    toast.error( err?.data?.message || err?.error );
  }


}}
onError={() => {
console.log('Login Failed');
}}
/>
  </GoogleOAuthProvider>
    </div>
  )
}

export default GoogleoAuthSignIn