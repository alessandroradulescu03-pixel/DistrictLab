import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon, CheckIcon, InfoIcon } from '../components/Icons.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/format.js';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { fullAddress } from '../config/site.js';

/*
 * CHECKOUT DIMOSTRATIVO
 * Non invia dati a nessun server, non crea ordini e NON raccoglie dati
 * di pagamento. I dati inseriti restano solo nella pagina e vengono
 * cancellati all'uscita. Vedi README → "Rendere il checkout reale".
 */

const EMPTY = { name: '', email: '', phone: '', address: '', zip: '', city: '', notes: '' };

function validate(values, delivery) {
  const e = {};
  if (values.name.trim().length < 2) e.name = 'Inserisci nome e cognome.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) e.email = 'Inserisci un indirizzo email valido.';
  if (values.phone.trim() && !/^[+\d][\d\s]{5,}$/.test(values.phone.trim())) e.phone = 'Numero non valido.';
  if (delivery === 'shipping') {
    if (values.address.trim().length < 4) e.address = 'Inserisci l’indirizzo.';
    if (!/^\d{5}$/.test(values.zip.trim())) e.zip = 'CAP di 5 cifre.';
    if (values.city.trim().length < 2) e.city = 'Inserisci la città.';
  }
  return e;
}

export default function Checkout() {
  usePageTitle('Checkout');
  const { items, subtotal, count } = useCart();
  const [values, setValues] = useState(EMPTY);
  const [delivery, setDelivery] = useState('pickup');
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('form'); // form | sending | done

  if (step === 'done') {
    return (
      <div className="page checkout">
        <div className="container checkout-done">
          <span className="checkout-done__icon">
            <CheckIcon width={28} height={28} />
          </span>
          <p className="kicker">
            <span className="mono">DEMO</span>Simulazione completata
          </p>
          <h1 className="display-lg">Fine della demo.</h1>
          <p className="lead">
            Questo è il punto in cui, nel negozio online definitivo, il cliente pagherebbe in modo sicuro e riceverebbe
            la conferma d’ordine via email.
          </p>
          <p className="checkout-done__warn">
            <strong>Nessun ordine è stato creato, nessun pagamento è stato effettuato e nessun dato è stato inviato.</strong>
          </p>
          <div className="btn-row btn-row--center">
            <Link to="/carrello" className="btn btn--dark">
              Torna al carrello
            </Link>
            <Link to="/shop" className="btn btn--ghost">
              Continua a esplorare
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page checkout">
        <div className="container empty-state">
          <p className="display-md">Nessun prodotto da ordinare.</p>
          <p>Aggiungi qualcosa al carrello per provare il checkout dimostrativo.</p>
          <Link to="/shop" className="btn btn--dark">
            Vai allo shop <ArrowIcon width={18} height={18} />
          </Link>
        </div>
      </div>
    );
  }

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function submit(e) {
    e.preventDefault();
    const found = validate(values, delivery);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      document.getElementById(`f-${firstKey}`)?.focus();
      return;
    }
    setStep('sending');
    // Nessuna richiesta di rete: solo un breve stato di attesa per mostrare il flusso
    setTimeout(() => {
      setStep('done');
      window.scrollTo(0, 0);
    }, 900);
  }

  const field = (k, label, props = {}) => (
    <div className={`field ${errors[k] ? 'has-error' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <input
        id={`f-${k}`}
        value={values[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        {...props}
      />
      {errors[k] && (
        <p id={`e-${k}`} className="field-error">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <div className="page checkout">
      <header className="page-head container">
        <p className="kicker">
          <span className="mono">Demo</span>Checkout dimostrativo
        </p>
        <h1 className="display-xl">Checkout</h1>
      </header>

      <div className="container">
        <div className="demo-alert" role="note">
          <InfoIcon />
          <div>
            <strong>Questa è una demo.</strong> Il modulo serve solo a mostrare come funzionerebbe l’acquisto: non crea
            ordini reali, non invia dati e non richiede alcun pagamento. Puoi usare dati di prova.
          </div>
        </div>

        <form className="checkout-layout" onSubmit={submit} noValidate>
          <div className="checkout-form">
            <fieldset className="form-block">
              <legend>
                <span className="mono">01</span> Contatti
              </legend>
              {field('name', 'Nome e cognome', { autoComplete: 'name' })}
              <div className="field-row">
                {field('email', 'Email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
                {field('phone', 'Telefono (facoltativo)', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
              </div>
            </fieldset>

            <fieldset className="form-block">
              <legend>
                <span className="mono">02</span> Consegna
              </legend>
              <div className="radio-cards">
                <label className={`radio-card ${delivery === 'pickup' ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={delivery === 'pickup'}
                    onChange={() => setDelivery('pickup')}
                  />
                  <span>
                    <strong>Ritiro in negozio</strong>
                    <small>{fullAddress}</small>
                  </span>
                </label>
                <label className={`radio-card ${delivery === 'shipping' ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="shipping"
                    checked={delivery === 'shipping'}
                    onChange={() => setDelivery('shipping')}
                  />
                  <span>
                    <strong>Spedizione</strong>
                    <small>Corriere e costi da definire</small>
                  </span>
                </label>
              </div>
              {delivery === 'shipping' && (
                <div className="shipping-fields">
                  {field('address', 'Indirizzo e numero civico', { autoComplete: 'street-address' })}
                  <div className="field-row field-row--zip">
                    {field('zip', 'CAP', { autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 5 })}
                    {field('city', 'Città', { autoComplete: 'address-level2' })}
                  </div>
                </div>
              )}
              <div className="field">
                <label htmlFor="f-notes">Note (facoltative)</label>
                <textarea id="f-notes" rows={3} value={values.notes} onChange={set('notes')} />
              </div>
            </fieldset>

            <fieldset className="form-block">
              <legend>
                <span className="mono">03</span> Pagamento
              </legend>
              <div className="payment-off">
                <p>
                  <strong>Pagamento non attivo nella demo.</strong>
                </p>
                <p>
                  Nel sito definitivo il pagamento avverrà su una pagina sicura del fornitore scelto (es. carta, PayPal,
                  Apple Pay). Questo sito non chiede né memorizza dati di carte.
                </p>
              </div>
            </fieldset>
          </div>

          <aside className="summary checkout-summary" aria-labelledby="co-summary">
            <h2 id="co-summary" className="summary__title">
              Il tuo ordine ({count})
            </h2>
            <ul className="mini-lines">
              {items.map((i) => (
                <li key={i.key}>
                  <div className="mini-lines__img">
                    <SmartImage name={i.product.images[0]} alt="" sizes="64px" widths={[160]} width={160} />
                    <span className="mini-lines__qty">{i.qty}</span>
                  </div>
                  <div>
                    <p className="mini-lines__name">{i.product.name}</p>
                    {i.variant && <p className="mini-lines__meta">{i.variant}</p>}
                  </div>
                  <span>{formatPrice(i.total)}</span>
                </li>
              ))}
            </ul>
            <dl>
              <div className="summary__row">
                <dt>Subtotale</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="summary__row">
                <dt>{delivery === 'pickup' ? 'Ritiro in negozio' : 'Spedizione'}</dt>
                <dd>{delivery === 'pickup' ? 'Da confermare' : 'Da definire'}</dd>
              </div>
              <div className="summary__row summary__row--total">
                <dt>Totale (demo)</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <button type="submit" className="btn btn--dark btn--block btn--lg" disabled={step === 'sending'}>
              {step === 'sending' ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Simulazione…
                </>
              ) : (
                'Simula invio ordine (demo)'
              )}
            </button>
            <p className="summary__note">Nessun addebito. Nessun dato inviato.</p>
          </aside>
        </form>
      </div>
    </div>
  );
}
