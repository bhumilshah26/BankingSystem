import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../api';
import LoadingSpinner from './components/LoadingSpinner';
import InlineLoading from './components/InlineLoading';

const Login = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(userid === '' || password === '')
        return alert("Enter all the details")
    
    setIsLoading(true);
    try {
      const response = await api.post("/users/verify", { userid, password });

      if(response.status === 200) { 
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', userid);
        localStorage.setItem('name', response.data.user_details.name);
        localStorage.setItem('email', response.data.user_details.email);
        navigate('/dashboard');
      }

    } catch (e) { 
      return alert(e.response.data.message); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter')
      handleLogin();
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-[#832625] w-full py-4 text-white text-center font-bold text-xl sm:text-2xl">
        BSNB Bhumil Shah National Bank
      </div>

      <div className="bg-[#f8f3ed] shadow-md rounded px-4 sm:px-8 pt-6 pb-8 my-8 max-w-md w-full">
        <h2 className="text-[#832625] text-lg sm:text-xl font-semibold mb-6">Login Using Password</h2>
        
        <input onKeyDown={handleKeyDown}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 text-sm sm:text-base"
          type="text"
          placeholder="User ID"
          onChange={(e) => { setUserid(e.target.value); }}
        />

        <div className="relative mb-6">
          <input onKeyDown={handleKeyDown}
            className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 text-sm sm:text-base"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => { setPassword(e.target.value); }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            ) : (
              <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>

        <button 
          onClick={handleLogin} 
          disabled={isLoading}
          className="bg-[#832625] hover:bg-[#6b1f1d] text-white font-bold py-2 px-4 rounded w-full text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <InlineLoading size="small" />
              <span className="ml-2">Logging in...</span>
            </>
          ) : (
            "Log In"
          )}
        </button>

        <div className="text-xs sm:text-sm text-center text-[#832625] mt-4 space-y-2">
          <div>
            <a href="/register" className="hover:underline">New User? Register here</a>
          </div>
          <div>
            <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
          </div>
        </div>
      </div>
      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
};

export default Login;
