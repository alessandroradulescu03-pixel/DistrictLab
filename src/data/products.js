/*
 * ============================================================
 *  CATALOGO PRODOTTI — DATI DIMOSTRATIVI
 * ============================================================
 * Nomi, prezzi, descrizioni, taglie e foto qui sotto sono INVENTATI
 * a scopo dimostrativo. Non rappresentano articoli, prezzi, marchi
 * o disponibilità reali di DISTRICT LAB e vanno sostituiti/approvati
 * prima della messa online.
 *
 * CAMPI DI OGNI PRODOTTO
 *  id          identificativo unico, usato nell'indirizzo (#/prodotto/id).
 *              Solo lettere minuscole, numeri e trattini.
 *  name        nome visibile
 *  category    id di una categoria (vedi categories.js)
 *  price       prezzo in euro (numero, es. 89 oppure 89.90)
 *  images      chiavi di src/data/images.js (la prima è la principale)
 *  color       colore indicativo (testo)
 *  description descrizione
 *  details     elenco puntato di caratteristiche
 *  options     varianti selezionabili, oppure null se non servono:
 *                { label: 'Taglia', values: ['S','M','L'] }
 *              per variare il prezzo di una variante:
 *                { label: 'Formato', values: [{ value: '50 ml', price: 79 }, ...] }
 *  isNew       true = compare in "Ultimi arrivi"
 *  featured    true = compare in "La selezione"
 *  addedAt     data di inserimento (AAAA-MM-GG) usata per "ordina per novità"
 * ============================================================
 */

const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const SNEAKER_SIZES = ['39', '40', '41', '42', '43', '44', '45', '46'];

