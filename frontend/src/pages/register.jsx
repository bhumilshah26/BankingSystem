import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLandmark, FaUser, FaEnvelope, FaIdBadge, FaLock } from 'react-icons/fa';
import api from '../api'
import { useNavigate, Link } from 'react-router-dom';
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
    if (name === '' || userid === '' || email === '' || password === '') {
      return alert("Insufficient Details");
    }

    if (!(/^[a-z0-9._%+-]+@gmail\.com$/.test(email.toLowerCase()))) {
      return alert("Incorrect Email Format");
    }

    setIsLoading(true);
    try {
      const response = await api.post('/users/create', { name, userid, email, password });
      console.log("Response", response);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (e) {
      return alert(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const field = "input-modern pl-10";

  return (
    <div className="min-h-screen bg-brand-gradient flex flex-col items-center justify-center px-4 py-10">
      <Link to="/" className="flex items-center gap-2.5 mb-6 text-white">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/20">
          <FaLandmark />
        </span>
        <span className="font-display font-bold text-xl">BSNB</span>
      </Link>

      <div className="card-modern w-full max-w-md p-6 sm:p-8 animate-fade-up">
        <h2 className="font-display text-2xl font-bold text-ink">Create your account</h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">Open a BSNB account in a minute</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input className={field} type="text" placeholder="Full name" onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input className={field} type="email" placeholder="you@gmail.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">User ID</label>
            <div className="relative">
              <FaIdBadge className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input className={field} type="text" placeholder="Choose a user ID" onChange={(e) => setUserid(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                className="input-modern pl-10 pr-12"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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
          </div>

          <button
            disabled={!name || !userid || !email || !password || isLoading}
            onClick={handleRegister}
            className="btn-primary w-full"
          >
            {isLoading ? (<><InlineLoading size="small" color="#ffffff" /><span>Creating account...</span></>) : "Create account"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </div>

      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
};

export default Register;
