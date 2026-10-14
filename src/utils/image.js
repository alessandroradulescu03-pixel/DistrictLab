import { images } from '../data/images.js';

const BASE = import.meta.env.BASE_URL;

// Restituisce l'URL di un'immagine alla larghezza richiesta.
export function imageUrl(src, width = 1200) {
  if (!src) return '';
  if (src.type === 'local') return `${BASE}images/${src.file}`;
  if (src.type === 'unsplash') {
    return `https://images.unsplash.com/${src.id}?auto=format&fit=crop&w=${width}&q=72`;
  }
  return '';
}

export function imageSrcSet(src, widths) {
  if (!src || src.type !== 'unsplash') return undefined;
  return widths.map((w) => `${imageUrl(src, w)} ${w}w`).join(', ');
}

export const getImage = (key) => images[key] || null;
