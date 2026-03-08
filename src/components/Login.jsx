
import React from "react";

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


export default function Login() {

  const navigate = useNavigate();

  const [form,setForm]=useState({
    email:"",
    password:""
  });

  const handleChange=(e)=>{
     setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
     try {
      const res=await axios.post(`${import.meta.env.VITE_API_URL}users/login`,form);
      localStorage.setItem("auth-token", res.data.authToken);
      
      toast("Login successful");
      
     setTimeout(() => {
      navigate("/home");
    }, 1500);
   
     } catch (error) {
     
       toast("Invalid credentials")
       console.log(error);
     }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
     <ToastContainer/>

      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">

    
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-400">PassOP</h1>
          <p className="text-gray-400 text-sm mt-2">
            Secure Password Manager
          </p>
        </div>

       
        <form onSubmit={handleSubmit}  className="flex flex-col gap-4">

       
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange}
              name="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

      
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

       
          <button
            type="submit"
            className="mt-4 bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 rounded-lg"
          >
            Login
          </button>

        </form>

      <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-400 hover:underline"
          >
            Register
          </Link>
        </p>


      </div>
     
 
    </div>
  );
}

