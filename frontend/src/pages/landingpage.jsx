import {
  FaRegCreditCard, FaHandHoldingUsd, FaChartLine, FaPiggyBank, FaBitcoin,
  FaShieldAlt, FaMobileAlt, FaHeadset, FaArrowRight, FaCheckCircle,
} from 'react-icons/fa';
import Navbar from './components/navbar';
import Carousel from './components/carousel';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { title: 'Cards',       icon: FaRegCreditCard,  description: 'Debit & credit cards', tint: 'bg-violet-50 text-violet-700' },
    { title: 'Loans',       icon: FaHandHoldingUsd, description: 'Home, car & personal', tint: 'bg-rose-50 text-rose-700' },
    { title: 'Investments', icon: FaChartLine,      description: 'Smart growth options', tint: 'bg-emerald-50 text-emerald-700' },
    { title: 'Accounts',    icon: FaPiggyBank,      description: 'Savings & current',    tint: 'bg-sky-50 text-sky-700' },
    { title: 'Crypto',      icon: FaBitcoin,        description: 'Digital currencies',   tint: 'bg-amber-50 text-amber-700' },
  ];

  const benefits = [
    { icon: FaShieldAlt, title: 'Secure Banking', description: '256-bit encryption protects every session.' },
    { icon: FaMobileAlt, title: 'Mobile First',   description: 'Full-featured banking on any device.' },
    { icon: FaHeadset,   title: '24/7 Support',   description: 'Real people, available around the clock.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      {/* Announcement Banner */}
      <div className="bg-primary text-light py-2 px-4">
        {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
        <marquee behavior="scroll" className="font-medium text-sm sm:text-base">
          Working hours of Kandivali and Borivali branches have changed from 09:00 A.M. to 04:30 P.M. •
          Senior Citizen Interest Rates decreased by 0.5%
        </marquee>
      </div>

      {/* Hero */}
      <section className="bg-brand-gradient text-white">
        <div className="container-responsive py-12 sm:py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <p className="section-eyebrow !text-accent-light">Bhumil Shah National Bank</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-3 leading-[1.05] text-balance">
              Banking that works <span className="text-accent-light">as hard as you do</span>
            </h1>
            <p className="text-primary-100 text-lg mt-5 max-w-xl text-pretty">
              Open an account in minutes, move money instantly, and track every rupee with secure, modern tools built for everyday life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button onClick={() => navigate('/register')} className="btn-accent text-base">
                Open an account <FaArrowRight className="text-sm" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/40 text-white hover:bg-white hover:text-primary transition-colors"
              >
                Sign in
              </button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-primary-100">
              {['Zero balance accounts', 'Instant transfers', 'No hidden fees'].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <FaCheckCircle className="text-accent-light" /> {t}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:120ms]">
            <Carousel />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-responsive py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">Our services</h2>
          <p className="text-gray-600 mt-2">Everything you need to manage and grow your money.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5">
          {features.map(({ title, icon: Icon, description, tint }) => (
            <button
              key={title}
              onClick={() => navigate('/dashboard')}
              className="group card-modern p-5 flex flex-col items-center text-center gap-3 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <span className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${tint} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="text-2xl" />
              </span>
              <h3 className="font-semibold text-ink text-sm sm:text-base">{title}</h3>
              <p className="text-xs text-gray-500 hidden sm:block">{description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white border-y border-primary-100">
        <div className="container-responsive py-12 sm:py-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">Why choose us</h2>
            <p className="text-gray-600 mt-2">Built on trust, designed for speed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-primary-100 bg-surface p-6 hover:shadow-card transition-shadow">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-light mb-4">
                  <Icon className="text-xl" />
                </span>
                <h3 className="font-bold text-lg text-ink mb-1.5">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-gradient text-white">
        <div className="container-responsive py-14 sm:py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-balance">Ready to get started?</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of customers who trust BSNB for everyday banking.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('/register')} className="btn-accent text-base">
              Open an account <FaArrowRight className="text-sm" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold border border-white/40 text-white hover:bg-white hover:text-primary transition-colors"
            >
              Sign in
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-800 text-primary-100">
        <div className="container-responsive py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <span className="font-display font-bold text-white">BSNB</span>
          <span>© {new Date().getFullYear()} Bhumil Shah National Bank. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
