import { useEffect } from 'react';

// Imposta il titolo della scheda del browser per ogni pagina.
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — DISTRICT LAB` : 'DISTRICT LAB — Streetwear · Romano di Lombardia';
  }, [title]);
}
