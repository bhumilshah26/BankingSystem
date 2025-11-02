import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import api from '../../api'
import LoadingSpinner from './LoadingSpinner'
import InlineLoading from './InlineLoading'

const ModalWrapper = ({ children, onClose, type }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 px-2 sm:px-0 animate-fade-in">
    <div className={`card-modern w-full ${type === 'Bank Statements' ? 'max-w-4xl' : 'max-w-lg'} p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto`}>
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-danger transition p-1 rounded-full hover:bg-gray-100"
        onClick={onClose}
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
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
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Account</h2>
              <p className="text-gray-600 text-sm">Add a new savings or current account</p>
            </div>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleCreateAccount(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                <input type="text" readOnly value={user_id} className="input-modern bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input 
                  type="number" 
                  placeholder="Enter 12-digit account number (starts with 15)" 
                  required  
                  onChange={(e)=>{
                    const value = e.target.value;
                    setAccount_number(value);
                    
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
                  className={`input-modern ${accountNumberError ? 'border-danger ring-2 ring-danger' : ''}`}
                />
                {accountNumberError ? (
                  <p className="text-xs text-danger mt-1">{accountNumberError}</p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">Format: 15XXXXXXXXXX (12 digits total)</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`border-2 rounded-lg p-4 cursor-pointer transition ${account_type === 'savings' ? 'border-primary bg-light' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input type="radio" name="accountType" value="Savings" required onClick={() => setAccount_Type("savings")} className="mr-2" />
                    <span className="font-medium">Savings</span>
                  </label>
                  <label className={`border-2 rounded-lg p-4 cursor-pointer transition ${account_type === 'current' ? 'border-primary bg-light' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input type="radio" name="accountType" value="Current" required onClick={() => setAccount_Type("current")} className="mr-2" />
                    <span className="font-medium">Current</span>
                  </label>
                </div>
              </div>
              <button 
                disabled={isLoading || accountNumberError}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <InlineLoading size="small" />
                    <span className="ml-2">Creating Account...</span>
                  </>
                ) : (
                  "Create Account"
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
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Statements</h2>
              <p className="text-gray-600 text-sm">View your transaction history</p>
            </div>
            <form className="space-y-4 mb-6" onSubmit={handleBankStatements}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Account</label>
                <select required className="input-modern" onChange={(e)=>{ setStatements([]); setBaccount(parseInt(e.target.value))}}>
                  <option value="">Choose an account...</option>
                  {accountNumbers.map((acc) => (
                    <option key={acc.account_number} value={acc.account_number}>
                      {`${acc.account_number} - Balance: ₹${acc.balance.toLocaleString('en-IN')}`}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isLoadingStatements}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoadingStatements ? (
                  <>
                    <InlineLoading size="small" />
                    <span className="ml-2">Loading Statements...</span>
                  </>
                ) : (
                  "Get Statements"
                )}
              </button>
            </form>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-800 mb-4">Transaction History</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {statements.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No statements available. Select an account and click "Get Statements" to view history.</p>
                  </div>
                ) : (
                  statements.map((item, index) => (
                    <div key={index} className="card-modern p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <span className={`w-3 h-3 rounded-full ${getStatusDotColor(item.status)}`}></span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              {item.type === "transfer" && <span className="text-xs font-medium text-primary bg-light px-2 py-1 rounded">Transfer</span>}
                              {item.type === "transaction" && <span className="text-xs font-medium text-success bg-green-100 px-2 py-1 rounded">{item.transaction_type}</span>}
                            </div>
                            <p className="font-semibold text-gray-800">{item.description || 'No description'}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`font-bold ${item.direction === "in" ? "text-success" : "text-danger"}`}>
                            {item.direction === "in" ? "+" : "-"}₹{item.amount.toLocaleString('en-IN')}
                          </span>
                          {getArrowIcon(item.direction === "in")}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
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
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Deposit / Withdrawal</h2>
              <p className="text-gray-600 text-sm">Process deposits or withdrawals</p>
            </div>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleTransactions(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input 
                  type="number" 
                  placeholder="Enter 12-digit account number" 
                  required 
                  onKeyDown={handleKeyDown}
                  className="input-modern" 
                  onChange={(e) => {setTaccount(parseInt(e.target.value))}} 
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="Enter amount" 
                  required 
                  onKeyDown={handleKeyDown}
                  className="input-modern" 
                  onChange={(e) => {setTamount(e.target.value)}} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Transaction Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`border-2 rounded-lg p-4 cursor-pointer transition ${ttype === 'deposit' ? 'border-success bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input type="radio" name="txnType" value="Deposit" required onClick={() => setTtype("deposit")} className="mr-2" />
                    <span className="font-medium">Deposit</span>
                  </label>
                  <label className={`border-2 rounded-lg p-4 cursor-pointer transition ${ttype === 'withdrawal' ? 'border-danger bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input type="radio" name="txnType" value="Withdrawal" required onClick={() => setTtype("withdrawal")} className="mr-2" />
                    <span className="font-medium">Withdrawal</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Add a note about this transaction" 
                  onChange={(e)=> {setTdesc(e.target.value)}}
                  className="input-modern" 
                />
              </div>

              <button 
                disabled={isLoadingTransaction}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoadingTransaction ? (
                  <>
                    <InlineLoading size="small" />
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  "Process Transaction"
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
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Funds Transfer</h2>
              <p className="text-gray-600 text-sm">Transfer money to another account</p>
            </div>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleFundsTransfer(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Account Number</label>
                <input 
                  type="number" 
                  maxLength={12} 
                  placeholder="Enter recipient's 12-digit account number" 
                  required 
                  onKeyDown={handleKeyDown}
                  className="input-modern" 
                  onChange={(e)=>{setBan(parseInt(e.target.value))}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Account</label>
                <select required className="input-modern" onChange={(e)=>{setSan(parseInt(e.target.value))}}>
                  <option value="" disabled>Select your account</option>
                  {accountNumbers.map((acc) => (
                    <option key={acc.account_number} value={acc.account_number}>
                      {`${acc.account_number} - Balance: ₹${acc.balance.toLocaleString('en-IN')}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transfer Amount</label>
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="Enter amount (₹1 - ₹10,00,000)" 
                  required 
                  min={1} 
                  max={1000000} 
                  onKeyDown={handleKeyDown}
                  className="input-modern" 
                  onChange={(e)=>{setFtamount(parseFloat(e.target.value))}} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Add a note about this transfer" 
                  className="input-modern" 
                  onChange={(e)=>{setFtdesc(e.target.value)}}
                />
              </div>

              <button 
                disabled={isLoadingTransfer}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoadingTransfer ? (
                  <>
                    <InlineLoading size="small" />
                    <span className="ml-2">Processing Transfer...</span>
                  </>
                ) : (
                  "Transfer Funds"
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
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Banking Cards</h2>
            <p className="text-gray-600 text-sm">Apply for debit or credit cards</p>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Card Type</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="border-2 rounded-lg p-4 cursor-pointer transition border-gray-300 hover:border-primary">
                  <input type="radio" name="cardType" value="Debit" required className="mr-2" />
                  <span className="font-medium">Debit Card</span>
                </label>
                <label className="border-2 rounded-lg p-4 cursor-pointer transition border-gray-300 hover:border-primary">
                  <input type="radio" name="cardType" value="Credit" required className="mr-2" />
                  <span className="font-medium">Credit Card</span>
                </label>
              </div>
            </div>
            <div className="bg-light border border-gray-300 rounded-lg p-4">
              <p className="text-gray-700 text-sm">
                <strong>Note:</strong> Please visit your nearest branch for card application and further processing.
              </p>
            </div>
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
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Loan Calculator</h2>
              <p className="text-gray-600 text-sm">Calculate your EMI and interest</p>
            </div>
            <div className="space-y-5">
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
              <div className="bg-light border border-gray-300 p-5 mt-2 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">Calculation Results:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly EMI:</span>
                    <span className="font-bold text-primary">₹{emi.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-semibold">₹{parseFloat(principalLoanAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold text-warning">₹{parseFloat((total - principalLoanAmount) > 0 ? (total - principalLoanAmount) : 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="text-gray-700 font-semibold">Total Amount:</span>
                    <span className="font-bold text-success">₹{parseFloat(total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button onClick={calculateEMI} className="btn-primary w-full">Calculate EMI</button>
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
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Investment Calculator</h2>
            <p className="text-gray-600 text-sm">Calculate returns on your investments</p>
          </div>
          <div className="space-y-5">
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

            <div className="bg-light border border-gray-300 p-5 mt-2 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-3">
                {simple ? 'Simple Interest Calculation' : 'Compound Interest Calculation'}
              </h4>
              {simple ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold text-warning">₹{si.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{nooyears} year(s) {noofmonths > 0 ? `and ${noofmonths} month(s)` : ''}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="text-gray-700 font-semibold">Maturity Amount:</span>
                    <span className="font-bold text-success">₹{(si + parseFloat(amount || 0)).toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{nooyears} year(s) {noofmonths > 0 ? `and ${noofmonths} month(s)` : ''}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="text-gray-700 font-semibold">Maturity Amount:</span>
                    <span className="font-bold text-success">₹{(ci || 0).toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => {simple ? simpleInt() : compoundInt()}} className="btn-primary w-full">Calculate Returns</button>
          </div>
        </ModalWrapper>
      );

    case "Crypto":
      return (
        <ModalWrapper onClose={onClose}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cryptocurrency</h2>
            <p className="text-gray-600 text-sm">Explore digital currency options</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="card-modern p-6 text-center">
              <div className="text-4xl mb-2">₿</div>
              <p className="font-semibold text-gray-800">Bitcoin</p>
            </div>
            <div className="card-modern p-6 text-center">
              <div className="text-4xl mb-2">Ξ</div>
              <p className="font-semibold text-gray-800">Ethereum</p>
            </div>
            <div className="card-modern p-6 text-center">
              <div className="text-4xl mb-2">Ð</div>
              <p className="font-semibold text-gray-800">Dogecoin</p>
            </div>
          </div>
          <div className="mt-6 bg-light border border-gray-300 rounded-lg p-4">
            <p className="text-gray-700 text-sm">
              <strong>Coming Soon:</strong> Cryptocurrency services will be available soon. Stay tuned!
            </p>
          </div>
        </ModalWrapper>
      );

    default:
      return null;
  }
};

export default Modals;