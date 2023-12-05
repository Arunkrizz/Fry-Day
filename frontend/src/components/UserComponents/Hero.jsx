import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PROFILE_IMAGE_DIR_PATH } from '../../utils/constants';
import { useEffect } from 'react';

const Hero = () => {
  const navigate = useNavigate()

  const { userInfo } = useSelector( (state) => state.auth);

  

  useEffect(()=>{
    if(userInfo){
      console.log("naav / react");
      navigate("/user/home")
    }
  },[])


  return (
   <>
   {userInfo?<h1>home</h1>:""}
   
   </>
  );
};

export default Hero;