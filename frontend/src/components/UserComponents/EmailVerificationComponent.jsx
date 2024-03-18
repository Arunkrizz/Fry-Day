// EmailVerificationComponent.js
import { useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { applyActionCode,checkActionCode, getAuth } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import axios from 'axios'

const EmailVerificationComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('verify');
    const mode = queryParams.get('mode');
    const oobCode = queryParams.get('oobCode');
    console.log(oobCode,"oobb");

    if (mode === 'verifyEmail' && oobCode) {
      handleEmailVerification(oobCode,email);
    } else {
      // Invalid parameters, handle appropriately (e.g., redirect to an error page)
    alert('Error verifying email.');

    }
  }, [location.search, location]);

  const handleEmailVerification = async (oobCode,email) => {
    try {
      console.log("email verification ")
      // patch only
      axios.post('/api/users/verifyMail',{
        email:email
    }).then(()=>{
        // Email verification successful
        alert('Email verification successful! You can now sign in.');

        // Redirect to the sign-in page or any other desired route
        navigate('/login');
    })

    //debugg req
  //    await checkActionCode(auth, oobCode).then((data)=>{
  //   axios.post('/api/users/verifyMail',{
  //       email:data.data.email
  //   })
  //  }).catch((err)=>{console.log(err,"error verifying")})

   

      // // Email verification successful
      // alert('Email verification successful! You can now sign in.');

      // // Redirect to the sign-in page or any other desired route
      // navigate('/login');
    } catch (error) {
      console.error('Error verifying email:', error.message);
      // Handle the error, e.g., display an error message to the user
    }
  };
  


  return (
    <div>
      <p>Verifying email...</p>
      {/* You can add a loading spinner or other UI elements here */}
    </div>
  );
}; 

export default EmailVerificationComponent;
