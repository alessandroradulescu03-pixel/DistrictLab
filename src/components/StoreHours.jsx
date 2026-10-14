import { site, telHref } from '../config/site.js';

// Mostra gli orari se compilati in src/config/site.js, altrimenti invita a chiamare.
export default function StoreHours() {
  if (site.hours.length) {
    return (
      <dl className="hours">
        {site.hours.map((h) => (
          <div key={h.days} className="hours__row">
            <dt>{h.days}</dt>
            <dd>
              {/* più fasce orarie separate da "·" vanno su righe diverse */}
              {h.time.split('·').map((slot) => (
                <span key={slot}>{slot.trim()}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  return (
    <p className="hours hours--empty">
      Orari in aggiornamento:{' '}
      <a href={telHref} className="u-link">
        chiama prima di passare
      </a>
    </p>
  );
}
