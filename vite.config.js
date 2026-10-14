import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/*
 * PERCORSO BASE (base)
 * --------------------
 * GitHub Pages pubblica il sito in un sottopercorso:
 *   https://TUO-UTENTE.github.io/NOME-REPOSITORY/
 *
 * - Durante la pubblicazione automatica (GitHub Actions) il workflow imposta
 *   da solo la variabile BASE_PATH con il nome reale del repository
 *   (vedi .github/workflows/deploy.yml): non devi scriverlo a mano.
 * - Se vuoi forzare un valore, sostituisci la riga sotto, ad esempio:
 *     const base = '/DistrictLab/';
 * - In sviluppo locale (npm run dev) il valore è './', che funziona ovunque.
 *
 * Il sito usa il routing "con #" (es. .../#/shop), quindi funziona su
 * GitHub Pages anche ricaricando qualsiasi pagina, senza configurazioni extra.
 */
const base = process.env.BASE_PATH || './';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 700
  }
});
