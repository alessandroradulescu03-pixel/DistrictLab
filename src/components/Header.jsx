import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import { BagIcon, CloseIcon, MenuIcon } from './Icons.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useModal } from '../hooks/useModal.js';
import { fullAddress, site, telHref } from '../config/site.js';
import { pad2 } from '../utils/format.js';

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/categorie', label: 'Categorie' },
  { to: '/brand', label: 'Il brand' },
  { to: '/contatti', label: 'Contatti' }
];

export default function Header() {
  const { count, openCart } = useCart();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const wrapRef = useRef(null);
  const headerRef = useRef(null);
  const prevCount = useRef(count);
  const [menuTop, setMenuTop] = useState(0);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useModal(menuOpen, wrapRef, closeMenu);

  // Il menu mobile parte esattamente sotto la barra dell'header
  useEffect(() => {
    if (!menuOpen) return;
    const update = () => setMenuTop(Math.max(0, headerRef.current?.getBoundingClientRect().bottom || 0));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Piccolo "salto" del contatore quando aumenta
  useEffect(() => {
    if (count > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 450);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  const overlay = pathname === '/' && !scrolled && !menuOpen;

  return (
    // display: contents → il contenitore non influisce sul layout (l'header resta "sticky")
    <div ref={wrapRef} style={{ display: 'contents' }}>
    <header
      ref={headerRef}
      className={`header ${overlay ? 'header--overlay' : ''} ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu' : ''}`}
    >
      <div className="header__inner container">
        <button
          type="button"
          className="icon-btn header__menu-btn"
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Logo />

        <nav className="header__nav" aria-label="Navigazione principale">
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className="nav-link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="icon-btn header__cart"
          onClick={() => {
            setMenuOpen(false);
            openCart();
          }}
          aria-label={`Apri carrello, ${count} ${count === 1 ? 'articolo' : 'articoli'}`}
        >
          <BagIcon />
          <span className={`cart-count ${count ? 'is-filled' : ''} ${bump ? 'is-bump' : ''}`} aria-hidden="true">
            {count}
          </span>
        </button>
      </div>
    </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        style={{ top: menuTop }}
        hidden={!menuOpen}
      >
        <nav aria-label="Navigazione mobile">
          <ol className="mobile-menu__list">
            {NAV.map((item, i) => (
              <li key={item.to} style={{ '--i': i }}>
                <NavLink to={item.to} end={item.end} onClick={closeMenu}>
                  <span className="mono">{pad2(i + 1)}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mobile-menu__foot">
          <p>{fullAddress}</p>
          <a href={telHref}>{site.phone.display}</a>
          <Link to="/carrello" onClick={closeMenu} className="mobile-menu__cart">
            Carrello ({count})
          </Link>
        </div>
      </div>
    </div>
  );
}
