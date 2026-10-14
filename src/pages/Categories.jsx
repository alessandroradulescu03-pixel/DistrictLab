import { Link } from 'react-router-dom';
import SmartImage from '../components/SmartImage.jsx';
import Reveal from '../components/Reveal.jsx';
import { ArrowIcon } from '../components/Icons.jsx';
import { categories } from '../data/categories.js';
import { products } from '../data/products.js';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function Categories() {
  usePageTitle('Categorie');
  return (
    <div className="page">
      <header className="page-head container">
        <p className="kicker">
          <span className="mono">{String(categories.length).padStart(2, '0')}</span>Reparti
        </p>
        <h1 className="display-xl">Categorie</h1>
      </header>
      <div className="container cat-list">
        {categories.map((c, i) => {
          const n = products.filter((p) => p.category === c.id).length;
          return (
            <Reveal key={c.id} className="cat-row">
              <Link to={`/shop?cat=${c.id}`}>
                <span className="cat-row__num mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="cat-row__name">{c.name}</span>
                <span className="cat-row__meta">
                  {c.tagline} · {n} {n === 1 ? 'prodotto' : 'prodotti'}
                </span>
                <span className="cat-row__img">
                  <SmartImage name={c.image} alt="" sizes="(max-width: 760px) 100vw, 30vw" widths={[480, 800]} width={800} />
                </span>
                <ArrowIcon className="cat-row__arrow" />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
