import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from './profiledropdown';
import { FaBell, FaBars, FaTimes, FaQuestionCircle, FaLandmark, FaChevronDown } from 'react-icons/fa';

// Each top-level item opens a menu of links.
const navItems = [
  { title: 'Accounts & Deposits', links: ['Savings Account', 'Current Account', 'Fixed Deposit', 'Recurring Deposit', 'Salary Account'] },
  { title: 'Cards', links: ['Debit Cards', 'Credit Cards', 'Card Offers', 'Block a Card', 'Rewards'] },
  { title: 'Loans', links: ['Home Loan', 'Car Loan', 'Personal Loan', 'Education Loan', 'Gold Loan'] },
  { title: 'Rates & Offers', links: ['Interest Rates', 'Festive Offers', 'Cashback Deals', 'Fee Schedule'] },
  { title: 'Investments', links: ['Mutual Funds', 'Stocks & ETFs', 'Bonds', 'Insurance', 'Tax Saver'] },
];

const Navbar = ({ onShowHelp }) => {
  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileIdx, setOpenMobileIdx] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  const Brand = () => (
    <button
      onClick={() => navigate(token ? '/dashboard' : '/')}
      className="flex items-center gap-2.5 group focus:outline-none shrink-0"
    >
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-light shadow-sm group-hover:bg-dark transition-colors">
        <FaLandmark className="text-base" />
      </span>
      <span className="leading-tight text-left">
        <span className="block font-display font-bold text-primary text-base sm:text-lg">BSNB</span>
        <span className="block text-[10px] sm:text-xs text-gray-500 -mt-0.5">Bhumil Shah National Bank</span>
      </span>
    </button>
  );

  return (
    <nav className="sticky top-0 z-sticky bg-white/90 backdrop-blur border-b border-primary-100">
      <div className="flex justify-between items-center gap-4 px-3 sm:px-6 py-2.5 max-w-7xl mx-auto w-full">
        <Brand />

        {/* Desktop nav with dropdowns */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <button
                className="relative flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink/80 group-hover:text-primary transition-colors
                  after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent
                  after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
              >
                {item.title}
                <FaChevronDown className="text-[9px] opacity-60 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown panel (appears on hover/focus) */}
              <div
                className="absolute left-0 top-full pt-2 w-60 opacity-0 invisible translate-y-1
                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  focus-within:opacity-100 focus-within:visible focus-within:translate-y-0
                  transition-all duration-200 z-dropdown"
              >
                <div className="bg-white border border-primary-100 rounded-2xl shadow-card-hover p-2 overflow-hidden">
                  <p className="px-3 pt-1.5 pb-2 text-[11px] font-semibold uppercase tracking-wide text-primary/70">{item.title}</p>
                  {item.links.map((link) => (
                    <button
                      key={link}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-ink/80 hover:bg-primary-50 hover:text-primary transition-colors"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!token && (
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm font-semibold border border-primary/40 text-primary rounded-xl hover:bg-primary-50 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-xl hover:bg-dark transition-colors shadow-sm"
              >
                Register
              </button>
            </div>
          )}

          {token && (
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => alert('No new notifications!')}
                className="text-primary hover:text-dark transition relative"
                aria-label="Notifications"
              >
                <FaBell size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent ring-2 ring-white" />
              </button>
              <button
                onClick={onShowHelp}
                className="text-primary hover:text-dark transition"
                title="Help & Tutorial"
                aria-label="Help"
              >
                <FaQuestionCircle size={20} />
              </button>
              <ProfileDropdown />
            </div>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-primary hover:bg-primary-50 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-primary-100 bg-white animate-fade-in max-h-[70vh] overflow-y-auto">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((item, index) => {
              const expanded = openMobileIdx === index;
              return (
                <div key={index} className="border-b border-primary-100/60 last:border-0">
                  <button
                    onClick={() => setOpenMobileIdx(expanded ? null : index)}
                    className="w-full flex items-center justify-between px-3 py-3 text-ink/80 font-medium hover:text-primary transition-colors"
                  >
                    {item.title}
                    <FaChevronDown className={`text-xs opacity-60 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                  </button>
                  {expanded && (
                    <div className="pb-2 pl-3 flex flex-col">
                      {item.links.map((link) => (
                        <button
                          key={link}
                          className="text-left px-3 py-2 rounded-lg text-sm text-ink/70 hover:bg-primary-50 hover:text-primary transition-colors"
                        >
                          {link}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {!token && (
              <div className="flex flex-col gap-2 mt-3">
                <button
                  onClick={() => { navigate('/login'); setMenuOpen(false); }}
                  className="px-3 py-2.5 border border-primary/40 text-primary rounded-xl font-semibold hover:bg-primary-50 transition w-full"
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate('/register'); setMenuOpen(false); }}
                  className="px-3 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-dark transition w-full"
                >
                  Register
                </button>
              </div>
            )}

            {token && (
              <div className="flex items-center gap-4 mt-3 px-3 py-2">
                <button onClick={() => alert('No new notifications!')} className="text-primary hover:text-dark transition" aria-label="Notifications">
                  <FaBell size={20} />
                </button>
                <button onClick={onShowHelp} className="text-primary hover:text-dark transition" title="Help & Tutorial" aria-label="Help">
                  <FaQuestionCircle size={20} />
                </button>
                <ProfileDropdown />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
