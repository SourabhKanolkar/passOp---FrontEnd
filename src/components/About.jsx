import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export default function About() {

  const [user, setUser] = useState(null);
  const token = localStorage.getItem("auth-token");

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${apiUrl}users/getuser`, {
        headers: {
          "auth-token": token,
        },
      });

      setUser(res.data);
    } catch (error) {
      toast("Failed to load user info");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">

        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 text-center">

          <h1 className="text-3xl font-bold text-green-400 mb-6">
            About Your Account
          </h1>

          {user ? (
            <div className="space-y-4 text-gray-300">

              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>

              <div className="mt-6 text-green-400 text-sm">
                Your passwords are securely managed with PassOP 🔐
              </div>

            </div>
          ) : (
            <p className="text-gray-400">Loading user data...</p>
          )}

        </div>

      </div>

      <Footer />
    </>
  );
}