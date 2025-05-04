import React, { useEffect, useState } from "react";
import axios from "axios";

const ModalWrapper = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
      <button
        className="absolute top-2 right-3 text-gray-500 hover:text-red-600"
        onClick={onClose}
      >
        ✖
      </button>
      {children}
    </div>
  </div>
);

const getAccountNumbers = async (setAccountNumbers) => {
  const user_id = localStorage.getItem('user_id');
  if(user_id){
    try {
          const response = await axios.get(`http://localhost:5000/accounts/allaccounts/${user_id}`);
          if(response.status === 200) {
              setAccountNumbers(response.data.accounts);
          }
      } catch (e) { console.error("Failed to fetch accounts:", e); }
  }
};


const Modals = ({ type, onClose }) => {
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [loanType, setLoanType] = useState("");
  const [isSenior, setIsSenior] = useState(false);
  const [principalLoanAmount, setPrincipalLoanAmount] = useState(0);
  const [noofloanmonths, setNoofloanmonths] = useState(0);
  const [emi, setEmi] = useState(0);
  const [roi, setRoi] = useState(0);
  const [simple, setSimple] = useState(true);
  const [nooyears, setNoofyears] = useState(0);
  const [noofmonths, setNoofmonths] = useState(0);
  const [amount, setAmount] = useState(0);
  const [si, setSi] = useState(0);
  const [ci, setCi] = useState(0);

  // this will shoot eveytime modal renders
  useEffect(() => {
    getAccountNumbers(setAccountNumbers);
  }, []);

  switch (type) {
    case "Create Account":
      return (
        <ModalWrapper onClose={onClose}>
          <h2 className="text-xl font-bold mb-4 text-[#832625]">Create Account</h2>
          <form className="space-y-4">
            <input type="text" placeholder="User ID" required className="w-full border rounded p-2" />
            <input type="number" placeholder="Account Number" required className="w-full border rounded p-2" />
            <div className="flex space-x-4">
              <label><input type="radio" name="accountType" value="Savings" required /> Savings</label>
              <label><input type="radio" name="accountType" value="Current" required /> Current</label>
            </div>
            <button className="bg-[#832625] text-[#e5cbcb] w-full py-2 rounded">Submit</button>
          </form>
        </ModalWrapper>
      );

    case "Bank Statements":
      return (
        <ModalWrapper onClose={onClose}>
          <h2 className="text-xl font-bold mb-4 text-[#832625]">Bank Statements</h2>
          <form className="space-y-4">
            <select required className="w-full border rounded p-2">
              <option value="">Select Account Number</option>
              {accountNumbers.map((acc) => <option key={acc.account_number}>{acc.account_number}</option>)}
            </select>
            <div className="bg-gray-100 p-4 mt-2 rounded">Results from backend will appear here.</div>
          </form>
        </ModalWrapper>
      );

    case "Deposit/Withdrawal":
      return (
        <ModalWrapper onClose={onClose}>
          <h2 className="text-xl font-bold mb-4 text-[#832625]">Deposit/Withdrawal</h2>
          <form className="space-y-4">
            <input type="text" maxLength={12} placeholder="Account Number" required className="w-full border rounded p-2" />
            <input type="number" step="0.01" placeholder="Amount" required className="w-full border rounded p-2" />
            <div className="flex space-x-4">
              <label><input type="radio" name="txnType" value="Deposit" required /> Deposit</label>
              <label><input type="radio" name="txnType" value="Withdrawal" required /> Withdrawal</label>
            </div>
            <input type="text" placeholder="Description" required className="w-full border rounded p-2" />
            <button className="bg-[#832625] text-[#e5cbcb] w-full py-2 rounded">Submit</button>
          </form>
        </ModalWrapper>
      );

    case "Funds Transfer":
      return (
        <ModalWrapper onClose={onClose}>
          <h2 className="text-xl font-bold mb-4 text-[#832625]">Funds Transfer</h2>
          <form className="space-y-4">
            <input type="text" maxLength={12} placeholder="Beneficiary Account Number" required className="w-full border rounded p-2" />
            <input type="text" maxLength={12} placeholder="Your Account Number" required className="w-full border rounded p-2" />
            <input type="number" step="0.01" placeholder="Amount" required className="w-full border rounded p-2" />
            <input type="text" placeholder="Description" required className="w-full border rounded p-2" />
            <button className="bg-[#832625] text-[#e5cbcb] w-full py-2 rounded">Submit</button>
          </form>
        </ModalWrapper>
      );

    case "Cards":
      return (
        <ModalWrapper onClose={onClose}>
          <h2 className="text-xl font-bold mb-4 text-[#832625]">Cards</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <label><input type="radio" name="cardType" value="Debit" required /> Debit</label>
              <label><input type="radio" name="cardType" value="Credit" required /> Credit</label>
            </div>
            <p className="text-gray-700">Please visit your nearest branch for further processing.</p>
          </div>
        </ModalWrapper>
      );

      case "Loans":
        const baseRates = {
          Home: 8.5,
          Education: 6.8,
          Car: 9.2,
          Business: 11.5
        };
      
        const calculateInterest = () => {
          let rate = baseRates[loanType] || 0;
          if (isSenior) rate -= 0.5;
          return rate.toFixed(2);
        };

        const calculateEMI = () => {
          const principal = parseFloat(principalLoanAmount);
          const months = parseInt(noofloanmonths);
          const r = (baseRates[loanType] || 0) - (isSenior ? 0.5 : 0);
        
          if (!principal || !months || !r) return;
        
          const monthlyRate = r / 1200;
          const factor = Math.pow(1 + monthlyRate, months);
          const emic = (principal * monthlyRate * factor) / (factor - 1);
        
          setEmi(emic);
        };

        const total = emi * noofloanmonths;

        return (
          <ModalWrapper onClose={onClose}>
            <h2 className="text-xl font-bold text-[#832625]">Loans</h2>
            <div className="text-gray-500">Click on calculate</div> <br/>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <select
                  required
                  className="w-full border rounded p-2"
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                >
                  <option value="">Select Loan Type</option>
                  <option value="Home">Home</option>
                  <option value="Education">Education</option>
                  <option value="Car">Car</option>
                  <option value="Business">Business</option>
                </select>
                <input
                  type="text"
                  readOnly
                  className="w-36 border bg-gray-100 rounded p-2 text-center"
                  value={loanType ? `${calculateInterest()}%` : ""}
                  placeholder="Annual Interest %"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="senior"
                  onClick={() => setIsSenior(!isSenior)}
                  checked={isSenior}
                />
                <label>Senior Citizen (-0.5%)</label>
              </div>
              <input
                type="number"
                placeholder="Requested Amount"
                required
                className="w-full border rounded p-2"
                onChange={(e) => { setPrincipalLoanAmount(e.target.value); } }
              />
              <input
                type="number"
                placeholder="Number of Months"
                required
                className="w-full border rounded p-2"
                min={0}
                onChange={(e) => { setNoofloanmonths(e.target.value); }}
              />
              <div className="bg-gray-100 p-4 mt-2 rounded font-bold">
                Your monthly emi is calculated to be ₹{emi.toFixed(2)}.<br/>
                Your principal amount is ₹{parseFloat(principalLoanAmount).toFixed(2)}.<br/>
                Your total interest is ₹{parseFloat(total - principalLoanAmount).toFixed(2)}.<br />
                Your total amount is ₹{parseFloat(total).toFixed(2)}. <br />
              </div>
              <button onClick={calculateEMI} className="bg-[#832625] text-[#e5cbcb] w-full py-2 rounded">Calculate</button>
            </div>
          </ModalWrapper>
        );
      

    case "Investments":
      const simpleInt = () => {
        const principal = parseFloat(amount);
        const roig = parseFloat(roi);
        const moninyear = parseFloat(parseFloat(noofmonths / 12) + nooyears);
        
        setSi(principal * roig * moninyear / 100);
      };
      const compoundInt = () => {
        const principal = parseFloat(amount);
        const roig = parseFloat(roi);
        const res = principal * Math.pow((1 + (roig / 100)), parseInt(nooyears)) * (1 + (noofmonths / 12) * (roig / 100));
        setCi(res)
      }
      return (
        <ModalWrapper onClose={onClose}>
          <h2 className="text-xl font-bold   text-[#832625]">Investments</h2>
          <div className="text-gray-500">Click on calculate</div> <br/>
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="number" placeholder="Rate of Interest" required className="w-full border rounded p-2"  min={0}
              onChange={(e) => {setRoi(e.target.value)}}/>
              <span className="ml-2">%</span>
            </div>

            <input type="number" placeholder="Amount" required
             className="w-full border rounded p-2" onChange={(e) => setAmount(e.target.value)}/>

            <div className="flex space-x-4">
              <label><input type="radio" name="intType" value="Simple" required defaultChecked onClick={() => setSimple(true)}/> Simple</label>
              <label><input type="radio" name="intType" value="Compound" required onClick={() => setSimple(false)} /> Compound</label>
            </div>

            <input type="number" placeholder="No. of Years" required 
             className="w-full border rounded p-2" onChange={(e) => setNoofyears(e.target.value)}/>

            <input type="number" placeholder="No. of Months" required min={0} max={11}
             className="w-full border rounded p-2" onChange={(e) => setNoofmonths(e.target.value)}/>

            <div className="bg-gray-100 p-4 mt-2 rounded">
              {simple && <div className="font-bold"> Simple Interest Calculation: <br/>
                    Total Interest over {nooyears} year/s and {noofmonths} month/s <br/>
                    Maturity Amount = ₹{(si + parseFloat(amount)).toFixed(2)}
              </div>}
              {!simple && <div className="font-bold"> Compound Interest Calculation: <br/>
                    Total Interest over {nooyears} year/s and {noofmonths} month/s <br/>
                    Maturity Amount = ₹{(ci).toFixed(2)}
              
              </div>}
              
              </div>
            <button onClick={() => {simple ? simpleInt() : compoundInt()}} className="bg-[#832625] text-[#e5cbcb] w-full py-2 rounded">Calculate</button>
          </div>
        </ModalWrapper>
      );

    case "Crypto":
      return (
        <ModalWrapper onClose={onClose}>
          <h2 className="text-xl font-bold mb-4 text-[#832625]">Crypto</h2>
          <div className="flex justify-around text-4xl">
            <span>₿</span>
            <span>Ξ</span>
            <span>Ð</span>
          </div>
        </ModalWrapper>
      );

    default:
      return null;
  }
};

export default Modals;