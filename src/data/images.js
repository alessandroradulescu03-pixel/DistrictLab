/*
 * ============================================================
 *  IMMAGINI DIMOSTRATIVE
 * ============================================================
 * Tutte le foto attuali provengono da Unsplash (https://unsplash.com),
 * licenza Unsplash: uso commerciale gratuito, attribuzione non obbligatoria
 * (ma gradita). https://unsplash.com/license
 *
 * ATTENZIONE: sono foto di repertorio, NON ritraggono il negozio
 * DISTRICT LAB, i suoi titolari o i suoi prodotti. Alcune possono
 * mostrare loghi di marchi terzi: vanno sostituite con foto reali
 * prima della pubblicazione definitiva.
 *
 * COME USARE FOTO TUE
 * 1. Copia il file in  public/images/  (es. public/images/hoodie-nero.jpg)
 * 2. Qui sotto, al posto di  u('photo-...')  scrivi  local('hoodie-nero.jpg')
 *    Esempio:  hero: { src: local('hero.jpg'), alt: 'Descrizione' }
 * ============================================================
 */

// Foto remota Unsplash (l'id è la parte "photo-..." dell'indirizzo).
const u = (id) => ({ type: 'unsplash', id });
// Foto locale presa dalla cartella public/images/
export const local = (file) => ({ type: 'local', file });

