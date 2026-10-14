import { useEffect, useRef, useState } from 'react';

/*
 * Restituisce [ref, visibile]: "visibile" diventa true quando l'elemento
 * entra nello schermo. Con "riduci movimento" attivo nel sistema operativo
 * è subito true (nessuna animazione).
 */
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}
