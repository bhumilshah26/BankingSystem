import React, { useState } from 'react';
import api from '../api'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [userid, setUserid] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if(name === '' || userid === '' || email === '' || password === '') {
      return alert("Insufficient Details");
    }

    if(!(/^[a-z0-9._%+-]+@gmail\.com$/.test(email.toLowerCase()))) {
      return alert("Incorrect Email Format");
    }

    try {
      const response = await api.post('/users/create', { name, userid, email, password });
      
      if(response.status === 201) { 
        navigate("/login"); 
      }

    } catch (e) { 
      return alert(e.response.data.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-[#832625] w-full py-4 text-white text-center font-bold text-2xl">
        BSNB Bhumil Shah National Bank
      </div>

      <div className="bg-[#f8f3ed] shadow-md rounded px-8 pt-6 pb-8 my-8 max-w-md w-full">
        <h2 className="text-[#832625] text-xl font-semibold mb-6">Register New Account</h2>

        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          type="text"
          placeholder="Full Name"
          onChange={(e) => { setName(e.target.value); }}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          type="email"
          placeholder="Email"
          onChange={(e) => { setEmail(e.target.value); }}
        />
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

        <button disabled={!name || !userid || !email || !password}
        onClick={handleRegister} className="bg-[#832625] hover:bg-[#6b1f1d] text-white font-bold py-2 px-4 rounded w-full">
          Register
        </button>

        <div className="text-sm text-center text-[#832625] mt-4">
          <a href="/login" className="hover:underline">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
