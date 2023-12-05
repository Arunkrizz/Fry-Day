import React from 'react'
import '../../styles/adminSignIn.css'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";

import { useAdminRegisterMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminAuthSlice";

import { toast } from "react-toastify";

import Loader from "../../components/UserComponents/Loader";

function AdminRegister() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminRegistrationKey, setAdminRegistrationKey] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminInfo } = useSelector((state) => state.adminAuth);

  const [register, { isLoading }] = useAdminRegisterMutation();

  useEffect(() => {

    if (adminInfo) {

      navigate('/admin');

    }

  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      toast.error('Passwords do not match.');

    } else {

      try {

        const responseFromApiCall = await register({ name, email, password, adminRegistrationKey }).unwrap();

        dispatch(setCredentials({ ...responseFromApiCall }));

        navigate('/admin');

      } catch (err) {

        toast.error(err?.data?.message || err?.error);

      }

    }

  };


  return (
    <div className="full-screen-div">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text"
              placeholder="Enter name here..."
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <label>Name</label>
          </div>
          <div className="user-box">
            <input type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
            <label>Confirm Password</label>
          </div>
          <div className="user-box">
            <input type="password"
              placeholder="Enter admin registration code"
              value={adminRegistrationKey}
              onChange={(e) => setAdminRegistrationKey(e.target.value)} />
            <label>Admin Registration Code</label>
          </div>
          <a onClick={submitHandler}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
        { isLoading && <> <Loader/> </>}
      </div>
    </div>
  )
}

export default AdminRegister