export const products = [
  {
    id: 'heavyweight-hoodie-grigia',
    name: 'Heavyweight Hoodie',
    category: 'abbigliamento',
    price: 89,
    images: ['hoodieGrey1', 'hoodieGrey2'],
    color: 'Grigio mélange',
    description:
      'Felpa con cappuccio dal peso importante e dalla vestibilità rilassata. Una base solida per ogni outfit, pensata per durare stagione dopo stagione.',
    details: ['Cotone felpato garzato', 'Fit regular-oversize', 'Tasca a marsupio', 'Polsini e fondo a costine'],
    options: { label: 'Taglia', values: CLOTHING_SIZES },
    isNew: true,
    featured: true,
    addedAt: '2026-10-08'
  },
  {
    id: 'oversize-hoodie-nera',
    name: 'Oversize Hoodie Noir',
    category: 'abbigliamento',
    price: 95,
    images: ['hoodieBlack1', 'hoodieBlack2'],
    color: 'Nero',
    description:
      'Volumi ampi, spalla scesa e cappuccio strutturato. Il nero totale che funziona di giorno in città e di sera fuori.',
    details: ['Cotone pesante', 'Fit oversize', 'Spalla scesa', 'Cappuccio doppio strato'],
    options: { label: 'Taglia', values: CLOTHING_SIZES },
    isNew: true,
    featured: false,
    addedAt: '2026-10-10'
  },
  {
    id: 'hoodie-off-white',
    name: 'Essential Hoodie Off-White',
    category: 'abbigliamento',
    price: 89,
    images: ['hoodieWhite1', 'hoodieWhite2'],
    color: 'Off-white',
    description:
      'Il colore più difficile da indossare, il più facile da abbinare. Linee pulite e mano morbida.',
    details: ['Cotone felpato', 'Fit regular', 'Coulisse piatta', 'Lavaggio a 30°'],
    options: { label: 'Taglia', values: CLOTHING_SIZES },
    isNew: false,
    featured: false,
    addedAt: '2026-09-20'
  },
  {
    id: 'hoodie-earth',
    name: 'Hoodie Earth Tone',
    category: 'abbigliamento',
    price: 92,
    images: ['hoodieBrown1', 'hoodieBrown2'],
    color: 'Marrone',
    description:
      'Toni terrosi per uscire dal solito nero-grigio. Da abbinare a denim chiaro o cargo neutri.',
    details: ['Cotone felpato', 'Fit relaxed', 'Tasca a marsupio', 'Costine a contrasto tono su tono'],
    options: { label: 'Taglia', values: CLOTHING_SIZES },
    isNew: false,
    featured: true,
    addedAt: '2026-09-12'
  },
  {
    id: 'boxy-tee-marrone',
    name: 'Boxy Tee',
    category: 'abbigliamento',
    price: 45,
    images: ['teeBrown'],
    color: 'Marrone',
    description:
      'T-shirt dal taglio squadrato e corto in vita, collo a costina alto. Il pezzo da stratificare sotto giacche e camicie aperte.',
    details: ['Jersey di cotone pesante', 'Fit boxy', 'Collo a costina', 'Spalla scesa'],
    options: { label: 'Taglia', values: CLOTHING_SIZES },
    isNew: true,
    featured: false,
    addedAt: '2026-10-05'
  },
  {
    id: 'polo-essential-bianca',
    name: 'Polo Essential',
    category: 'abbigliamento',
    price: 55,
    images: ['poloWhite'],
    color: 'Bianco',
    description:
      'La polo rivista in chiave street: tessuto compatto, vestibilità morbida, nessun dettaglio superfluo.',
    details: ['Piquet di cotone', 'Fit regular', 'Tre bottoni', 'Spacchetti laterali'],
    options: { label: 'Taglia', values: CLOTHING_SIZES },
    isNew: false,
    featured: false,
    addedAt: '2026-08-30'
  },
  {
    id: 'utility-jacket-nera',
    name: 'Utility Jacket',
    category: 'abbigliamento',
    price: 159,
    images: ['jacketBlack1', 'jacketBlack2'],
    color: 'Nero',
    description:
      'Giacca leggera dalle linee tecniche, pensata per le mezze stagioni. Tasche funzionali e silhouette asciutta.',
    details: ['Tessuto tecnico idrorepellente', 'Zip frontale', 'Tasche applicate', 'Fit regular'],
    options: { label: 'Taglia', values: ['S', 'M', 'L', 'XL', 'XXL'] },
    isNew: true,
    featured: true,
    addedAt: '2026-10-12'
  },
  {
    id: 'court-low-bianca',
    name: 'Court Low',
    category: 'sneakers',
    price: 139,
    images: ['sneakerWhite1', 'sneakerWhite2'],
    color: 'Bianco',
    description:
      'La sneaker bassa bianca, essenziale e pulita. Il punto fermo di ogni guardaroba urbano.',
    details: ['Tomaia in pelle', 'Suola in gomma cucita', 'Plantare imbottito', 'Lacci piatti'],
    options: { label: 'Taglia EU', values: SNEAKER_SIZES },
    isNew: true,
    featured: true,
    addedAt: '2026-10-09'
  },
  {
    id: 'runner-arancio',
    name: 'Runner Signal',
    category: 'sneakers',
    price: 149,
    images: ['sneakerOrange1', 'sneakerOrange2'],
    color: 'Bianco / arancio',
    description:
      'Linee da running reinterpretate per la strada. Un accento di colore che alza qualsiasi outfit neutro.',
    details: ['Tomaia in mesh e suede', 'Intersuola ammortizzata', 'Battistrada in gomma', 'Linguetta imbottita'],
    options: { label: 'Taglia EU', values: SNEAKER_SIZES },
    isNew: false,
    featured: false,
    addedAt: '2026-09-25'
  },
  {
    id: 'street-sneaker-teal',
    name: 'Street Low Teal',
    category: 'sneakers',
    price: 129,
    images: ['sneakerTeal'],
    color: 'Bianco / verde acqua',
    description:
      'Profilo basso, palette fuori dagli schemi. Per chi vuole farsi notare dai dettagli.',
    details: ['Tomaia in pelle e suede', 'Suola in gomma', 'Fodera traspirante'],
    options: { label: 'Taglia EU', values: SNEAKER_SIZES },
    isNew: false,
    featured: false,
    addedAt: '2026-09-02'
  },
  {
    id: 'cap-six-panel-grigio',
    name: 'Six-Panel Cap',
    category: 'accessori',
    price: 35,
    images: ['capGrey1', 'capGrey2'],
    color: 'Grigio',
    description:
      'Cappellino a sei pannelli con visiera curva e chiusura regolabile. Il finale di ogni outfit.',
    details: ['Twill di cotone', 'Chiusura regolabile', 'Visiera curva', 'Taglia unica'],
    options: null,
    isNew: false,
    featured: false,
    addedAt: '2026-09-15'
  },
  {
    id: 'cap-bianco',
    name: 'Clean Cap',
    category: 'accessori',
    price: 35,
    images: ['capWhite1', 'capWhite2'],
    color: 'Bianco',
    description: 'Il cappellino bianco senza loghi in evidenza: minimale, versatile, sempre giusto.',
    details: ['Twill di cotone', 'Chiusura regolabile', 'Taglia unica'],
    options: null,
    isNew: true,
    featured: false,
    addedAt: '2026-10-03'
  },
  {
    id: 'sling-bag-nera',
    name: 'Sling Bag',
    category: 'accessori',
    price: 65,
    images: ['sling1', 'sling2', 'sling3'],
    color: 'Nero',
    description:
      'Borsa a tracolla compatta per l’essenziale: telefono, chiavi, portafoglio. Si porta davanti, dietro o a spalla.',
    details: ['Nylon resistente', 'Tracolla regolabile', 'Tasca interna con zip', 'Dimensioni compatte'],
    options: null,
    isNew: false,
    featured: true,
    addedAt: '2026-09-28'
  },
  {
    id: 'eau-de-parfum-noir',
    name: 'Eau de Parfum Noir',
    category: 'profumi',
    price: 79,
    images: ['perfumeNoir1', 'perfumeNoir2'],
    color: 'Note legnose',
    description:
      'Fragranza dal carattere deciso, con un fondo caldo e persistente. Pensata per la sera.',
    details: ['Famiglia olfattiva: legnosa (esempio)', 'Concentrazione: Eau de Parfum', 'Vaporizzatore'],
    options: {
      label: 'Formato',
      values: [
        { value: '50 ml', price: 79 },
        { value: '100 ml', price: 119 }
      ]
    },
    isNew: false,
    featured: true,
    addedAt: '2026-09-18'
  },
  {
    id: 'eau-de-parfum-clear',
    name: 'Eau de Parfum Clear',
    category: 'profumi',
    price: 69,
    images: ['perfumeClear1', 'perfumeClear2'],
    color: 'Note fresche',
    description: 'Fresca e pulita, per tutti i giorni. Una firma discreta che si fa ricordare.',
    details: ['Famiglia olfattiva: agrumata (esempio)', 'Concentrazione: Eau de Parfum', 'Vaporizzatore'],
    options: {
      label: 'Formato',
      values: [
        { value: '50 ml', price: 69 },
        { value: '100 ml', price: 99 }
      ]
    },
    isNew: true,
    featured: false,
    addedAt: '2026-10-01'
  }
];

/* ---- Funzioni di supporto (non serve modificarle) ---- */

export const getProduct = (id) => products.find((p) => p.id === id);

// Normalizza le varianti: restituisce sempre [{ value, price }]
export function getVariants(product) {
  if (!product.options) return [];
  return product.options.values.map((v) =>
    typeof v === 'string' ? { value: v, price: product.price } : { value: v.value, price: v.price ?? product.price }
  );
}

export function getPrice(product, variantValue) {
  const v = getVariants(product).find((x) => x.value === variantValue);
  return v ? v.price : product.price;
}

// Prezzo "a partire da" per prodotti con varianti a prezzo diverso
export function getMinPrice(product) {
  const vs = getVariants(product);
  return vs.length ? Math.min(...vs.map((v) => v.price)) : product.price;
}

export function hasVariablePrice(product) {
  const vs = getVariants(product);
  return vs.length > 0 && new Set(vs.map((v) => v.price)).size > 1;
}
