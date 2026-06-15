import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Modals from "./components/modals";
import Carousel from "./components/carousel";
import Onboarding from "./components/Onboarding";
import BalanceCard from "./components/BalanceCard";
import {
  FaUniversity,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaRegCreditCard,
  FaHandHoldingUsd,
  FaChartLine,
  FaBitcoin,
  FaArrowRight,
} from "react-icons/fa";

// Each action carries its own glyph + color so the grid reads as a real
// banking control panel, not a row of identical tiles.
const quickActions = [
  { title: "Create Account", desc: "Open savings or current", icon: FaUniversity,        tint: "bg-primary-50 text-primary" },
  { title: "Bank Statements", desc: "Transactions & transfers", icon: FaFileInvoiceDollar, tint: "bg-sky-50 text-sky-700" },
  { title: "Deposit/Withdrawal", desc: "Move cash in or out", icon: FaMoneyBillWave,       tint: "bg-emerald-50 text-emerald-700" },
  { title: "Funds Transfer", desc: "Send to any account", icon: FaExchangeAlt,             tint: "bg-amber-50 text-amber-700" },
];

const services = [
  { title: "Cards", desc: "Debit & credit", icon: FaRegCreditCard,   tint: "bg-violet-50 text-violet-700" },
  { title: "Loans", desc: "EMI calculator", icon: FaHandHoldingUsd,  tint: "bg-rose-50 text-rose-700" },
  { title: "Investments", desc: "Grow your money", icon: FaChartLine, tint: "bg-teal-50 text-teal-700" },
  { title: "Crypto", desc: "Digital assets", icon: FaBitcoin,         tint: "bg-yellow-50 text-yellow-700" },
];

const OptionCard = ({ title, desc, icon: Icon, tint, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(title)}
    className="group card-modern p-4 sm:p-5 flex flex-col items-start text-left gap-3 cursor-pointer hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/40"
  >
    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${tint} transition-transform duration-300 group-hover:scale-110`}>
      <Icon className="text-xl" />
    </span>
    <div className="min-w-0">
      <div className="font-semibold text-ink text-sm sm:text-base">{title}</div>
      <div className="text-xs text-gray-500 mt-0.5 hidden sm:block">{desc}</div>
    </div>
    <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
      Open <FaArrowRight className="text-[10px]" />
    </span>
  </button>
);

const Dashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const userName = typeof window !== "undefined" ? localStorage.getItem("name") : null;

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) setShowOnboarding(true);
  }, []);

  const handleOnboardingComplete = () => setShowOnboarding(false);
  const handleShowHelp = () => setShowOnboarding(true);

  return (
    <div className="bg-surface min-h-screen">
      <Navbar onShowHelp={handleShowHelp} />

      {/* Announcement Banner */}
      <div className="bg-primary text-light py-2 px-4">
        {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
        <marquee behavior="scroll" className="font-medium text-sm sm:text-base">
          Working hours of Kandivali and Borivali branches have changed from 09:00 A.M. to 04:30 P.M. •
          Senior Citizen Interest Rates decreased by 0.5%
        </marquee>
      </div>

      {/* Welcome header */}
      <div className="bg-brand-gradient text-white">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-7 sm:py-10">
          <p className="section-eyebrow !text-accent-light">Your dashboard</p>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-balance">
            {userName ? `Welcome back, ${userName.split(" ")[0]}` : "Welcome back"}
          </h1>
          <p className="text-primary-100 mt-2 max-w-xl">
            Manage accounts, move money, and explore services, all from one place.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8 max-w-7xl mx-auto w-full -mt-6 sm:-mt-8 relative">
        {/* Balance overview */}
        <section className="mb-8 sm:mb-10">
          <BalanceCard />
        </section>

        {/* Quick Actions */}
        <section className="mb-8 sm:mb-10">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-display text-lg sm:text-xl font-bold text-ink">Quick actions</h2>
            <span className="text-xs text-gray-500 hidden sm:block">Everyday banking</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {quickActions.map((opt) => (
              <OptionCard key={opt.title} {...opt} onClick={setActiveModal} />
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mb-8 sm:mb-10">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-display text-lg sm:text-xl font-bold text-ink">Explore services</h2>
            <span className="text-xs text-gray-500 hidden sm:block">Plan & grow</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {services.map((opt) => (
              <OptionCard key={opt.title} {...opt} onClick={setActiveModal} />
            ))}
          </div>
        </section>

        {/* Promotional Carousel */}
        <section className="my-6 sm:my-8">
          <Carousel />
        </section>
      </div>

      {activeModal && <Modals type={activeModal} onClose={() => setActiveModal(null)} />}

      <Onboarding isOpen={showOnboarding} onComplete={handleOnboardingComplete} />
    </div>
  );
};

export default Dashboard;
