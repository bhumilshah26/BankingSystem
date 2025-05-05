import { FaCreditCard, FaHandHoldingUsd, FaChartLine, FaUserCircle, FaBitcoin } from 'react-icons/fa';
import Navbar from './components/navbar';
import Carousel from './components/carousel';
import Marquee from './components/marquee';

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
      <Navbar/>
      {/* <Marquee/> */}
      <marquee behavior="" className="bg-[#832625] text-white h-10 flex items-center font-semibold">Working hours of Kandivali and Borivali branches have changed from 09:00 A.M. to 04:30 P.M. 
          Senior Citizen Interest Rates decreased by 0.5%</marquee>
      {/* Carousel Section */}
      <Carousel/>

      {/* Feature Icons Section */}
      <div className="flex justify-evenly items-center py-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-[#832625] text-[#e5cbcb] w-24 h-24 rounded-2xl shadow-md hover:scale-105 transition"
          >
            {feature.icon}
            <span className="mt-2 text-sm font-semibold">{feature.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
