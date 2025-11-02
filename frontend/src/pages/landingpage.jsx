import { FaCreditCard, FaHandHoldingUsd, FaChartLine, FaUserCircle, FaBitcoin, FaShieldAlt, FaMobileAlt, FaClock } from 'react-icons/fa';
import Navbar from './components/navbar';
import Carousel from './components/carousel';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { title: 'Cards', icon: <FaCreditCard size={32} />, description: 'Secure debit & credit cards' },
    { title: 'Loans', icon: <FaHandHoldingUsd size={32} />, description: 'Home, car & personal loans' },
    { title: 'Investments', icon: <FaChartLine size={32} />, description: 'Smart investment options' },
    { title: 'Accounts', icon: <FaUserCircle size={32} />, description: 'Savings & current accounts' },
    { title: 'Crypto', icon: <FaBitcoin size={32} />, description: 'Digital currency support' },
  ];

  const benefits = [
    { icon: <FaShieldAlt size={24} />, title: 'Secure Banking', description: '256-bit encryption' },
    { icon: <FaMobileAlt size={24} />, title: 'Mobile First', description: 'Bank on the go' },
    { icon: <FaClock size={24} />, title: '24/7 Support', description: 'Always available' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navigation */}
      <Navbar />
      
      {/* Announcement Banner */}
      <div className="bg-primary text-white py-2 px-4">
        <marquee behavior="scroll" className="font-medium text-sm sm:text-base">
          Working hours of Kandivali and Borivali branches have changed from 09:00 A.M. to 04:30 P.M. • 
          Senior Citizen Interest Rates decreased by 0.5%
        </marquee>
      </div>

      {/* Hero Section with Carousel */}
      <div className="container-responsive pt-6 sm:pt-10 pb-4">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 text-center">
            Welcome to <span className="text-primary">BSNB</span>
          </h1>
          <p className="text-gray-600 text-center text-lg sm:text-xl max-w-2xl mx-auto">
            Your trusted banking partner for secure, convenient, and modern financial services
          </p>
        </div>
        <Carousel />
      </div>

      {/* Feature Cards Section */}
      <div className="container-responsive py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-modern p-6 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <div className="bg-primary text-white p-4 rounded-lg mb-3">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-600 text-center hidden sm:block">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 border-t border-gray-200 py-8 sm:py-12">
        <div className="container-responsive">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="card-modern p-6 text-center">
                <div className="bg-light text-primary inline-flex p-4 rounded-lg mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-12 sm:py-16">
        <div className="container-responsive text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-light text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust BSNB for their banking needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="bg-white text-primary font-semibold py-3 px-8 rounded hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              Open Account
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
