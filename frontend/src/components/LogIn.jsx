import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import {toast , ToastContainer} from 'react-toastify';

const LogIn = () => {
  const [state, setState] = useState("Sign In");
  const {showLogin , setShowLogin , backendUrl , setUser ,setToken} = useContext(AppContext)
  useEffect(()=>{
    document.body.style.overflow = 'hidden'
    return ()=>{
        document.body.style.overflow = 'unset'
    }

  },[])
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (state === "Sign In") {
      console.log("Signing in with", credentials);
      const response = await fetch(`${backendUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        // window.location.reload();
        setUser(data.user);
        setToken(data.token);
        setShowLogin(false);
        toast.success("Login successful!")
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
      
    } 
    if (state === "Sign Up") {
      console.log("Signing up with", credentials);
      // Add sign-up logic here
      const response = await fetch(`${backendUrl}/api/user/register`, {
        method: "POST",
        headers: {  
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.fullName,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) { 
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        // window.location.reload();
        setUser(data.user);
        setToken(data.token);
        toast.success("Registration successful!")
      } else {  
        toast.error(data.message || "Registration failed. Please try again.");
      }
    }
  }
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-100 backdrop-blur-sm  bg-black/30 flex justify-center items-center">
        <form className="relative  bg-white p-10 rounded-xl text-slate-500" onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl text-neutral-700 font-medium">
            {state}
          </h1>
          {state === "Sign In" && (
            <p className="text-sm my-1">
              {" "}
              Welcome back! Please sign in to continue.
            </p>
          )}
          {state === "Sign Up" && (
            <div className="px-4 py-2 border rounded-full mt-5 flex items-center gap-2">
              <img width={22} src={assets.profile_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="text"
                placeholder="Full Name"
                required
                name="fullName"
                value={credentials.fullName}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="px-4 py-2 border rounded-full mt-4 flex items-center gap-2">
            <img src={assets.email_icon} alt="" />
            <input
              className="outline-none text-sm"
              type="email"
              placeholder="Email Id"
              required
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="px-4 py-2 border rounded-full mt-4 flex items-center gap-2">
            <img src={assets.lock_icon} alt="" />
            <input
              className="outline-none text-sm"
              type="password"
              placeholder="Password"
              required
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <p className="text-sm text-blue-600 my-4 cursor-pointer">
            Forgot Password?
          </p>
          <button className="bg-blue-600 w-full text-white py-2 rounded-full">
            {state === "Sign Up" ? "Create Account" : "Sign In"}{" "}
          </button>
          {state === "Sign In" ? (
            <p className="mt-5 text-center">
              Don't have an Account ?{" "}
              <span onClick={()=>{
                setState('Sign Up')
              }} className="text-blue-600 cursor-pointer">Sign Up</span>
            </p>
          ) : (
            <p className="mt-5 text-center">
              Already have an Account ?{" "}
              <span onClick={()=>{
                setState('Sign In')
              }} className="text-blue-600 cursor-pointer">Sign In</span>
            </p>
          )}
          <img
          onClick={()=>{
            setShowLogin(false)

          }}
            className="absolute top-5 right-5 cursor-pointer"
            src={assets.cross_icon}
            alt=""
          />
        </form>
      </div>
    </>
  );
};

export default LogIn;
