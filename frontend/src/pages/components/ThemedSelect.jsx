import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';

// Themed replacement for a native <select>. Matches the teal/gold system:
// rounded field, teal focus ring, custom panel with hover + selected states.
const ThemedSelect = ({ value, onChange, options, placeholder = 'Select...', disabled = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find((o) => String(o.value) === String(value));

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`input-modern flex items-center justify-between gap-2 text-left ${open ? 'ring-2 ring-primary/30 border-primary' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className={selected ? 'text-ink truncate' : 'text-gray-400 truncate'}>
          {selected ? selected.label : placeholder}
        </span>
        <FaChevronDown className={`text-gray-400 text-xs shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-dropdown mt-2 w-full bg-white border border-primary-100 rounded-xl shadow-card-hover py-1 max-h-60 overflow-y-auto animate-fade-in"
        >
          {options.length === 0 && (
            <li className="px-4 py-2.5 text-sm text-gray-400">No options</li>
          )}
          {options.map((o) => {
            const isSel = String(o.value) === String(value);
            return (
              <li key={o.value} role="option" aria-selected={isSel}>
                <button
                  type="button"
                  onClick={() => { onChange(o.value); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-2 transition-colors hover:bg-primary-50 ${isSel ? 'text-primary font-semibold bg-primary-50' : 'text-ink'}`}
                >
                  <span className="truncate">{o.label}</span>
                  {isSel && <FaCheck className="text-primary text-xs shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ThemedSelect;
