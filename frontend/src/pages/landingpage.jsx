import { FaCreditCard, FaHandHoldingUsd, FaChartLine, FaUserCircle, FaBitcoin } from 'react-icons/fa';
import Navbar from './components/navbar';
import Carousel from './components/carousel';

const LandingPage = () => {

  const features = [
    { title: 'Cards', icon: <FaCreditCard size={30} /> },
    { title: 'Loans', icon: <FaHandHoldingUsd size={30} /> },
    { title: 'Investments', icon: <FaChartLine size={30} /> },
    { title: 'Accounts', icon: <FaUserCircle size={30} /> },
    { title: 'Crypto', icon: <FaBitcoin size={30} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Navbar />
      {/* <Marquee/> */}
      <marquee behavior="" className="bg-[#832625] text-white h-10 flex items-center font-semibold text-xs sm:text-base">Working hours of Kandivali and Borivali branches have changed from 09:00 A.M. to 04:30 P.M. 
          Senior Citizen Interest Rates decreased by 0.5%</marquee>
      {/* Carousel Section */}
      <div className="px-2 sm:px-8 pt-4 sm:pt-8">
        <Carousel />
      </div>

      {/* Feature Icons Section */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 items-center py-6 sm:py-10 px-2 sm:px-0">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-[#832625] text-[#e5cbcb] w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-md hover:scale-105 transition"
          >
            {feature.icon}
            <span className="mt-2 text-xs sm:text-sm font-semibold text-center">{feature.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
