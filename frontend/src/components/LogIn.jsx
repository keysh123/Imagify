import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const LogIn = () => {
  const [state, setState] = useState("Sign In");
  const {showLogin , setShowLogin} = useContext(AppContext)
  useEffect(()=>{
    document.body.style.overflow = 'hidden'
    return ()=>{
        document.body.style.overflow = 'unset'
    }

  },[])
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-0 backdrop-blur-sm  bg-black/30 flex justify-center items-center">
        <form className="relative  bg-white p-10 rounded-xl text-slate-500">
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
            />
          </div>
          <div className="px-4 py-2 border rounded-full mt-4 flex items-center gap-2">
            <img src={assets.lock_icon} alt="" />
            <input
              className="outline-none text-sm"
              type="password"
              placeholder="Password"
              required
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
