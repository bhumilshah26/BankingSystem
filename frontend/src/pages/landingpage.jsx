import { useState, useEffect, useCallback } from 'react';
import { FaCreditCard, FaHandHoldingUsd, FaChartLine, FaUserCircle, FaBitcoin } from 'react-icons/fa';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, image: img1, title: 'Zero Balance Accounts for Students' },
    { id: 2, image: img2, title: 'Home Loan @ Attractive Rates' },
    { id: 3, image: img3, title: 'Senior Citizen Investment Plan' },
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const features = [
    { title: 'Cards', icon: <FaCreditCard size={30} /> },
    { title: 'Loans', icon: <FaHandHoldingUsd size={30} /> },
    { title: 'Investments', icon: <FaChartLine size={30} /> },
    { title: 'Accounts', icon: <FaUserCircle size={30} /> },
    { title: 'Crypto', icon: <FaBitcoin size={30} /> },
  ];

  const features2 = [
    { title: 'Accounts & Deposits' },
    { title: 'Cards' },
    { title: 'Loans' },
    { title: '%Rates & Offers' },
    { title: 'Investments & Insurance' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center p-6 shadow-md z-10 relative">
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

        <div className="flex gap-4 ml-5">
          <button className="px-4 py-2 border border-[#832625] text-[#832625] rounded hover:bg-[#832625] hover:text-[#e5cbcb] transition">
            Login
          </button>
          <button className="px-4 py-2 bg-[#832625] text-[#e5cbcb] rounded hover:bg-[#6b1f1d] transition">
            Register
          </button>
        </div>
      </nav>

      {/* Carousel Section */}
      <div className="relative w-full h-[500px] overflow-hidden bg-[#e5cbcb]">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-4 bg-[#832625] bg-opacity-80 text-[#e5cbcb] px-3 py-2 rounded-md text-md font-semibold shadow-md">
          {slides[currentSlide].title}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#e5cbcb] text-[#832625] p-2 rounded-full shadow hover:bg-opacity-75 transition"
        >
          ‹
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#e5cbcb] text-[#832625] p-2 rounded-full shadow hover:bg-opacity-75 transition"
        >
          ›
        </button>
      </div>

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
