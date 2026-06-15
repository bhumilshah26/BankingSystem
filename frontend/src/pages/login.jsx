import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLandmark, FaUser, FaLock } from 'react-icons/fa';
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
    if (userid === '' || password === '')
      return alert("Enter all the details")

    setIsLoading(true);
    try {
      const response = await api.post("/users/verify", { userid, password });

      if (response.status === 200) {
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
    if (event.key === 'Enter') handleLogin();
  }

  return (
    <div className="min-h-screen bg-brand-gradient flex flex-col items-center justify-center px-4 py-10">
      <Link to="/" className="flex items-center gap-2.5 mb-6 text-white">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/20">
          <FaLandmark />
        </span>
        <span className="font-display font-bold text-xl">BSNB</span>
      </Link>

      <div className="card-modern w-full max-w-md p-6 sm:p-8 animate-fade-up">
        <h2 className="font-display text-2xl font-bold text-ink">Welcome back</h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">Sign in to your BSNB account</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">User ID</label>
            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                onKeyDown={handleKeyDown}
                className="input-modern pl-10"
                type="text"
                placeholder="User ID (test: _bhumilshah)"
                onChange={(e) => setUserid(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                onKeyDown={handleKeyDown}
                className="input-modern pl-10 pr-12"
                type={showPassword ? "text" : "password"}
                placeholder="Password (test: pass@123)"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
              </button>
            </div>
            <div className="text-right mt-1.5">
              <Link to="/forgot-password" className="text-xs text-primary hover:text-dark hover:underline">Forgot password?</Link>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? (<><InlineLoading size="small" color="#ffffff" /><span>Signing in...</span></>) : "Sign in"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          New to BSNB? <Link to="/register" className="text-primary font-semibold hover:underline">Create an account</Link>
        </p>
      </div>

      <div className="mt-5 w-full max-w-md rounded-xl border border-accent/40 bg-accent-50 px-4 py-3 text-center text-sm text-amber-900">
        <span className="font-semibold">Heads up:</span> requests may take a moment to process. Please wait while we complete your request.
      </div>

      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
};

export default Login;
