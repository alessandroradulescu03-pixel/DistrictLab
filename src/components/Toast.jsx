import { useCart } from '../context/CartContext.jsx';
import { CheckIcon, CloseIcon } from './Icons.jsx';

// Notifica breve dopo l'aggiunta al carrello (annunciata anche agli screen reader).
export default function Toast() {
  const { toast, dismissToast, openCart } = useCart();
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.id}>
          <CheckIcon width={18} height={18} />
          <span>{toast.message}</span>
          <button
            type="button"
            className="toast__action"
            onClick={() => {
              dismissToast();
              openCart();
            }}
          >
            Vedi
          </button>
          <button type="button" className="toast__close" onClick={dismissToast} aria-label="Chiudi notifica">
            <CloseIcon width={16} height={16} />
          </button>
        </div>
      )}
    </div>
  );
}
