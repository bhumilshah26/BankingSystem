import { useState, useEffect, useCallback } from 'react';
import { FaSyncAlt, FaWifi } from 'react-icons/fa';
import ThemedSelect from './ThemedSelect';
import api from '../../api';

// Premium debit-card style balance panel. Balance stays masked until the user
// presses Sync; the account number is shown (grouped) beneath it.
const groupNumber = (n) => String(n).replace(/(.{4})/g, '$1 ').trim();

const BalanceCard = () => {
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState('');
  const [balance, setBalance] = useState(null); // null => masked
  const [syncing, setSyncing] = useState(false);
  const userId = localStorage.getItem('user_id');
  const userName = localStorage.getItem('name');

  const loadAccounts = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await api.get(`/accounts/allaccounts/${userId}`);
      if (res.status === 200) setAccounts(res.data.accounts || []);
    } catch {
      /* ignore: card simply shows no accounts */
    }
  }, [userId]);

  useEffect(() => { loadAccounts(); }, [loadAccounts]);

  const handleSelect = (val) => {
    setSelected(val);
    setBalance(null); // re-mask until the user syncs the new account
  };

  const handleSync = async () => {
    if (!selected) return alert('Please select an account first.');
    setSyncing(true);
    try {
      const res = await api.get(`/accounts/allaccounts/${userId}`);
      const acc = (res.data.accounts || []).find(
        (a) => String(a.account_number) === String(selected)
      );
      setAccounts(res.data.accounts || []);
      setBalance(acc ? Number(acc.balance) : 0);
    } catch {
      alert('Could not sync balance. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  const options = accounts.map((a) => ({
    value: a.account_number,
    label: `A/C ${a.account_number}`,
  }));

  const masked = balance === null;

  return (
    <div
      className="relative overflow-hidden rounded-2xl text-white shadow-brand ring-1 ring-white/10 p-5 sm:p-7"
      style={{
        backgroundImage:
          'radial-gradient(120% 120% at 0% 0%, rgba(201,162,39,0.20), transparent 45%), linear-gradient(135deg, #7A2322 0%, #3A1413 62%, #260C0B 100%)',
      }}
    >
      {/* decorative rings */}
      <div className="pointer-events-none absolute -right-16 -top-20 w-56 h-56 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -right-6 top-10 w-40 h-40 rounded-full bg-white/5" />

      {/* Header: brand + account selector */}
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="font-display font-bold tracking-wide text-lg leading-none">BSNB</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-light/70 mt-1">Debit</p>
        </div>
        <div className="w-40 sm:w-52">
          <ThemedSelect
            value={selected}
            onChange={handleSelect}
            options={options}
            placeholder={accounts.length ? 'Select account' : 'No accounts'}
            disabled={accounts.length === 0}
          />
        </div>
      </div>

      {/* Chip + contactless */}
      <div className="relative flex items-center gap-3 mt-5">
        <div className="w-11 h-8 rounded-md bg-gradient-to-br from-accent-light to-accent-dark shadow-inner ring-1 ring-black/10 relative">
          <div className="absolute inset-1.5 rounded-[3px] border border-black/20" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-black/20" />
        </div>
        <FaWifi className="rotate-90 text-light/80 text-lg" aria-hidden="true" />
      </div>

      {/* Balance */}
      <div className="relative mt-6 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.18em] text-light/70">Available balance</p>
          <p className="font-display text-3xl sm:text-[2.6rem] leading-tight font-bold tabular-nums mt-1">
            {masked
              ? <span className="tracking-[0.15em] text-light/90">₹ ••••••</span>
              : `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSync}
          disabled={syncing || !selected}
          className="btn-accent shrink-0 px-4 py-2.5 disabled:opacity-60"
          aria-label="Sync balance"
        >
          <FaSyncAlt className={syncing ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">{syncing ? 'Syncing' : 'Sync'}</span>
        </button>
      </div>

      {/* Account number + holder */}
      <div className="relative mt-6 pt-4 border-t border-white/10 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] text-light/60">Account number</p>
          <p className="font-medium tabular-nums tracking-[0.2em] text-light/95 mt-0.5 truncate">
            {selected ? groupNumber(selected) : '•••• •••• ••••'}
          </p>
        </div>
        {userName && (
          <p className="text-xs uppercase tracking-wider text-light/70 truncate max-w-[45%] text-right">
            {userName}
          </p>
        )}
      </div>
    </div>
  );
};

export default BalanceCard;
