import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SmartImage from '../components/SmartImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import QuantityControl from '../components/QuantityControl.jsx';
import { ArrowIcon, CheckIcon, InfoIcon } from '../components/Icons.jsx';
import { getProduct, getVariants, getPrice, hasVariablePrice, products } from '../data/products.js';
import { getCategory } from '../data/categories.js';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/format.js';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { fullAddress, site, telHref } from '../config/site.js';
import NotFound from './NotFound.jsx';

export default function Product() {
  const { id } = useParams();
  const product = getProduct(id);
  usePageTitle(product?.name || 'Prodotto non trovato');
  if (!product) return <NotFound title="Prodotto non trovato" text="Il prodotto che cerchi non è (più) in catalogo." />;
  // key: azzera lo stato quando si passa da un prodotto all'altro
  return <ProductView key={product.id} product={product} />;
}

function ProductView({ product }) {
  const { addItem, openCart } = useCart();
  const variants = getVariants(product);
  const needsVariant = variants.length > 0;
  const [variant, setVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | adding | added
  const [active, setActive] = useState(0);
  const optionsRef = useRef(null);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const cat = getCategory(product.category);
  const price = getPrice(product, variant);
  const optLabel = product.options?.label || 'Variante';
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category && p.featured))
    .slice(0, 4);

  function handleAdd() {
    if (needsVariant && !variant) {
      setError(`Seleziona ${optLabel.toLowerCase().startsWith('taglia') ? 'una taglia' : 'un formato'} per continuare.`);
      optionsRef.current?.querySelector('button')?.focus();
      return;
    }
    setError('');
    setStatus('adding');
    // Breve stato di caricamento: in un e-commerce reale qui avverrebbe la chiamata al server
    timer.current = setTimeout(() => {
      addItem(product.id, variant, qty);
      setStatus('added');
      timer.current = setTimeout(() => setStatus('idle'), 1800);
    }, 380);
  }

  return (
    <div className="page product">
      <nav className="breadcrumbs container" aria-label="Percorso">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to={`/shop?cat=${product.category}`}>{cat?.name}</Link>
          </li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="container product__grid">
        <div className="gallery">
          <div className="gallery__main">
            <SmartImage
              key={product.images[active]}
              name={product.images[active]}
              alt={`${product.name} — immagine ${active + 1} di ${product.images.length}`}
              sizes="(max-width: 900px) 100vw, 58vw"
              widths={[640, 1000, 1400]}
              priority
            />
            {product.isNew && <span className="tag">Nuovo</span>}
          </div>
          {product.images.length > 1 && (
            <div className="gallery__thumbs" role="group" aria-label="Immagini prodotto">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  className={`gallery__thumb ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Mostra immagine ${i + 1}`}
                  aria-pressed={i === active}
                >
                  <SmartImage name={img} alt="" sizes="120px" widths={[200, 320]} width={320} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="buybox">
          <p className="kicker">
            <span className="mono">{cat?.name}</span>
            {product.color}
          </p>
          <h1 className="display-lg buybox__title">{product.name}</h1>
          <p className="buybox__price">
            {!variant && hasVariablePrice(product) && <span className="product-card__from">da </span>}
            {formatPrice(price)}
            <span className="buybox__vat">IVA inclusa</span>
          </p>
          <p className="buybox__desc">{product.description}</p>

          {needsVariant && (
            <fieldset className={`options ${error ? 'has-error' : ''}`} aria-describedby={error ? 'opt-error' : undefined}>
              <legend>
                {optLabel}
                {variant && <span className="options__chosen">: {variant}</span>}
              </legend>
              <div className="options__list" ref={optionsRef}>
                {variants.map((v) => (
                  <button
                    key={v.value}
                    type="button"
                    className={`option ${variant === v.value ? 'is-active' : ''}`}
                    aria-pressed={variant === v.value}
                    onClick={() => {
                      setVariant(v.value);
                      setError('');
                    }}
                  >
                    {v.value}
                  </button>
                ))}
              </div>
              {error && (
                <p id="opt-error" className="field-error" role="alert">
                  {error}
                </p>
              )}
            </fieldset>
          )}
          {!needsVariant && <p className="options__single">Taglia unica</p>}

          <div className="buybox__row">
            <QuantityControl value={qty} onChange={setQty} />
            <button
              type="button"
              className={`btn btn--dark btn--lg btn--grow add-btn is-${status}`}
              onClick={handleAdd}
              disabled={status === 'adding'}
              aria-live="polite"
            >
              {status === 'idle' && (
                <>
                  Aggiungi al carrello · {formatPrice(price * qty)}
                </>
              )}
              {status === 'adding' && (
                <>
                  <span className="spinner" aria-hidden="true" /> Aggiunta in corso…
                </>
              )}
              {status === 'added' && (
                <>
                  <CheckIcon width={18} height={18} /> Aggiunto
                </>
              )}
            </button>
          </div>
          {status === 'added' && (
            <button type="button" className="arrow-link buybox__view" onClick={openCart}>
              Vedi il carrello <ArrowIcon width={18} height={18} />
            </button>
          )}

          <div className="accordion">
            <details open>
              <summary>Dettagli</summary>
              <ul className="ticks">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </details>
            <details>
              <summary>Ritiro in negozio</summary>
              <p>
                Puoi vedere e provare i capi da DISTRICT LAB, {fullAddress}. Per verificare la disponibilità chiama il{' '}
                <a href={telHref} className="u-link">
                  {site.phone.display}
                </a>
                .
              </p>
            </details>
            <details>
              <summary>Spedizioni e resi</summary>
              <p>Condizioni di spedizione, tempi di consegna e politica di reso sono da definire con il negozio.</p>
            </details>
          </div>

          {site.demoMode && (
            <p className="demo-note">
              <InfoIcon width={16} height={16} /> Prodotto dimostrativo: nome, prezzo e foto sono esempi.
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-title">
          <div className="container">
            <div className="section-head">
              <div className="section-head__left">
                <p className="kicker">
                  <span className="mono">+</span>Completa il look
                </p>
                <h2 id="related-title" className="display-md">
                  Potrebbe piacerti
                </h2>
              </div>
            </div>
            <div className="product-grid product-grid--4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
