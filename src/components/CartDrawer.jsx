import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useModal } from '../hooks/useModal.js';
import { formatPrice } from '../utils/format.js';
import CartLine from './CartLine.jsx';
import { ArrowIcon, CloseIcon } from './Icons.jsx';

export default function CartDrawer() {
  const { isOpen, closeCart, items, count, subtotal } = useCart();
  const panelRef = useRef(null);
  useModal(isOpen, panelRef, closeCart);

  return (
    <div className={`drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen} inert={!isOpen ? true : undefined}>
      <div className="drawer__backdrop" onClick={closeCart} />
      <aside
        ref={panelRef}
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
      >
        <div className="drawer__head">
          <h2 id="drawer-title">
            Carrello <span className="mono">({count})</span>
          </h2>
          <button type="button" className="icon-btn" onClick={closeCart} aria-label="Chiudi carrello">
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer__empty">
            <p className="display-sm">Il carrello è vuoto.</p>
            <p>Parti dagli ultimi arrivi o esplora il catalogo.</p>
            <Link to="/shop" className="btn btn--dark" onClick={closeCart}>
              Vai allo shop <ArrowIcon width={18} height={18} />
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer__list">
              {items.map((item) => (
                <CartLine key={item.key} item={item} onNavigate={closeCart} compact />
              ))}
            </ul>
            <div className="drawer__foot">
              <div className="drawer__row">
                <span>Subtotale</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="drawer__note">Spedizione calcolata al checkout. Demo: nessun ordine reale.</p>
              <Link to="/checkout" className="btn btn--dark btn--block" onClick={closeCart}>
                Procedi al checkout <ArrowIcon width={18} height={18} />
              </Link>
              <Link to="/carrello" className="btn btn--ghost btn--block" onClick={closeCart}>
                Vedi carrello
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
