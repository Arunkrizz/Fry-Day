import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";

import {  useSelector } from "react-redux";


import { PROFILE_IMAGE_DIR_PATH } from "../utils/constants";

import { Heading,Box,Text,Button } from '@chakra-ui/react'




const ProfileScreen = () => {

  const navigate=useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


 

  const { userInfo } = useSelector( (state) => state.auth );




  useEffect(() => {

    setName(userInfo.name);
    setEmail(userInfo.email);

  },[ userInfo.name, userInfo.email])

 



  return (
    
<>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {userInfo.profileImageName && (
        <img
          // src={PROFILE_IMAGE_DIR_PATH + userInfo.profileImageName}
          src={(!userInfo?.profileImageName?.startsWith('https://')) ? (`${PROFILE_IMAGE_DIR_PATH}${userInfo?.profileImageName}`) : `${userInfo?.profileImageName}`}

          alt={userInfo.name}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            marginTop: "5px",
            marginLeft: "115px",
            marginBottom: "10px",
            marginRight: "25px"
          }}
        />
      )}
      <Box maxW='32rem'>
  <Heading mb={4}>{name}</Heading>
  <Text fontSize='xl'>
    {email}
  </Text>
  <Button size='lg' colorScheme='green' mt='24px'  mr="20px" onClick={()=>{
    navigate('/user/updateProfile')
  }}>
    Update Profile
  </Button>
  <Button size='lg' colorScheme='blue' mt='24px' onClick={()=>{
    navigate('/user/manageAddress')
  }}>
    Manage Address
  </Button>
</Box>
</div>
    </>
  );
};

export default ProfileScreen;
