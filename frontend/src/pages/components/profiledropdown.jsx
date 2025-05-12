import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaUserCircle } from 'react-icons/fa';
import api from '../../api'

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email'); 
    const user_id = localStorage.getItem('user_id');
    setUserDetails({ name, email, user_id });
  }, []);

  const handleLogout = () => {
    confirmAlert({
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            localStorage.clear();
            navigate('/');
          }
        },
        {
          label: 'No'
        }
      ]
    });
  };

 const handleDeleteAccount = () => {
  let accountNumber = '';
  let password = '';

  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="bg-white p-6 rounded shadow-lg w-80 border border-[#832625]">
          <h1 className="text-lg font-bold text-[#832625] mb-4">Delete Account</h1>
          <p className="text-sm mb-3">Enter your Account Number and Password to confirm:</p>

          <input
            type="number"
            placeholder="Account Number"
            onChange={(e) => accountNumber = e.target.value}
            className="w-full border border-gray-300 rounded px-2 py-1 mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => password = e.target.value}
            className="w-full border border-gray-300 rounded px-2 py-1 mb-4"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                if (!accountNumber || !password) {
                  return alert("Both fields are required!");
                }
                if(!/^15\d{10}$/.test(accountNumber))
                    return alert("Invalid Account Number Format!");
                try {
                  const response = await api.post('/accounts/delete', {
                    accountNumber,
                    password,
                    user_id: userDetails.user_id
                  });
                  if (response.status === 200) {
                    alert(response.data.message);
                    navigate('/dashboard');
                  }
                } catch (err) {
                    console.log(err)
                  alert(err.response.data.message);
                }
              }}
              className="px-3 py-1 bg-[#832625] text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
  });
};


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) { 
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative ml-5" ref={dropdownRef}>
      <FaUserCircle 
        size={32} 
        className="text-[#832625] cursor-pointer hover:text-[#6b1f1d] transition" 
        onClick={() => setIsOpen(!isOpen)} 
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-[#832625] rounded shadow-lg z-50 p-4 text-sm">
          <h3 className="text-[#832625] font-bold mb-2 text-lg">User Details</h3>
          <p><strong className='text-base'>Name:</strong> {userDetails.name}</p>
          <p><strong className='text-base'>Email:</strong> {userDetails.email}</p>
          <p><strong className='text-base'>ID:</strong> {userDetails.user_id}</p>
          <div className="mt-4 flex flex-col gap-2">
            <button 
              onClick={handleDeleteAccount} 
              className="px-3 py-1 bg-[#832625] text-white rounded hover:bg-red-700 transition"
            >
              Delete Account
            </button>
            <button 
              onClick={handleLogout} 
              className="px-3 py-1 bg-[#832625] text-[#e5cbcb] rounded hover:bg-[#6b1f1d] transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
