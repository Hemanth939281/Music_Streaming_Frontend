import './App.css';
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './redux/features/userSlice';
import { Outlet } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBars, FaTimes } from "react-icons/fa";

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsMenuOpen(false);
    toast.success("logged out successfully")
    Navigate('/');
  };


  return (
    <>
      <div className="overflow-hidden">
        <Toaster position='top-center'/>
        <header className="w-full bg-gray-800 p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/">
        <h1 className="text-xl font-bold text-white">MusicStream</h1>
      </Link>
      
      {/* Mobile Menu Toggle */}
      <button className="text-white md:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Navigation */}
      <nav
        className={`md:flex md:items-center md:gap-4 absolute md:static top-16 right-0 bg-gray-800 w-full md:w-auto p-4 md:p-0 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "block" : "hidden md:flex"
        }`}
      >
        {user ? (
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-white">Welcome, {user.name}</span>
            <Link to="/songs" onClick={() => setIsMenuOpen(false) }>
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer">Songs</button>
            </Link>
            <Link to="/songupload" onClick={() => setIsMenuOpen(false) }>
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer">Upload Song</button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <Link to="/login" onClick={() => setIsMenuOpen(false) }>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">Login</button>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false) }>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer">Sign Up</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
        <Outlet/>
      </div>
    </>
  );
}

export default App;
