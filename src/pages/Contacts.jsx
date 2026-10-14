import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import StoreHours from '../components/StoreHours.jsx';
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from '../components/Icons.jsx';
import { fullAddress, mapsDirectionsUrl, mapsEmbedUrl, mapsSearchUrl, site, telHref } from '../config/site.js';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function Contacts() {
  usePageTitle('Contatti');
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="page contacts">
      <header className="page-head container">
        <p className="kicker">
          <span className="mono">Contatti</span>Negozio fisico
        </p>
        <h1 className="display-xl">Passa a trovarci</h1>
        <p className="page-head__lead">
          Lo streetwear si sceglie guardandolo da vicino. Vieni in negozio a Romano di Lombardia: ti aiutiamo a trovare
          il capo e l’outfit giusto.
        </p>
      </header>

      <div className="container contacts__grid">
        <Reveal className="contact-card">
          <h2 className="contact-card__name">{site.name}</h2>
          <ul className="contact-card__list">
            <li>
              <PinIcon />
              <div>
                <span className="label">Indirizzo</span>
                <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="u-link">
                  {fullAddress}
                </a>
              </div>
            </li>
            <li>
              <PhoneIcon />
              <div>
                <span className="label">Telefono</span>
                <a href={telHref} className="u-link">
                  {site.phone.display}
                </a>
              </div>
            </li>
            <li>
              <ClockIcon />
              <div>
                <span className="label">Orari</span>
                <StoreHours />
              </div>
            </li>
          </ul>
          <div className="btn-row">
            <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--dark">
              Indicazioni stradali <ArrowIcon width={18} height={18} />
            </a>
            <a href={telHref} className="btn btn--ghost">
              Chiama ora
            </a>
          </div>
          <div className="contact-card__social">
            <span className="label">Seguici</span>
            <SocialLinks withLabels />
          </div>
        </Reveal>

        <Reveal className="map-box" delay={120}>
          {showMap ? (
            <iframe
              title={`Mappa: ${fullAddress}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="map-box__placeholder">
              <PinIcon width={36} height={36} />
              <p className="display-sm">{site.address.city}</p>
              <p>{site.address.street}</p>
              <button type="button" className="btn btn--dark" onClick={() => setShowMap(true)}>
                Carica la mappa
              </button>
              <small>La mappa è fornita da Google e viene caricata solo se la richiedi.</small>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  );
}
