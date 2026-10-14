import { useEffect } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/*
 * Comportamento accessibile per menu e pannelli:
 * - blocca lo scorrimento della pagina sotto
 * - Esc chiude
 * - il Tab resta dentro il pannello
 * - alla chiusura il focus torna dove era
 */
export function useModal(open, panelRef, onClose) {
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const panel = panelRef.current;
    const first = panel?.querySelector(FOCUSABLE);
    requestAnimationFrame(() => (first || panel)?.focus());

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const nodes = Array.from(panel.querySelectorAll(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      if (previous && previous.focus) previous.focus();
    };
  }, [open, panelRef, onClose]);
}
