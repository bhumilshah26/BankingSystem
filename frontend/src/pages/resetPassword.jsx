import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';
import api from '../api';
import LoadingSpinner from './components/LoadingSpinner';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setMessage('Invalid reset link. Please request a new password reset.');
        setIsValidating(false);
        return;
      }

      try {
        await api.get(`/users/verify-reset-token/${token}`);
        setIsTokenValid(true);
        setMessage('');
      } catch (error) {
        setMessage('This reset link is invalid or has expired. Please request a new password reset.');
        setIsTokenValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await api.post('/users/reset-password', {
        token,
        newPassword
      });
      
      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#832625] to-[#6b1f1d] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h1 className="text-xl font-bold text-[#832625] mb-2">Validating Reset Link</h1>
          <p className="text-gray-600">Please wait while we verify your reset link...</p>
        </div>
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#832625] to-[#6b1f1d] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-xl font-bold text-[#832625] mb-2">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={() => navigate('/forgot-password')}
            className="bg-[#832625] text-white px-6 py-2 rounded hover:bg-[#6b1f1d] transition-colors"
          >
            Request New Reset Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#832625] to-[#6b1f1d] flex items-center justify-center p-4">
      <LoadingSpinner isLoading={isLoading} />
      
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-[#832625] mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your new password</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#832625] focus:border-[#832625]"
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#832625] focus:border-[#832625]"
                placeholder="Confirm new password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {newPassword && confirmPassword && (
            <div className={`p-3 rounded-lg ${
              newPassword === confirmPassword && newPassword.length >= 6
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
            }`}>
              {newPassword === confirmPassword && newPassword.length >= 6 ? (
                <div className="flex items-center">
                  <FaCheck className="mr-2" />
                  Passwords match and meet requirements
                </div>
              ) : (
                <div>
                  {newPassword !== confirmPassword && 'Passwords do not match. '}
                  {newPassword.length < 6 && 'Password must be at least 6 characters long.'}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || newPassword !== confirmPassword || newPassword.length < 6}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#832625] hover:bg-[#6b1f1d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#832625] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 