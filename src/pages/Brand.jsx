import { Link } from 'react-router-dom';
import SmartImage from '../components/SmartImage.jsx';
import Reveal from '../components/Reveal.jsx';
import { ArrowIcon } from '../components/Icons.jsx';
import { brandDescription, principles } from '../config/content.js';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { site } from '../config/site.js';

export default function Brand() {
  usePageTitle('Il brand');
  const [opening, ...body] = brandDescription;
  const closing = body.pop();

  return (
    <div className="page brand">
      <header className="brand-hero container">
        <p className="kicker">
          <span className="mono">Il brand</span>Romano di Lombardia
        </p>
        <h1 className="brand-hero__title">
          Linguaggio,
          <br />
          <em>non moda.</em>
        </h1>
      </header>

      <section className="container brand-intro">
        <Reveal className="brand-intro__media brand-intro__media--a">
          <SmartImage name="street" sizes="(max-width: 760px) 100vw, 40vw" />
        </Reveal>
        <Reveal className="brand-intro__text" delay={100}>
          <p className="display-sm brand-intro__opening">{opening}</p>
          {body.map((p) => (
            <p key={p} className="lead">
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal className="brand-intro__media brand-intro__media--b" delay={160}>
          <SmartImage name="portrait" sizes="(max-width: 760px) 60vw, 25vw" />
        </Reveal>
      </section>

      <section className="principles" aria-label="I nostri principi">
        <div className="container principles__grid">
          {principles.map((p, i) => (
            <Reveal key={p.n} className="principle" delay={i * 100}>
              <span className="mono">{p.n}</span>
              <h2 className="display-md">{p.title}</h2>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="brand-statement">
        <SmartImage name="storeWall" className="brand-statement__bg" sizes="100vw" widths={[800, 1400, 2000]} width={1600} />
        <div className="brand-statement__shade" aria-hidden="true" />
        <Reveal className="container brand-statement__inner">
          <p className="brand-statement__text">{closing}</p>
          <Link to="/shop" className="btn btn--light btn--lg">
            Scopri la collezione <ArrowIcon width={18} height={18} />
          </Link>
        </Reveal>
        {site.demoMode && <span className="img-note">Immagini dimostrative</span>}
      </section>

      <section className="section container brand-visit">
        <Reveal className="brand-visit__inner">
          <h2 className="display-md">Uomini che non seguono le tendenze, ma le definiscono.</h2>
          <Link to="/contatti" className="arrow-link">
            Vieni in negozio <ArrowIcon width={18} height={18} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
