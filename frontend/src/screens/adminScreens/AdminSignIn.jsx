import React from 'react'
import '../../styles/adminSignIn.css'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/UserComponents/Loader";

import { useAdminLoginMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminAuthSlice";


function AdminSignIn() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useAdminLoginMutation();

  const { adminInfo } = useSelector((state) => state.auth);

  useEffect(() => {

    if (adminInfo) {

      navigate('/admin');

    }

  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const responseFromApiCall = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...responseFromApiCall }));

      navigate('/admin');

    } catch (err) {

      toast.error(err?.data?.message || err?.error);
      

    }

  };

  return (
    <div className="full-screen-div">
      <div className="login-box">
        <h2>Login</h2>
        <form >
          <div className="user-box">
            <input
              type="text"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <a onClick={submitHandler}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>

        </form>
        {isLoading && <> <Loader /> </>}
      </div>
    </div>
  )
}

export default AdminSignIn