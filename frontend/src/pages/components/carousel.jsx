import React, { useState, useEffect, useCallback } from 'react'
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';

const Carousel = () => {

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

  return (
    <div>
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
    </div>
  )
}

export default Carousel
