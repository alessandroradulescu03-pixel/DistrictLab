import { Link } from 'react-router-dom';
import SmartImage from '../components/SmartImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionHead from '../components/SectionHead.jsx';
import Reveal from '../components/Reveal.jsx';
import Reviews from '../components/Reviews.jsx';
import StoreHours from '../components/StoreHours.jsx';
import { ArrowIcon, PhoneIcon, PinIcon } from '../components/Icons.jsx';
import { products } from '../data/products.js';
import { categories } from '../data/categories.js';
import { home } from '../config/content.js';
import { fullAddress, mapsDirectionsUrl, site, telHref } from '../config/site.js';
import { formatPrice } from '../utils/format.js';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function Home() {
  usePageTitle();
  const newArrivals = products
    .filter((p) => p.isNew)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, 8);
  const featured = products.filter((p) => p.featured);
  const [lead, ...rest] = featured;

  return (
    <>
      {/* 1 — HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <SmartImage name="hero" className="hero__img" sizes="100vw" widths={[640, 1024, 1600, 2200]} width={1600} priority />
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__content container">
          <p className="kicker kicker--light hero__kicker">{home.heroKicker}</p>
          <h1 id="hero-title" className="hero__title">
            {home.heroTitle.map((line, i) => (
              <span key={line} className="hero__line" style={{ '--i': i }}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <div className="hero__bottom">
            <p className="hero__text">{home.heroText}</p>
            <Link to="/shop" className="btn btn--light btn--lg">
              {home.heroCta} <ArrowIcon width={18} height={18} />
            </Link>
          </div>
        </div>
        <div className="hero__coords mono" aria-hidden="true">
          45.52°N · 9.75°E — Romano di Lombardia
        </div>
      </section>

      {/* Nastro di parole chiave */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...home.marquee, ...home.marquee].map((w, i) => (
            <span key={i}>
              {w}
              <i>✕</i>
            </span>
          ))}
        </div>
      </div>

      {/* 2 — ULTIMI ARRIVI */}
      <section className="section" aria-labelledby="new-title">
        <div className="container">
          <SectionHead
            index="01"
            kicker="Ultimi arrivi"
            title={<span id="new-title">New in</span>}
            text="Gli ultimi pezzi entrati in selezione."
            link={{ to: '/shop?sort=new', label: 'Vedi tutti' }}
          />
          <div className="rail" role="list">
            {newArrivals.map((p, i) => (
              <Reveal key={p.id} className="rail__item" role="listitem" delay={(i % 4) * 70}>
                <ProductCard product={p} index={i} sizes="(max-width: 760px) 70vw, 25vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — CATEGORIE */}
      <section className="section section--tight" aria-labelledby="cat-title">
        <div className="container">
          <SectionHead index="02" kicker="Categorie" title={<span id="cat-title">Cosa cerchi</span>} />
          <div className="cat-grid">
            {categories.map((c, i) => (
              <Reveal key={c.id} className={`cat-tile cat-tile--${i}`} delay={i * 80}>
                <Link to={`/shop?cat=${c.id}`}>
                  <SmartImage name={c.image} alt="" sizes="(max-width: 760px) 100vw, 50vw" widths={[480, 800, 1200]} width={1000} />
                  <span className="cat-tile__label">
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="cat-tile__name">{c.name}</span>
                    <span className="cat-tile__tag">{c.tagline}</span>
                  </span>
                  <ArrowIcon className="cat-tile__arrow" width={22} height={22} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — MANIFESTO */}
      <section className="manifesto" aria-labelledby="manifesto-title">
        <div className="container manifesto__grid">
          <Reveal className="manifesto__media">
            <SmartImage name="manifesto" sizes="(max-width: 760px) 100vw, 45vw" />
          </Reveal>
          <Reveal className="manifesto__text" delay={120}>
            <p className="kicker kicker--light">{home.manifestoKicker}</p>
            <h2 id="manifesto-title" className="display-lg">
              {home.manifestoTitle}
            </h2>
            <p className="lead">{home.manifestoText}</p>
            <p className="manifesto__quote">“Lo streetwear come linguaggio, non come moda.”</p>
            <Link to="/brand" className="btn btn--outline-light">
              Il brand <ArrowIcon width={18} height={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 5 — LA SELEZIONE */}
      {lead && (
        <section className="section" aria-labelledby="sel-title">
          <div className="container">
            <SectionHead
              index="03"
              kicker="In evidenza"
              title={<span id="sel-title">{home.selectionTitle}</span>}
              text={home.selectionText}
              link={{ to: '/shop', label: 'Tutto lo shop' }}
            />
            <div className="selection">
              <Reveal className="selection__lead">
                <Link to={`/prodotto/${lead.id}`} className="selection__lead-link">
                  <SmartImage name={lead.images[0]} alt={lead.name} sizes="(max-width: 760px) 100vw, 55vw" />
                  <span className="selection__lead-info">
                    <span className="mono">Focus</span>
                    <span className="selection__lead-name">{lead.name}</span>
                    <span>{formatPrice(lead.price)}</span>
                  </span>
                </Link>
              </Reveal>
              <div className="selection__grid">
                {rest.slice(0, 4).map((p, i) => (
                  <Reveal key={p.id} delay={i * 80}>
                    <ProductCard product={p} sizes="(max-width: 760px) 50vw, 20vw" />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6 — RECENSIONI */}
      <Reviews />

      {/* 7 — NEGOZIO FISICO */}
      <section className="store" aria-labelledby="store-title">
        <div className="store__media">
          <SmartImage name="storeRacks" sizes="(max-width: 760px) 100vw, 50vw" />
          {site.demoMode && <span className="img-note">Immagine dimostrativa</span>}
        </div>
        <Reveal className="store__body">
          <p className="kicker">
            <span className="mono">05</span>Il negozio
          </p>
          <h2 id="store-title" className="display-lg">
            {home.storeTitle}
          </h2>
          <p className="lead">{home.storeText}</p>
          <ul className="store__info">
            <li>
              <PinIcon />
              <span>{fullAddress}</span>
            </li>
            <li>
              <PhoneIcon />
              <a href={telHref} className="u-link">
                {site.phone.display}
              </a>
            </li>
          </ul>
          <StoreHours />
          <div className="btn-row">
            <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--dark">
              Indicazioni stradali <ArrowIcon width={18} height={18} />
            </a>
            <a href={telHref} className="btn btn--ghost">
              Chiama
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
