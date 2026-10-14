import { Link } from 'react-router-dom';
import { fullAddress, mapsDirectionsUrl, site, telHref } from '../config/site.js';
import { categories } from '../data/categories.js';
import { NAV } from './Header.jsx';
import SocialLinks from './SocialLinks.jsx';
import StoreHours from './StoreHours.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__brand" aria-hidden="true">
          DISTRICT<span>LAB</span>
        </div>

        <div className="footer__grid">
          <div className="footer__col">
            <h2 className="footer__title">Negozio</h2>
            <address>
              <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="u-link">
                {fullAddress}
              </a>
            </address>
            <p>
              <a href={telHref} className="u-link">
                Tel. {site.phone.display}
              </a>
            </p>
            <StoreHours />
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Navigazione</h2>
            <ul>
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/carrello">Carrello</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Shop</h2>
            <ul>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/shop?cat=${c.id}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Social</h2>
            <SocialLinks withLabels />
          </div>
        </div>

        <div className="footer__legal">
          <p>
            © {year} {site.name}
            {site.legal.companyName ? ` · ${site.legal.companyName}` : ' · Ragione sociale da inserire'}
            {site.legal.vatNumber ? ` · P.IVA ${site.legal.vatNumber}` : ' · P.IVA da inserire'}
          </p>
          <ul>
            <li>
              <Link to="/legale#privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/legale#cookie">Cookie</Link>
            </li>
            <li>
              <Link to="/legale#termini">Termini di vendita</Link>
            </li>
            <li>
              <Link to="/legale#crediti">Crediti foto</Link>
            </li>
          </ul>
        </div>
        {site.demoMode && (
          <p className="footer__demo">
            Sito dimostrativo: prodotti, prezzi e immagini sono esempi e non costituiscono un’offerta commerciale.
          </p>
        )}
      </div>
    </footer>
  );
}
