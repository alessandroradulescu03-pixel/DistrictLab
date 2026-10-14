/*
 * CATEGORIE DEL NEGOZIO
 * - id: usato negli indirizzi (es. #/shop?cat=sneakers) e nei prodotti
 * - name: nome visibile
 * - image: chiave di src/data/images.js
 */
export const categories = [
  {
    id: 'abbigliamento',
    name: 'Abbigliamento',
    tagline: 'Felpe, t-shirt, giacche',
    image: 'catAbbigliamento'
  },
  {
    id: 'sneakers',
    name: 'Sneakers',
    tagline: 'Silhouette da strada',
    image: 'catSneakers'
  },
  {
    id: 'accessori',
    name: 'Accessori',
    tagline: 'Cappelli, borse, dettagli',
    image: 'catAccessori'
  },
  {
    id: 'profumi',
    name: 'Profumi',
    tagline: 'Fragranze selezionate',
    image: 'catProfumi'
  }
];

export const getCategory = (id) => categories.find((c) => c.id === id);
