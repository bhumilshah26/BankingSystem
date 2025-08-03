import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Modals from "./components/modals";
import Carousel from "./components/carousel"
import Onboarding from "./components/Onboarding";
// import Marquee from "./components/marquee";

const optionsLevel1 = [
  { title: "Create Account", icon: "📝" },
  { title: "Bank Statements", icon: "📄" },
  { title: "Deposit/Withdrawal", icon: "💸" },
  { title: "Funds Transfer", icon: "💳" },
];

const optionsLevel2 = [
  { title: "Cards", icon: "💳" },
  { title: "Loans", icon: "📊" },
  { title: "Investments", icon: "📈" },
  { title: "Crypto", icon: "🪙" },
];

const OptionCard = ({ title, icon, onClick }) => (
  <div
    className="bg-[#e5cbcb] hover:bg-[#832625] hover:text-white transition-all duration-300 shadow-lg rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer min-w-[100px] sm:min-w-[140px] w-full"
    onClick={() => onClick(title)}
  >
    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{icon}</div>
    <div className="text-sm sm:text-md font-semibold text-center">{title}</div>
  </div>
);

const Dashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleShowHelp = () => {
    setShowOnboarding(true);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar onShowHelp={handleShowHelp} />
      <marquee behavior="" className="bg-[#832625] text-white h-10 flex items-center font-semibold text-xs sm:text-base">Working hours of Kandivali and Borivali branches have changed from 09:00 A.M. to 04:30 P.M. 
          Senior Citizen Interest Rates decreased by 0.5%</marquee>

      <div className="px-2 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto w-full">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
          {optionsLevel1.map((opt) => (
            <OptionCard
              key={opt.title}
              {...opt}
              onClick={setActiveModal}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {optionsLevel2.map((opt) => (
            <OptionCard
              key={opt.title}
              {...opt}
              onClick={setActiveModal}
            />
          ))}
        </div>
        <div className="my-4 sm:my-8">
          <Carousel />
        </div>
      </div>

      {activeModal && (
        <Modals type={activeModal} onClose={() => setActiveModal(null)} />
      )}

      <Onboarding 
        isOpen={showOnboarding} 
        onComplete={handleOnboardingComplete}
      />

    </div>
  );
};

export default Dashboard;