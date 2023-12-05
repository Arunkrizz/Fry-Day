import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/UserComponents/FormContainer";

import { useDispatch, useSelector } from "react-redux";

import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";


import { toast } from "react-toastify";

import Loader from "../components/UserComponents/Loader";






const RegisterScreen = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { userInfo } = useSelector( (state) => state.auth );

  const [register, { isLoading }] = useRegisterMutation();

  useEffect( () => {

    if(userInfo) {

      navigate('/');

    }

  }, [ navigate, userInfo ] );

  const submitHandler = async (e) => {
    
    e.preventDefault();
    
    if(password !== confirmPassword){

      toast.error('Passwords do not match.');

    }else{

      try{

        const responseFromApiCall = await register( { name, email, password } ).unwrap();

        dispatch( setCredentials( { ...responseFromApiCall } ) );
        
        navigate('/');

      }catch(err){

        toast.error( err?.data?.message || err?.error );

      }

    }

  };



  return (
    <></>
  );
};

export default RegisterScreen;
