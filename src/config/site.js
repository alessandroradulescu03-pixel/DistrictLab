/*
 * ============================================================
 *  CONFIGURAZIONE NEGOZIO — DISTRICT LAB
 *  Modifica qui indirizzo, telefono, social, orari e recensioni.
 *  Tutte le pagine del sito leggono i dati da questo file.
 * ============================================================
 */

export const site = {
  name: 'DISTRICT LAB',

  // Se true mostra la barra "Demo" in alto e le note "da verificare".
  // Mettilo a false solo quando contenuti, prezzi e checkout saranno reali.
  demoMode: true,

  address: {
    street: 'Via Giovan Rubini Battista, 51',
    zip: '24058',
    city: 'Romano di Lombardia',
    province: 'BG',
    country: 'Italia'
  },

  phone: {
    display: '352 016 1300',
    tel: '+393520161300' // usato nel link tel:
  },

  // Email del negozio: lasciala vuota finché non è confermata.
  email: '',

  /*
   * SOCIAL
   * Inserisci gli URL completi quando confermati, ad esempio:
   *   instagram: 'https://www.instagram.com/NOME_PROFILO/'
   *   tiktok:    'https://www.tiktok.com/@NOME_PROFILO'
   * Se un campo resta vuoto, il sito mostra l'icona come "profilo in arrivo"
   * (non cliccabile) invece di un link falso.
   */
  social: {
    instagram: 'https://www.instagram.com/districtlab.official/',
    tiktok: ''
  },

  /*
   * ORARI DI APERTURA
   * Per più fasce nello stesso giorno separale con " · " (vanno su righe diverse).
   * Se la lista è vuota il sito mostra un invito a chiamare. Formato:
   *   hours: [
   *     { days: 'Lunedì', time: 'Chiuso' },
   *     { days: 'Martedì – Sabato', time: '00:00 – 00:00' },
   *   ]
   */
  hours: [
    { days: 'Lunedì', time: '15:30 – 19:30' },
    { days: 'Martedì', time: '15:30 – 19:30' },
    { days: 'Mercoledì', time: '15:30 – 19:30' },
    { days: 'Giovedì', time: '15:30 – 19:30' },
    { days: 'Venerdì', time: '15:30 – 19:30' },
    { days: 'Sabato', time: '09:30 – 12:30 · 15:30 – 19:30' },
    { days: 'Domenica', time: '09:30 – 12:30 · 15:30 – 19:30' }
  ],

  /*
   * RECENSIONI
   * Riportate come fornite (fonte indicata: scheda pubblica del negozio).
   * VANNO VERIFICATE prima della pubblicazione definitiva.
   * Per nasconderle tutte: showReviews: false
   */
  showReviews: true,
  rating: { value: 5, outOf: 5, count: 4 },
  reviews: [
    {
      author: 'Salvatore Alagna',
      text: 'Finalmente un negozio di abbigliamento come si deve. completo di tutto. Accessori, profumi e vestiti top'
    },
    {
      author: 'Momo Diop',
      text: 'Aperto da poco ma sono già tornato più volte, i titolari mi hanno consigliato benissimo'
    },
    {
      author: 'Ronny__ 77',
      text: "Personale super, ha saputo consigliarmi l'outfit perfetto"
    }
  ],

  // Dati legali da completare prima della pubblicazione.
  legal: {
    companyName: '', // Ragione sociale
    vatNumber: '' // Partita IVA
  }
};

/* ---- Valori derivati (non serve modificarli) ---- */

export const fullAddress = `${site.address.street}, ${site.address.zip} ${site.address.city} (${site.address.province})`;

const mapsQuery = encodeURIComponent(
  `DISTRICT LAB, ${site.address.street}, ${site.address.zip} ${site.address.city} ${site.address.province}`
);

// Link alle indicazioni stradali (formato ufficiale Google Maps URLs).
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
// Mappa incorporata (Google Maps) mostrata nella pagina Contatti.
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

export const telHref = `tel:${site.phone.tel}`;
