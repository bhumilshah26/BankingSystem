import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronRight, FaChevronLeft, FaCheck } from 'react-icons/fa';

const Onboarding = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    // Check if this is the user's first time
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setIsFirstTime(true);
    }
  }, []);

  const steps = [
    {
      title: "Welcome to BSNB Banking!",
      description: "Let's get you started with your new banking experience. We'll show you around the key features.",
      image: "🏦",
      content: (
        <div className="text-center">
          <div className="text-6xl mb-4">🏦</div>
          <h3 className="text-xl font-bold text-[#832625] mb-2">Welcome to BSNB Banking!</h3>
          <p className="text-gray-600">Your secure and convenient banking solution</p>
        </div>
      )
    },
    {
      title: "Create Your First Account",
      description: "Start by creating your first bank account. You can have multiple accounts for different purposes.",
      image: "📝",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-lg font-bold text-[#832625] mb-2">Create Account</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-[#832625] mb-2">How to create an account:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Click on the "Create Account" card</li>
              <li>Enter a 12-digit account number starting with "15"</li>
              <li>Choose between Savings or Current account</li>
              <li>Submit to create your account</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: "View Your Bank Statements",
      description: "Keep track of all your transactions and transfers in one place.",
      image: "📄",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-3">📄</div>
            <h3 className="text-lg font-bold text-[#832625] mb-2">Bank Statements</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-[#832625] mb-2">How to view statements:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Click on "Bank Statements" card</li>
              <li>Select your account from the dropdown</li>
              <li>View all transactions and transfers</li>
              <li>See transaction status with color-coded dots</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: "Make Deposits & Withdrawals",
      description: "Easily deposit money into your account or withdraw when needed.",
      image: "💸",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-3">💸</div>
            <h3 className="text-lg font-bold text-[#832625] mb-2">Deposits & Withdrawals</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-[#832625] mb-2">How to transact:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Click on "Deposit/Withdrawal"</li>
              <li>Enter your 12-digit account number</li>
              <li>Specify the amount</li>
              <li>Choose Deposit or Withdrawal</li>
              <li>Add an optional description</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: "Transfer Money Between Accounts",
      description: "Send money to other accounts securely and instantly.",
      image: "💳",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-3">💳</div>
            <h3 className="text-lg font-bold text-[#832625] mb-2">Funds Transfer</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-[#832625] mb-2">How to transfer funds:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Click on "Funds Transfer"</li>
              <li>Enter beneficiary account number</li>
              <li>Select your source account</li>
              <li>Enter transfer amount</li>
              <li>Add optional description</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: "Explore Additional Services",
      description: "Discover loans, investments, and other banking services.",
      image: "📊",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-[#832625] mb-2">Additional Services</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">💳</div>
              <h5 className="font-semibold text-[#832625]">Cards</h5>
              <p className="text-gray-600 text-xs">Apply for debit/credit cards</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">📊</div>
              <h5 className="font-semibold text-[#832625]">Loans</h5>
              <p className="text-gray-600 text-xs">Calculate EMI and interest rates</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">📈</div>
              <h5 className="font-semibold text-[#832625]">Investments</h5>
              <p className="text-gray-600 text-xs">Calculate interest earnings</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">🪙</div>
              <h5 className="font-semibold text-[#832625]">Crypto</h5>
              <p className="text-gray-600 text-xs">Explore cryptocurrency options</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "You're All Set!",
      description: "You now know how to use all the key features of BSNB Banking.",
      image: "✅",
      content: (
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-[#832625] mb-2">You're All Set!</h3>
          <p className="text-gray-600 mb-4">You now know how to use all the key features of BSNB Banking.</p>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Quick Tips:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Account numbers must start with "15" and be 12 digits</li>
              <li>• All transactions are secure and encrypted</li>
              <li>• Check your statements regularly</li>
              <li>• Contact support if you need help</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

    const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsFirstTime(false);
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsFirstTime(false);
    onComplete();
  };

  // Only show if explicitly opened or if it's the first time and not completed
  if (!isOpen && !isFirstTime) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#832625] rounded-full"></div>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {steps[currentStep].content}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#832625] hover:bg-[#832625] hover:text-white'
            }`}
          >
            <FaChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-[#832625]'
                    : index < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-4 py-2 bg-[#832625] text-white rounded hover:bg-[#6b1f1d] transition-colors"
          >
            <span>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </span>
            {currentStep === steps.length - 1 ? (
              <FaCheck size={16} />
            ) : (
              <FaChevronRight size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding; 