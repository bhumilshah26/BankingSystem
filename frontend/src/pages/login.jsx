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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-primary w-full py-4 text-white text-center shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold">BSNB Bhumil Shah National Bank</h1>
      </div>

      {/* Login Card - Centered */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="card-modern px-4 sm:px-8 pt-6 pb-8 my-8 max-w-md w-full">
        <h2 className="text-primary text-lg sm:text-xl font-semibold mb-6">Login Using Password</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
            <input 
              onKeyDown={handleKeyDown}
              className="input-modern"
              type="text"
              placeholder="User ID (test :bhumilshah)"
              onChange={(e) => { setUserid(e.target.value); }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input 
                onKeyDown={handleKeyDown}
                className="input-modern pr-12"
                type={showPassword ? "text" : "password"}
                placeholder="Password (test :pass@123)"
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
            onClick={handleLogin} 
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
        </div>

        <div className="mt-4 space-y-2 text-center text-sm">
          <div>
            <a href="/register" className="text-primary hover:underline">New User? Register here</a>
          </div>
          <div>
            <a href="/forgot-password" className="text-primary hover:underline">Forgot Password?</a>
          </div>
        </div>
        </div>
      </div>
      {/* Important Note */}
      <div className="mt-6 flex justify-center">
        <div className="max-w-md rounded-md border border-yellow-400 bg-yellow-50 px-4 py-3 text-center text-sm text-yellow-800">
          <span className="font-semibold">Important:</span> Requests may take some time to process.
          Please wait while the system completes your request.
        </div>
      </div>
      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
};

export default Login;

