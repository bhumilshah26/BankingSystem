import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import api from '../../api'
import LoadingSpinner from './LoadingSpinner'
import InlineLoading from './InlineLoading'

const ModalWrapper = ({ children, onClose, type }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-0">
    <div className={`bg-white rounded-lg shadow-lg w-full ${type === 'Bank Statements' ? 'max-w-xl' : 'max-w-md'} sm:max-w-xs md:max-w-md xl:max-w-xl p-3 sm:p-6 relative`}>
      <button
        className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-lg sm:text-xl"
        onClick={onClose}
      >
        ✖
      </button>
      {children}
    </div>
  </div>
);

const getAccountNumbers = async (setAccountNumbers, setLoading) => {
  const user_id = localStorage.getItem('user_id')
  if(user_id) {
    setLoading(true);
    try {
        const response = await api.get(`/accounts/allaccounts/${user_id}`);
        if(response.status === 200) {
            setAccountNumbers(response.data.accounts);
        }
      } catch (e) { 
        alert("Error Fetching Accounts! ");
      } finally {
        setLoading(false);
      }
  }
};


const Modals = ({ type, onClose }) => {

  // create account
  const user_id = localStorage.getItem('user_id');
  const [account_number, setAccount_number] = useState(0);
  const [account_type, setAccount_Type] = useState(0);
  const [accountNumberError, setAccountNumberError] = useState('');

  // bank statements
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [baccount, setBaccount] = useState(accountNumbers[0]);
  const [statements, setStatements] = useState([]);
  
  // loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatements, setIsLoadingStatements] = useState(false);
  const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);
  const [isLoadingTransfer, setIsLoadingTransfer] = useState(false);
  const getStatusDotColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-500";
      case "fail":
        return "bg-red-500";
      case "pending":
        return "bg-gray-500";
      default:
        return "bg-gray-300";
    }
  };
  const getArrowIcon = (isIncoming) => {
    return isIncoming ? (
      <ArrowDownLeft className="text-green-600 ml-2" />
    ) : (
      <ArrowUpRight className="text-red-600 ml-2" />
    );
  };
  
  // transactions
  const [taccount, setTaccount] = useState(0);
  const [tamount, setTamount] = useState(0);
  const [ttype, setTtype] = useState("deposit");
  const [tdesc, setTdesc] = useState("");
  
  // transfers
  const [ban, setBan] = useState(0);
  const [san, setSan] = useState(0);
  const [ftamount, setFtamount] = useState(0);
  const [ftdesc, setFtdesc] = useState("");  
  
  // investments
  const [roi, setRoi] = useState(0);
  const [simple, setSimple] = useState(true);
  const [nooyears, setNoofyears] = useState(0);
  const [noofmonths, setNoofmonths] = useState(0);
  const [amount, setAmount] = useState(0);
  const [si, setSi] = useState(0);
  const [ci, setCi] = useState(0);
  
  // loans
  const [loanType, setLoanType] = useState("");
  const [isSenior, setIsSenior] = useState(false);
  const [principalLoanAmount, setPrincipalLoanAmount] = useState(0);
  const [noofloanmonths, setNoofloanmonths] = useState(0);
  const [emi, setEmi] = useState(0);

  // not include some arithematic symbols
  const handleKeyDown = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
     e.preventDefault();
  }}

  // this will shoot eveytime modal renders
  useEffect(() => {
    getAccountNumbers(setAccountNumbers, setIsLoading);
  }, []); 

  switch (type) {
    case "Create Account":
      const handleCreateAccount = async () => {
        
        if(user_id === '' || isNaN(account_number) || account_type === '') {
          return alert("Insufficient Details");
        }

        if(!(/^15\d{10}$/.test(account_number))) {
          return alert("Incorrect Account Number Format");
        }

        setIsLoading(true);
        try {
          const response = await api.post("/accounts/create", {
            user_id, account_number, account_type
          });

          if(response.status === 201) {
            alert(response.data.message);
          }

        } catch (e) { 
          return alert(e.response.data.message);
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <>
          <ModalWrapper onClose={onClose}>
            <h2 className="text-xl font-bold mb-4 text-[#832625]">Create Account</h2>
            <form className="space-y-4" onSubmit={handleCreateAccount}>
              <input type="text" placeholder="User ID" readOnly value={user_id} className="w-full border rounded p-2 text-gray-700" />
              <div>
                <input 
                  type="number" 
                  placeholder="Account Number" 
                  required  
                  onChange={(e)=>{
                    const value = e.target.value;
                    setAccount_number(value);
                    
                    // Clear error when user starts typing
                    if (value.length > 0) {
                      if (!/^15\d{10}$/.test(value)) {
                        setAccountNumberError('Account number must start with 15 and be exactly 12 digits');
                      } else {
                        setAccountNumberError('');
                      }
                    } else {
                      setAccountNumberError('');
                    }
                  }}
                  className={`w-full border rounded p-2 ${accountNumberError ? 'border-red-500' : ''}`}
                />
                <p className="text-xs text-gray-500 mt-1">Account number must start with '15' and be exactly 12 digits (e.g., 151234567890)</p>
                {accountNumberError && (
                  <p className="text-xs text-red-500 mt-1">{accountNumberError}</p>
                )}
              </div>
              <div className="flex space-x-4">
                <label><input type="radio" name="accountType" value="Savings" required onClick={(e) => {setAccount_Type("savings")}} /> Savings</label>
                <label><input type="radio" name="accountType" value="Current" required onClick={(e) => {setAccount_Type("current")}}/> Current</label>
              </div>
              <button 
                disabled={isLoading || accountNumberError}
                className="bg-[#832625] text-[#e5cbcb] w-full py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <InlineLoading size="small" />
                    <span className="ml-2">Creating Account...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </ModalWrapper>
          <LoadingSpinner isLoading={isLoading} />
        </>
      );

    case "Bank Statements":
      const handleBankStatements = async (e) => {
        e.preventDefault();
        setIsLoadingStatements(true);
        try {
          const response = await api.get(`/accounts/accountstatement/${baccount}`);
          if(response.status === 200) {

            const { transactions, transfers } = response.data;
            const combined = [
              ...transactions.map((t) => ({
                type: "transaction",
                time: new Date(t.transaction_time).toLocaleString(),
                status: t.status,
                amount: t.amount,
                transaction_type:t.transaction_type[0].toUpperCase() + t.transaction_type.slice(1),
                description: t.description,
                direction: t.transaction_type === "deposit" ? "in" : "out",
              })),
              ...transfers.map((t) => ({
                type: "transfer",
                time: new Date(t.transfer_time).toLocaleString(),
                status: t.status,
                amount: t.amount,
                transfer_type: baccount === t.sender_account_number ? `Debited to account no. ${t.receiver_account_number}` 
                                : `Credited from account no. ${t.sender_account_number}`,
                description: t.description,
                direction: baccount === t.receiver_account_number ? "in" : "out",
              })),
            ];
    
            const sorted = combined.sort((a, b) => new Date(b.time) - new Date(a.time));
            setStatements(sorted);
          }
        } catch (e) { 
          return alert(e.response.data.message);
        } finally {
          setIsLoadingStatements(false);
        }
      } 
      return (
        <>
          <ModalWrapper onClose={onClose} type={type}>
            <h2 className="text-xl font-bold mb-4 text-[#832625]">Bank Statements</h2>
            <form className="space-y-4" onSubmit={handleBankStatements}>

              <select required className="w-full border rounded p-2" onChange={(e)=>{ setStatements([]); setBaccount(parseInt(e.target.value))}}>
                <option value="" defaultValue={statements[0]}>Select Account Number</option>
                {accountNumbers.map((acc) => {

                return (
                  <option key={acc.account_number}>
                    {`${acc.account_number} Balance: ₹${acc.balance}`}
                  </option>
                  );
                })}
              </select>

              <button 
                type="submit" 
                disabled={isLoadingStatements}
                className="bg-[#832625] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoadingStatements ? (
                  <>
                    <InlineLoading size="small" />
                    <span className="ml-2">Loading Statements...</span>
                  </>
                ) : (
                  "Get Account Statement"
                )}
              </button>
            </form>
            <div className="bg-gray-100 p-4 mt-4 rounded space-y-3 max-h-96 overflow-y-auto">
              {statements.length === 0 ? (
                <p className="text-gray-500">No statements available.</p>
              ) : (
                statements.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded shadow-sm">
                    <div className="flex items-center space-x-3">
                      <span className={`w-3 h-3 rounded-full ${getStatusDotColor(item.status)}`}></span>
                      <div>
                        {item.type === "transfer" && <p>{item.transfer_type}</p> }
                        {item.type === "transaction" && <p>{item.transaction_type}</p> }
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-gray-500">{item.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold">₹{item.amount}</span>
                      {getArrowIcon(item.direction === "in")}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ModalWrapper>
          <LoadingSpinner isLoading={isLoadingStatements} />
        </>
      );

      case "Deposit/Withdrawal":
        const handleTransactions = async () => {
          // Validation - return early if invalid
          if (!(/^15\d{10}$/.test(taccount))) {
            alert("Enter Correct Details");
            return; // Stop execution here
          }
      
          setIsLoadingTransaction(true);
          try {
            const response = await api.post("/transactions/add/", {
              taccount, tamount, ttype, tdesc
            });
            if (response.status === 200) {
              return alert("Transaction Complete");
            }
          } catch (e) {
            return alert(e.response.data.message);
          } finally {
            setIsLoadingTransaction(false);
          }
        };
      return (
        <>
          <ModalWrapper onClose={onClose}>
            <h2 className="text-xl font-bold mb-4 text-[#832625]">Deposit/Withdrawal</h2>
            <form className="space-y-4" onSubmit={handleTransactions}>

              <input type="number" placeholder="Account Number" required onKeyDown={handleKeyDown}
              className="w-full border rounded p-2" onChange={(e) => {setTaccount(parseInt(e.target.value))}} />
    
              <input type="number" step="0.01" placeholder="Amount" required onKeyDown={handleKeyDown}
              className="w-full border rounded p-2" onChange={(e) => {setTamount(e.target.value)}} />

              <div className="flex space-x-4">
                <label><input type="radio" name="txnType" value="Deposit" required onClick={(e) => {setTtype("deposit")}} /> Deposit</label>
                <label><input type="radio" name="txnType" value="Withdrawal" required  onClick={(e) => {setTtype("withdrawal")}}/> Withdrawal</label>
              </div>

              <input type="text" placeholder="Description (Optional)" onChange={(e)=> {setTdesc(e.target.value)}}
              className="w-full border rounded p-2" />

              <button 
                disabled={isLoadingTransaction}
                className="bg-[#832625] text-[#e5cbcb] w-full py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoadingTransaction ? (
                  <>
                    <InlineLoading size="small" />
                    <span className="ml-2">Processing Transaction...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>

            </form>
          </ModalWrapper>
          <LoadingSpinner isLoading={isLoadingTransaction} />
        </>
      );

    case "Funds Transfer":
      const handleFundsTransfer = async () => {

        const accregex = /^15\d{10}$/;
        if(!accregex.test(ban) || !accregex.test(san) || san === ban) {
          return alert("Enter Correct details")
        }
        setIsLoadingTransfer(true);
        try {
          const response = await api.post("/transfers/transfer-money", {
            san, ban, ftamount, ftdesc
          });
          if(response.status === 200) { 
            alert(response.data.message); 
          }

        } catch (e) { 
          alert(e.response.data.message); 
        } finally {
          setIsLoadingTransfer(false);
        }
      };
      return (
        <>
          <ModalWrapper onClose={onClose}>
            <h2 className="text-xl font-bold mb-4 text-[#832625]">Funds Transfer</h2>
            <form className="space-y-4" onSubmit={handleFundsTransfer}>

              <input type="number" maxLength={12} placeholder="Beneficiary Account Number" required onKeyDown={handleKeyDown}
              className="w-full border rounded p-2" onChange={(e)=>{setBan(parseInt(e.target.value))}}/>

              <select required className="w-full border rounded p-2" onChange={(e)=>{
                    setSan(parseInt(e.target.value));
                  }
                }>
                <option value="" disabled>Select Your Account Number</option>
                {accountNumbers.map((acc) => <option key={acc.account_number}>{acc.account_number}</option>)}
              </select>

              <input type="number" step="0.01" placeholder="Amount" required min={1} max={1000000} onKeyDown={handleKeyDown}
              className="w-full border rounded p-2" onChange={(e)=>{setFtamount(parseFloat(e.target.value))}} />

              <input type="text" placeholder="Description (Optional)" 
              className="w-full border rounded p-2" onChange={(e)=>{setFtdesc(e.target.value)}}/>

              <button 
                disabled={isLoadingTransfer}
                className="bg-[#832625] text-[#e5cbcb] w-full py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoadingTransfer ? (
                  <>
                    <InlineLoading size="small" />
                    <span className="ml-2">Processing Transfer...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </ModalWrapper>
          <LoadingSpinner isLoading={isLoadingTransfer} />
        </>
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
          if ((loanType === "Home" || loanType === "Business") && isSenior) rate -= 0.5;
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
                Your total interest is ₹{parseFloat((total - principalLoanAmount) > 0 ? (total - principalLoanAmount) : 0).toFixed(2)}.<br />
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
        const moninyear = parseFloat(noofmonths / 12) + parseFloat(nooyears);
        
        setSi(parseFloat(principal * roig * moninyear / 100));
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
             className="w-full border rounded p-2" onChange={(e) => {setAmount(e.target.value);}}/>

            <div className="flex space-x-4">
              <label><input type="radio" name="intType" value="Simple" required defaultChecked onClick={() => {setSimple(true);}}/> Simple</label>
              <label><input type="radio" name="intType" value="Compound" required onClick={() => {setSimple(false);}} /> Compound</label>
            </div>

            <input type="number" placeholder="No. of Years" required 
             className="w-full border rounded p-2" onChange={(e) => {setNoofyears(e.target.value);}}/>

            <input type="number" placeholder="No. of Months" required min={0} max={11}
             className="w-full border rounded p-2" onChange={(e) => {setNoofmonths(e.target.value);}}/>

            <div className="bg-gray-100 p-4 mt-2 rounded">
              {simple && <div className="font-bold"> Simple Interest Calculation: <br/>
                    Total Interest over {nooyears} year/s and {noofmonths > 0 ? `${noofmonths} month/s` : ''} <br/>
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