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
    className="card-modern p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer"
    onClick={() => onClick(title)}
  >
    <div className="bg-primary text-white p-4 rounded-lg mb-3">
      <span className="text-2xl sm:text-3xl">{icon}</span>
    </div>
    <div className="text-sm sm:text-base font-semibold text-center text-gray-800">{title}</div>
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
      
      {/* Announcement Banner */}
      <div className="bg-primary text-white py-2 px-4">
        <marquee behavior="scroll" className="font-medium text-sm sm:text-base">
          Working hours of Kandivali and Borivali branches have changed from 09:00 A.M. to 04:30 P.M. • 
          Senior Citizen Interest Rates decreased by 0.5%
        </marquee>
      </div>

      <div className="px-2 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto w-full">
        {/* Quick Actions Section */}
        <div className="mb-4 sm:mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
            {optionsLevel1.map((opt) => (
              <OptionCard
                key={opt.title}
                {...opt}
                onClick={setActiveModal}
              />
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-4 sm:mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {optionsLevel2.map((opt) => (
              <OptionCard
                key={opt.title}
                {...opt}
                onClick={setActiveModal}
              />
            ))}
          </div>
        </div>

        {/* Promotional Carousel */}
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