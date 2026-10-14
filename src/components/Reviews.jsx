import { site } from '../config/site.js';
import { StarIcon } from './Icons.jsx';
import Reveal from './Reveal.jsx';

// Recensioni prese SOLO da src/config/site.js (nessuna recensione inventata).
export default function Reviews() {
  if (!site.showReviews || !site.reviews.length) return null;
  const { value, outOf, count } = site.rating;

  return (
    <section className="section reviews" aria-labelledby="reviews-title">
      <div className="container">
        <Reveal className="reviews__head">
          <p className="kicker">
            <span className="mono">04</span>Dicono di noi
          </p>
          <h2 id="reviews-title" className="display-md">
            {value}/{outOf}
          </h2>
          <div className="stars" aria-label={`Valutazione ${value} su ${outOf}`}>
            {Array.from({ length: outOf }).map((_, i) => (
              <StarIcon key={i} filled={i < Math.round(value)} width={18} height={18} />
            ))}
          </div>
          <p className="reviews__count">
            Media su {count} recensioni pubbliche
            {site.demoMode && <span className="note"> · dati riportati, da verificare</span>}
          </p>
        </Reveal>

        <ul className="reviews__list">
          {site.reviews.map((r, i) => (
            <Reveal as="li" key={r.author} className="review" delay={i * 90}>
              <blockquote>
                <p>“{r.text}”</p>
              </blockquote>
              <p className="review__author">— {r.author}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
