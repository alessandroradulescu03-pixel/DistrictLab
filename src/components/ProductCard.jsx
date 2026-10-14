import { Link } from 'react-router-dom';
import SmartImage from './SmartImage.jsx';
import { formatPrice } from '../utils/format.js';
import { getMinPrice, hasVariablePrice } from '../data/products.js';
import { getCategory } from '../data/categories.js';

export default function ProductCard({ product, index, sizes = '(max-width: 760px) 50vw, 25vw' }) {
  const cat = getCategory(product.category);
  const from = hasVariablePrice(product);
  return (
    <article className="product-card">
      <Link to={`/prodotto/${product.id}`} className="product-card__link">
        <div className="product-card__media">
          <SmartImage name={product.images[0]} alt={product.name} sizes={sizes} widths={[400, 640, 900]} width={800} />
          {product.images[1] && (
            <SmartImage
              name={product.images[1]}
              alt=""
              className="product-card__alt"
              sizes={sizes}
              widths={[400, 640, 900]}
              width={800}
            />
          )}
          {product.isNew && <span className="tag">Nuovo</span>}
          {typeof index === 'number' && <span className="product-card__index mono">{String(index + 1).padStart(3, '0')}</span>}
        </div>
        <div className="product-card__info">
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__price">
            {from && <span className="product-card__from">da </span>}
            {formatPrice(getMinPrice(product))}
          </p>
          <p className="product-card__meta">
            {cat?.name} · {product.color}
          </p>
        </div>
      </Link>
    </article>
  );
}
