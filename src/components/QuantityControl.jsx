import { MinusIcon, PlusIcon } from './Icons.jsx';
import { MAX_QTY } from '../context/CartContext.jsx';

export default function QuantityControl({ value, onChange, label = 'Quantità', size = 'md' }) {
  return (
    <div className={`qty qty--${size}`} role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Diminuisci quantità"
      >
        <MinusIcon width={16} height={16} />
      </button>
      <output aria-live="polite" aria-label={`${label}: ${value}`}>
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label="Aumenta quantità"
      >
        <PlusIcon width={16} height={16} />
      </button>
    </div>
  );
}
