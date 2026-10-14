import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Torna in cima a ogni cambio pagina (ma non quando cambiano solo i filtri dello shop).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
