import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import LoadingSpinner from './LoadingSpinner';
import InlineLoading from './InlineLoading';

const ChangePasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long.');
      return;
    }

    if (currentPassword === newPassword) {
      setMessage('New password must be different from current password.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const user_id = localStorage.getItem('user_id');
      const response = await api.post('/users/change-password', {
        user_id,
        currentPassword,
        newPassword
      });
      
      setMessage('Password changed successfully!');
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <LoadingSpinner isLoading={isLoading} />
      
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#832625]">Change Password</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
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

        <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Current Password
             </label>
             <div className="relative">
               <input
                 type={showCurrentPassword ? "text" : "password"}
                 value={currentPassword}
                 onChange={(e) => setCurrentPassword(e.target.value)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-1 focus:ring-[#832625] focus:border-[#832625]"
                 placeholder="Enter current password"
                 required
               />
               <button
                 type="button"
                 onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
               >
                 {showCurrentPassword ? (
                   <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                 ) : (
                   <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                 )}
               </button>
             </div>
             <div className="mt-1 text-right">
               <button
                 type="button"
                 onClick={() => {
                   onClose();
                   navigate('/forgot-password');
                 }}
                 className="text-xs text-[#832625] hover:text-[#6b1f1d] hover:underline"
               >
                 Forgot current password?
               </button>
             </div>
           </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-1 focus:ring-[#832625] focus:border-[#832625]"
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showNewPassword ? (
                  <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-1 focus:ring-[#832625] focus:border-[#832625]"
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
                  <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {newPassword && confirmPassword && (
            <div className={`p-3 rounded-lg ${
              newPassword === confirmPassword && newPassword.length >= 6 && newPassword !== currentPassword
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
            }`}>
              {newPassword === confirmPassword && newPassword.length >= 6 && newPassword !== currentPassword ? (
                <div className="text-sm">✅ Passwords match and meet requirements</div>
              ) : (
                <div className="text-sm">
                  {newPassword !== confirmPassword && 'Passwords do not match. '}
                  {newPassword.length < 6 && 'Password must be at least 6 characters. '}
                  {newPassword === currentPassword && 'New password must be different from current password.'}
                </div>
              )}
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 6 || newPassword === currentPassword}
              className="flex-1 px-4 py-2 bg-[#832625] text-white rounded-md hover:bg-[#6b1f1d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <InlineLoading size="small" />
                  <span className="ml-2">Changing...</span>
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal; 