export const images = {
  // --- Homepage / editoriali ---
  hero: { src: u('photo-1513789181297-6f2ec112c0bc'), alt: 'Ritratto streetwear con felpa nera e cappuccio', credit: 'JC Gellidon' },
  manifesto: { src: u('photo-1559697242-7c922c6198c6'), alt: 'Due ragazzi in outfit streetwear appoggiati a un muro', credit: 'Sirio' },
  street: { src: u('photo-1532332248682-206cc786359f'), alt: 'Ragazzo in città davanti a un edificio in vetro', credit: 'Prince Akachi' },
  portrait: { src: u('photo-1660486044177-45cd45bb5e99'), alt: 'Ragazzo con cappello e giacca nera', credit: 'Ali Ghafouri' },
  duo: { src: u('photo-1559697242-a465f2578a95'), alt: 'Due ragazzi in strada con outfit urbani', credit: 'Sirio' },
  wall: { src: u('photo-1564557287817-3785e38ec1f5'), alt: 'Felpa grigia con cappuccio, ritratto contro un muro', credit: 'The Ian' },
  storeRacks: { src: u('photo-1603400521630-9f2de124b33b'), alt: 'Stender con capi dai toni neutri (immagine dimostrativa)', credit: 'Thom Bradley' },
  storeWall: { src: u('photo-1665815844395-06f64f44b5e3'), alt: 'Parete con capi esposti (immagine dimostrativa)', credit: 'Max Harlynking' },

  // --- Categorie ---
  catAbbigliamento: { src: u('photo-1611817757591-c3f345024273'), alt: 'Felpa grigia indossata in città', credit: 'Logan Weaver' },
  catSneakers: { src: u('photo-1595341888016-a392ef81b7de'), alt: 'Sneaker su asfalto con graffiti sullo sfondo', credit: 'Omar Prestwich' },
  catAccessori: { src: u('photo-1653704841996-c2ed854aedd8'), alt: 'Cappellini esposti su una mensola in legno', credit: 'Jonathan Cooper' },
  catProfumi: { src: u('photo-1594035910387-fea47794261f'), alt: 'Flacone di profumo nero e oro', credit: 'Laura Chouette' },

  // --- Prodotti ---
  hoodieGrey1: { src: u('photo-1556821840-3a63f95609a7'), alt: 'Felpa grigia con cappuccio indossata', credit: 'Jannes Jacobs' },
  hoodieGrey2: { src: u('photo-1611817757591-c3f345024273'), alt: 'Felpa grigia indossata in città', credit: 'Logan Weaver' },
  hoodieBlack1: { src: u('photo-1579572331145-5e53b299c64e'), alt: 'Felpa nera con cappuccio', credit: 'Philipp Lansing' },
  hoodieBlack2: { src: u('photo-1513789181297-6f2ec112c0bc'), alt: 'Felpa nera con cappuccio, ritratto', credit: 'JC Gellidon' },
  hoodieWhite1: { src: u('photo-1615397587950-3cbb55f95b77'), alt: 'Felpa bianca indossata in strada', credit: 'Khalid Boutchich' },
  hoodieWhite2: { src: u('photo-1620799140188-3b2a02fd9a77'), alt: 'Felpa bianca e jeans appesi', credit: 'Mediamodifier' },
  hoodieBrown1: { src: u('photo-1578768079052-aa76e52ff62e'), alt: 'Felpa marrone su scalinata', credit: 'Ali Saadat' },
  hoodieBrown2: { src: u('photo-1517942420142-6a296f9ee4b1'), alt: 'Felpa marrone indossata', credit: 'Hunter Newton' },
  teeBrown: { src: u('photo-1599012307530-d163bd04ecab'), alt: 'T-shirt marrone e pantaloni grigi', credit: 'Logan Weaver' },
  poloWhite: { src: u('photo-1625698311031-f0dd15be5144'), alt: 'Polo bianca appesa a uno stender in metallo', credit: 'mintosko' },
  jacketBlack1: { src: u('photo-1622567893612-a5345baa5c9a'), alt: 'Giacca nera appesa', credit: 'whereslugo' },
  jacketBlack2: { src: u('photo-1660486044177-45cd45bb5e99'), alt: 'Giacca nera indossata', credit: 'Ali Ghafouri' },
  sneakerWhite1: { src: u('photo-1600269452121-4f2416e55c28'), alt: 'Sneaker bianca su capi neri e bianchi', credit: 'Jeff Tumale' },
  sneakerWhite2: { src: u('photo-1608231387042-66d1773070a5'), alt: 'Sneaker bianca su sfondo scuro', credit: 'The DK Photography' },
  sneakerOrange1: { src: u('photo-1600185365926-3a2ce3cdb9eb'), alt: 'Sneaker bianca e arancione', credit: 'Luis Felipe Lins' },
  sneakerOrange2: { src: u('photo-1560769629-975ec94e6a86'), alt: 'Paio di sneaker bianche e arancioni su scatola', credit: 'Irene Kredenets' },
  sneakerTeal: { src: u('photo-1595341888016-a392ef81b7de'), alt: 'Sneaker bianca, verde acqua e arancione su asfalto', credit: 'Omar Prestwich' },
  capGrey1: { src: u('photo-1521369909029-2afed882baee'), alt: 'Cappellino grigio su fondo bianco', credit: 'Yang Deng' },
  capGrey2: { src: u('photo-1534215754734-18e55d13e346'), alt: 'Ragazzo con cappellino grigio', credit: 'Ahmed Syed' },
  capWhite1: { src: u('photo-1588850561407-ed78c282e89b'), alt: 'Cappellino bianco su fondo bianco', credit: 'Mediamodifier' },
  capWhite2: { src: u('photo-1691256676359-20e5c6d4bc92'), alt: 'Cappellino bianco su fondo grigio', credit: 'personalgraphic.com' },
  sling1: { src: u('photo-1620786514684-ff35b5aae55e'), alt: 'Borsa a tracolla nera', credit: 'Maryam Nemati' },
  sling2: { src: u('photo-1620786514669-06e2340fce71'), alt: 'Borsa a tracolla nera, dettaglio', credit: 'Maryam Nemati' },
  sling3: { src: u('photo-1709899373206-26c623817a49'), alt: 'Borsa nera tenuta in mano', credit: 'Noman Khan' },
  perfumeNoir1: { src: u('photo-1594035910387-fea47794261f'), alt: 'Flacone di profumo nero e oro', credit: 'Laura Chouette' },
  perfumeNoir2: { src: u('photo-1585218334450-afcf929da36e'), alt: 'Flacone di profumo nero e oro, dettaglio', credit: 'Laura Chouette' },
  perfumeClear1: { src: u('photo-1615634260167-c8cdede054de'), alt: 'Flacone di profumo in vetro trasparente', credit: 'Ulysse Pointcheval' },
  perfumeClear2: { src: u('photo-1593487568720-92097fb460fb'), alt: 'Flacone in vetro su tavolo di legno', credit: 'deanna alys' }
};
