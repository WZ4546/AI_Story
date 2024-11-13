import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import welcome from '../assets/wife.jpeg';
import google from '../assets/google.png';
import meta from '../assets/meta.png';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log("Registration successful");
        navigate('/');  // 注册成功后跳转到登录页面
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${welcome})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw'
      }}
      className="flex items-center justify-center"
    >
      <div className="bg-white max-w-lg w-full rounded-xl p-8 card">
        <h1 className="text-blue-700 text-4xl font-bold font-serif text-center">TechVerse</h1>
        <h1 className="text-center font-semibold text-gray-600 mt-3">🦋 Create your account to join your AI lover 🦋</h1>
        <div className="flex flex-col lg:flex-row justify-between mt-5">
          <div className="flex flex-col text-gray-500 text-sm w-full lg:w-1/2 h-full">
            <div className="p-3 border border-gray-300 items-center w-full h-20 rounded-xl flex">
              <img src={google} alt="Google" className="w-10 h-10 ml-1 logo" />
              <h1 className="ml-4">Continue with Google</h1>
            </div>
            <div className="p-3 border border-gray-300 items-center w-full h-20 rounded-xl mt-3 flex">
              <img src={meta} alt="Meta" className="w-12 h-12" />
              <h1 className="ml-4">Continue with Meta</h1>
            </div>
            <div className="mt-7 text-xs">
              <h1>By continuing you indicate that you have read and agree to TechVerse
              <span className="text-blue-400"> Terms of Service</span>
              <span> and </span>
              <span className="text-blue-400"> Privacy Policy</span>
              </h1>
            </div>
          </div>

          <div className="flex flex-col w-full lg:w-1/2 h-full lg:ml-5 mt-5 lg:mt-0">
            <h1 className="text-black font-serif font-bold text-xl text-center">Sign Up</h1>
            <hr className="w-full mt-3"/>
            <h1 className="mt-7 font-bold">Username</h1>
            <input
              placeholder="Your Username"
              className="border border-gray-300 rounded-md h-12 text-sm w-full px-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <h1 className="mt-7 font-bold">Email</h1>
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-md h-12 text-sm w-full px-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h1 className="mt-7 font-bold">Password</h1>
            <input
              type="password"
              placeholder="Your Password"
              className="border border-gray-300 rounded-md h-12 text-sm w-full px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white rounded-md h-12 mt-7 flex items-center justify-center hover:bg-blue-700 transition"
              onClick={handleRegister}
            >
              Sign Up
            </button>
            {error && <p className="text-red-500 mt-3">{error}</p>}

            <p className="mt-3 text-center">
              Already have an account? <Link to="/" className="text-blue-600 font-bold">Login here</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
