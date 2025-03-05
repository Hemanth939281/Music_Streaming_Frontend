
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

const Signup = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, easing: "ease-in-out" });
    }, []);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
      
        if (passwordRef.current.value.length < 8) {
            setError("Password should be at least 8 characters long");
            return;
        }
    
        try {
            const res = await axios.post("http://localhost:5000/users/register", {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
    
            dispatch(setUser({ user: res.data.user, accessToken: res.data.accessToken }));
            toast.success(res.data.message);
            e.target.reset;
            navigate("/songs");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };
  
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <div className="hidden lg:flex lg:w-1/2 justify-center items-center p-12" data-aos="fade-right">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-white mb-4">Rhythm</h1>
                    <p className="text-lg text-gray-300">Discover. Stream. Experience.</p>
                </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8" data-aos="fade-left">
                <div className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-white">Create Account</h2>
                        <p className="text-gray-800 mt-2">Join the music revolution today</p>
                    </div>
                    {error && (
                        <div className="mb-6 py-3 px-4 bg-red-500 bg-opacity-30 border border-red-500 rounded-lg">
                            <p className="text-red-200 text-center text-sm">{error}</p>
                        </div>
                    )}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <input ref={nameRef} type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-500 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500" required />
                        <input ref={emailRef} type="email" placeholder="Email" className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-500 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500" required />
                        <input ref={passwordRef} type="password" placeholder="Password" className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-500 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500" required />
                        <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400">
                            Create Account
                        </button>
                    </form>
                    <p className="text-center text-gray-800 mt-4">
                        Already have an account? <a href="/login" className="font-medium  hover:underline">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
