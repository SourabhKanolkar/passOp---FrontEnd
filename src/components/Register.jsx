import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer  } from "react-toastify";
import { toast } from "react-toastify";


export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(`${apiUrl}users/register`, form);

      localStorage.setItem("auth-token", res.data.authToken);

      toast.success("Registration successful 🎉");

          setTimeout(() => {
      navigate("/home");
    }, 1500);

    } catch (error) {

     if (error.response && error.response.data.errors) {
    toast.error(error.response.data.errors[0].msg);
  } else if (error.response && error.response.data.error) {
    toast.error(error.response.data.error);
  } else {
    toast.error("Something went wrong");
  }

      console.log(error);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <ToastContainer />

      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">

      
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-400">PassOP</h1>
          <p className="text-gray-400 text-sm mt-2">
            Create your secure account
          </p>
        </div>

    
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

     
          <div>
            <label className="text-sm text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

  
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

       
          <button
            type="submit"
            className="mt-4 bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 rounded-lg"
          >
            Register
          </button>

        </form>

       
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-green-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}