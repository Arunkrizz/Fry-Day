import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";


import FormContainer from "../components/UserComponents/FormContainer";
import { toast } from "react-toastify";

import Loader from "../components/UserComponents/Loader";



const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector( (state) => state.auth );

  useEffect( () => {

    if(userInfo) {

      navigate('/');

    }

  }, [ navigate, userInfo ] );

  const submitHandler = async (e) => {

    e.preventDefault();

    try {
      
      const responseFromApiCall = await login( { email, password } ).unwrap();

      dispatch( setCredentials( { ...responseFromApiCall } ) );
      
      navigate('/');

    }catch(err){

      toast.error( err?.data?.message || err?.error );

    }

  };

  return (
    <></>
  );
};

export default LoginScreen;
