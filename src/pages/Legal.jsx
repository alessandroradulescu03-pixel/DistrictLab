import { images } from '../data/images.js';
import { site } from '../config/site.js';
import { usePageTitle } from '../hooks/usePageTitle.js';

// Pagina segnaposto per le informazioni legali: i testi vanno redatti da un professionista.
export default function Legal() {
  usePageTitle('Informazioni legali');
  const credits = Array.from(new Map(Object.values(images).filter((i) => i.credit).map((i) => [i.credit, i])).keys());

  return (
    <div className="page legal">
      <header className="page-head container">
        <p className="kicker">
          <span className="mono">Legale</span>Da completare
        </p>
        <h1 className="display-xl">Informazioni legali</h1>
        <p className="page-head__note">
          Sezione segnaposto. Privacy policy, cookie policy e condizioni di vendita devono essere redatte o verificate da
          un professionista prima della pubblicazione del negozio online.
        </p>
      </header>
      <div className="container legal__body">
        <section id="privacy">
          <h2>Privacy policy</h2>
          <p>Da redigere: titolare del trattamento, dati raccolti, finalità, base giuridica, conservazione, diritti dell’interessato.</p>
        </section>
        <section id="cookie">
          <h2>Cookie policy</h2>
          <p>
            Questa demo non usa cookie di profilazione né strumenti di analisi. Salva solo il contenuto del carrello nella
            memoria del tuo browser (localStorage), che puoi cancellare in qualsiasi momento. La pagina Contatti
            include una mappa di Google Maps, soggetta all’informativa privacy di Google.
          </p>
        </section>
        <section id="termini">
          <h2>Termini e condizioni di vendita</h2>
          <p>Da redigere: dati del venditore, prezzi, pagamenti, spedizioni, diritto di recesso, garanzia legale, resi.</p>
          <p>
            Venditore: {site.legal.companyName || '[ragione sociale]'} — P.IVA {site.legal.vatNumber || '[da inserire]'}
          </p>
        </section>
        <section id="crediti">
          <h2>Crediti fotografici</h2>
          <p>
            Le fotografie di questa demo provengono da <a className="u-link" href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>{' '}
            (licenza Unsplash) e sono puramente dimostrative: non ritraggono il negozio, i suoi titolari o i suoi prodotti.
            Fotografi: {credits.join(', ')}.
          </p>
        </section>
      </div>
    </div>
  );
}
