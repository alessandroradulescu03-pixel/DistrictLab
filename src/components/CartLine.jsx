import { Link } from 'react-router-dom';
import SmartImage from './SmartImage.jsx';
import QuantityControl from './QuantityControl.jsx';
import { formatPrice } from '../utils/format.js';
import { useCart } from '../context/CartContext.jsx';

export default function CartLine({ item, onNavigate, compact = false }) {
  const { setQty, removeItem } = useCart();
  const { product } = item;
  const optLabel = product.options?.label;

  return (
    <li className={`cart-line ${compact ? 'cart-line--compact' : ''}`}>
      <Link to={`/prodotto/${product.id}`} className="cart-line__img" onClick={onNavigate} tabIndex={-1} aria-hidden="true">
        <SmartImage name={product.images[0]} alt="" sizes="120px" widths={[200, 320]} width={320} />
      </Link>
      <div className="cart-line__body">
        <div className="cart-line__top">
          <Link to={`/prodotto/${product.id}`} className="cart-line__name" onClick={onNavigate}>
            {product.name}
          </Link>
          <span className="cart-line__total">{formatPrice(item.total)}</span>
        </div>
        <p className="cart-line__meta">
          {item.variant ? `${optLabel}: ${item.variant}` : product.color}
          {item.qty > 1 && <> · {formatPrice(item.unitPrice)} cad.</>}
        </p>
        <div className="cart-line__actions">
          <QuantityControl
            size="sm"
            value={item.qty}
            onChange={(q) => setQty(item.key, q)}
            label={`Quantità ${product.name}`}
          />
          <button type="button" className="link-btn" onClick={() => removeItem(item.key)}>
            Rimuovi<span className="sr-only"> {product.name}</span>
          </button>
        </div>
      </div>
    </li>
  );
}
