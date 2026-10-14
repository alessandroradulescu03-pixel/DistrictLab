import { site } from '../config/site.js';

// Barra sottile che ricorda che si tratta di una demo (disattivabile da site.demoMode).
export default function DemoBanner() {
  if (!site.demoMode) return null;
  return (
    <div className="demo-banner">
      <span className="mono">DEMO</span> Anteprima del sito: prodotti e prezzi sono dimostrativi, nessun ordine reale.
    </div>
  );
}
