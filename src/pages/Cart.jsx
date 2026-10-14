import { Link } from 'react-router-dom';
import CartLine from '../components/CartLine.jsx';
import { ArrowIcon } from '../components/Icons.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/format.js';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function Cart() {
  usePageTitle('Carrello');
  const { items, count, subtotal, clear } = useCart();

  return (
    <div className="page cart-page">
      <header className="page-head container">
        <p className="kicker">
          <span className="mono">{String(count).padStart(2, '0')}</span>
          {count === 1 ? 'articolo' : 'articoli'}
        </p>
        <h1 className="display-xl">Carrello</h1>
      </header>

      <div className="container">
        {items.length === 0 ? (
          <div className="empty-state">
            <p className="display-md">Il carrello è vuoto.</p>
            <p>Non hai ancora aggiunto nessun prodotto.</p>
            <Link to="/shop" className="btn btn--dark">
              Vai allo shop <ArrowIcon width={18} height={18} />
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <section aria-label="Prodotti nel carrello">
              <ul className="cart-list">
                {items.map((item) => (
                  <CartLine key={item.key} item={item} />
                ))}
              </ul>
              <div className="cart-list__foot">
                <Link to="/shop" className="arrow-link">
                  Continua lo shopping <ArrowIcon width={18} height={18} />
                </Link>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    if (window.confirm('Vuoi svuotare il carrello?')) clear();
                  }}
                >
                  Svuota carrello
                </button>
              </div>
            </section>

            <aside className="summary" aria-labelledby="summary-title">
              <h2 id="summary-title" className="summary__title">
                Riepilogo
              </h2>
              <dl>
                <div className="summary__row">
                  <dt>Subtotale ({count})</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="summary__row">
                  <dt>Spedizione</dt>
                  <dd>Da definire</dd>
                </div>
                <div className="summary__row summary__row--total">
                  <dt>Totale provvisorio</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
              </dl>
              <Link to="/checkout" className="btn btn--dark btn--block btn--lg">
                Procedi al checkout <ArrowIcon width={18} height={18} />
              </Link>
              <p className="summary__note">
                Checkout dimostrativo: non vengono creati ordini né richiesti pagamenti.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
