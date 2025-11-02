import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../api'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import InlineLoading from './components/InlineLoading';

const Register = () => {
  const [name, setName] = useState('');
  const [userid, setUserid] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if(name === '' || userid === '' || email === '' || password === '') {
      return alert("Insufficient Details");
    }

    if(!(/^[a-z0-9._%+-]+@gmail\.com$/.test(email.toLowerCase()))) {
      return alert("Incorrect Email Format");
    }

    setIsLoading(true);
    try {
      const response = await api.post('/users/create', { name, userid, email, password });
      
      if(response.status === 201) { 
        navigate("/login"); 
      }

    } catch (e) { 
      return alert(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-primary w-full py-4 text-white text-center shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold">BSNB Bhumil Shah National Bank</h1>
      </div>

      {/* Register Card - Centered */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="card-modern px-4 sm:px-8 pt-6 pb-8 my-8 max-w-md w-full">
        <h2 className="text-primary text-lg sm:text-xl font-semibold mb-6">Register New Account</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              className="input-modern"
              type="text"
              placeholder="Full Name"
              onChange={(e) => { setName(e.target.value); }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              className="input-modern"
              type="email"
              placeholder="Email"
              onChange={(e) => { setEmail(e.target.value); }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
            <input
              className="input-modern"
              type="text"
              placeholder="User ID"
              onChange={(e) => { setUserid(e.target.value); }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                className="input-modern pr-12"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => { setPassword(e.target.value); }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-4 w-4" />
                ) : (
                  <FaEye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button 
            disabled={!name || !userid || !email || !password || isLoading}
            onClick={handleRegister} 
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <InlineLoading size="small" />
                <span className="ml-2">Registering...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-primary">
          <a href="/login" className="hover:underline">Already have an account? Login</a>
        </div>
        </div>
      </div>

      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
};

export default Register;
