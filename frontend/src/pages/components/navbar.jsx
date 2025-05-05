import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Navbar = () => {
  const [token, setToken] = useState(null);
  const features2 = [
      { title: 'Accounts & Deposits' },
      { title: 'Cards' },
      { title: 'Loans' },
      { title: '%Rates & Offers' },
      { title: 'Investments & Insurance' },
  ];
  const navigate = useNavigate();
  
  const showAlert = () => {
    confirmAlert({
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed to logout?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            navigate('/');
          }
        },
        {
          label: 'No',
          onClick: () => {  }
        }
      ]
    });
  };
  
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])


  return (
    <div>
      <nav className="flex justify-between items-center p-4 shadow-md z-10 relative">
        <div className="text-2xl font-bold text-[#832625]">
          BSNB Bhumil Shah National Bank
        </div>

        <div className="flex gap-10 ml-8">
          {features2.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-[#832625] font-medium cursor-pointer hover:text-[#6b1f1d] transition"
            >
              <span>{feature.title}</span>
              <span className="text-sm">▼</span>
            </div>
          ))}
        </div>
        {!token && <div className="flex gap-4 ml-5">
            <button onClick={() => {navigate('/login')}} className="px-4 py-2 border border-[#832625] text-[#832625] rounded hover:bg-[#832625] hover:text-[#e5cbcb] transition">
              Login
            </button>
            <button onClick={() => {navigate('/register')}} className="px-4 py-2 bg-[#832625] text-[#e5cbcb] rounded hover:bg-[#6b1f1d] transition">
              Register
            </button>
          </div>
        }
        {token && <div className="flex gap-4 ml-5">
            <button onClick={() => {}} className="px-4 py-2 border border-[#832625] text-[#832625] rounded hover:bg-[#832625] hover:text-[#e5cbcb] transition">
              Profile
            </button>
            <button onClick={showAlert} className="px-4 py-2 bg-[#832625] text-[#e5cbcb] rounded hover:bg-[#6b1f1d] transition">
              Logout
            </button>
          </div>
        }
      </nav>
    </div>
  )
}

export default Navbar
