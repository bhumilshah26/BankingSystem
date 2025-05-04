import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/users/verify", { userid, password });
      if(response.status === 200) { 
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', userid);
        navigate('/dashboard');
      }
    } catch (e) { alert("Incorrect Details entered!!!") }
  }
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-[#832625] w-full py-4 text-white text-center font-bold text-2xl">
        BSNB Bhumil Shah National Bank
      </div>

      <div className="bg-[#f8f3ed] shadow-md rounded px-8 pt-6 pb-8 my-8 max-w-md w-full">
        <h2 className="text-[#832625] text-xl font-semibold mb-6">Login Using Password</h2>
        
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          type="text"
          placeholder="User ID"
          onChange={(e) => { setUserid(e.target.value); }}
        />

        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6"
          type="password"
          placeholder="Password"
          onChange={(e) => { setPassword(e.target.value); }}
        />

        <button onClick={handleLogin} className="bg-[#832625] hover:bg-[#6b1f1d] text-white font-bold py-2 px-4 rounded w-full">
          Log In
        </button>

        <div className="text-sm text-center text-[#832625] mt-4">
          <a href="/register" className="hover:underline">New User? Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
