import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from './profiledropdown';
import { FaBell } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { FaQuestionCircle } from 'react-icons/fa';

const Navbar = ({ onShowHelp }) => {
  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const features2 = [
      { title: 'Accounts & Deposits' },
      { title: 'Cards' },
      { title: 'Loans' },
      { title: '%Rates & Offers' },
      { title: 'Investments & Insurance' },
  ];
  const navigate = useNavigate();
  
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])


  return (
    <div>
      <nav className="flex justify-between items-center p-3 sm:p-4 shadow-md z-10 relative bg-white w-full">
        <div className="text-lg sm:text-2xl font-bold text-primary text-responsive">
          BSNB Bhumil Shah National Bank
        </div>

        {/* Hamburger for mobile */}
        <div className="sm:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-primary focus:outline-none">
            <FaBars size={24} />
          </button>
        </div>

        {/* Nav links for desktop */}
        <div className="hidden sm:flex gap-6 ml-4">
          {features2.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-primary font-medium cursor-pointer hover:text-dark transition text-sm sm:text-base"
            >
              <span>{feature.title}</span>
              <span className="text-xs sm:text-sm">▼</span>
            </div>
          ))}
        </div>

        {/* Auth/Profile for desktop */}
        {!token && (
          <div className="hidden sm:flex gap-4 ml-5">
            <button 
              onClick={() => {navigate('/login')}} 
              className="px-3 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-light transition text-sm sm:text-base"
            >
              Login
            </button>
            <button 
              onClick={() => {navigate('/register')}} 
              className="px-3 py-2 bg-primary text-light rounded hover:bg-dark transition text-sm sm:text-base"
            >
              Register
            </button>
          </div>
        )}
        
        {token && (
          <div className="hidden sm:flex items-center space-x-4">
            <FaBell
              size={22}
              className="text-primary cursor-pointer hover:text-dark transition"
              onClick={() => alert('No new notifications!')}
            />
            <FaQuestionCircle
              size={22}
              className="text-primary cursor-pointer hover:text-dark transition"
              onClick={onShowHelp}
              title="Help & Tutorial"
            />
            <ProfileDropdown />
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start p-4 gap-3 sm:hidden z-20 border-b border-gray-200">
            {features2.map((feature, index) => (
              <div
                key={index}
                className="text-primary font-medium cursor-pointer hover:text-dark transition text-base py-1"
              >
                {feature.title}
              </div>
            ))}
            
            {!token && (
              <div className="flex flex-col gap-2 w-full mt-2">
                <button 
                  onClick={() => {navigate('/login'); setMenuOpen(false);}} 
                  className="px-3 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-light transition w-full text-base"
                >
                  Login
                </button>
                <button 
                  onClick={() => {navigate('/register'); setMenuOpen(false);}} 
                  className="px-3 py-2 bg-primary text-light rounded hover:bg-dark transition w-full text-base"
                >
                  Register
                </button>
              </div>
            )}
            
            {token && (
              <div className="flex items-center space-x-4 mt-2">
                <FaBell
                  size={22}
                  className="text-primary cursor-pointer hover:text-dark transition"
                  onClick={() => alert('No new notifications!')}
                />
                <FaQuestionCircle
                  size={22}
                  className="text-primary cursor-pointer hover:text-dark transition"
                  onClick={onShowHelp}
                  title="Help & Tutorial"
                />
                <ProfileDropdown />
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
