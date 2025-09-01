import React, { useRef, useCallback } from 'react';
import { login } from '../lib/api';
import {  Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';

function LoginPage() {
  const refEmail = useRef();
  const refPassword = useRef();
  const dispatch = useDispatch();
  const handleLogin = useCallback(async () => {
    const email = refEmail.current.value;
    const password = refPassword.current.value;

    if (!email || !password) {
      alert("⚠️ Please fill in both email and password!");
      return;
    }

    const userData = { email, password };
    console.log("Attempting login with:", userData);
  
    try {
       await login(userData);  
      refEmail.current.value = "";
      refPassword.current.value = "";
     dispatch(addUser({userLoading: true}));
    } catch (err) {
      alert("❌ Login failed. Please check your credentials.");
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-300 font-cartoon">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] p-10 flex flex-col gap-6 border-4 border-black transform transition-transform duration-300 hover:scale-105">
        
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-purple-700 drop-shadow-[3px_3px_0px_#000]">
          🎬 Login to WowTube!
        </h2>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg font-bold text-gray-900">
            ✉️ Email
          </label>
          <input
            type="email"
            ref={refEmail}
            id="email"
            className="p-3 border-4 border-black rounded-xl bg-yellow-100 placeholder-gray-500 
                       focus:outline-none focus:ring-4 focus:ring-pink-400 
                       transform transition-transform duration-200 hover:-translate-y-1"
            placeholder="Enter your email..."
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-lg font-bold text-gray-900">
            🔑 Password
          </label>
          <input
            type="password"
            ref={refPassword}
            id="password"
            className="p-3 border-4 border-black rounded-xl bg-yellow-100 placeholder-gray-500 
                       focus:outline-none focus:ring-4 focus:ring-pink-400 
                       transform transition-transform duration-200 hover:-translate-y-1"
            placeholder="Enter your password..."
          />
        </div>

        {/* Button */}
        <button
          onClick={()=>{handleLogin();
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-xl 
                     font-extrabold transition-all duration-300 transform -translate-y-1 -translate-x-1 
                     shadow-[5px_5px_0px_#000] border-4 border-black hover:scale-110 active:translate-y-1 active:shadow-[1px_1px_0px_black]"
        >
          🚀 Let’s Go!
        </button>

        {/* Sign up link */}
        <Link 
          className="text-center font-bold text-blue-600 hover:text-blue-800 underline underline-offset-4"
          to="/signup"
        >
          Don’t have an account? Sign up here! 🎉
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
