import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  return (
    <nav className="bg-slate-800 text-white w-full">
      <div className="mycontainer flex justify-between items-center h-16">
        {/* Logo */}
        <div className="logo font-bold text-2xl flex-shrink-0">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 items-center">
          <Link to="/home" className="hover:text-green-400 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-400 transition-colors">
            About
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-full font-semibold"
          >
            Logout
          </button>
         
          {/* <button className="text-white bg-green-700 my-5 rounded-full flex  justify-between items-center ring-white ring-1">
            <img
              className="invert w-10 p-1 "
              src="./github.svg"
              alt="git-hub-icon"
            />
            <span className="font-bold px-2">GitHub</span>
          </button> */}
        </ul>

        {/* Mobile Hamburger - Improved Hit Area */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`h-1 w-full bg-white rounded-lg transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`h-1 w-full bg-white rounded-lg transition-all ${isOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`h-1 w-full bg-white rounded-lg transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu - Animates down */}
      <div
        className={`${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"} md:hidden overflow-hidden transition-all duration-300 bg-gray-900`}
      >
        <div className="flex flex-col gap-4 p-4 items-center">
          <Link to="/home" className="hover:text-green-400 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-400 transition-colors">
            About
          </Link>
          {/* <button className="text-white bg-green-700 my-5 rounded-full flex  justify-between items-center ring-white ring-1">
            <img
              className="invert w-10 p-1 "
              src="./github.svg"
              alt="git-hub-icon"
            />
            <span className="font-bold px-2">GitHub</span>
          </button> */}
            <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-full font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
