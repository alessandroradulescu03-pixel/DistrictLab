# DISTRICT LAB — sito demo

Demo di negozio online per **DISTRICT LAB**, streetwear a Romano di Lombardia (BG).
Realizzato con **React + Vite**, pronto per essere pubblicato gratis su **GitHub Pages**.

> ⚠️ **È una demo.** Prodotti, prezzi, foto e checkout sono dimostrativi.
> Non si possono fare ordini né pagamenti reali. Vedi la sezione [Limiti della demo](#limiti-della-demo).

---

## Indice

1. [Cosa c'è nel sito](#cosa-cè-nel-sito)
2. [Installare Node.js sul Mac](#1-installare-nodejs-sul-mac)
3. [Aprire il Terminale nella cartella del progetto](#2-aprire-il-terminale-nella-cartella-del-progetto)
4. [Installare le dipendenze e avviare il sito](#3-installare-le-dipendenze-e-avviare-il-sito)
5. [Build di produzione](#4-build-di-produzione)
6. [Caricare il progetto su GitHub](#5-caricare-il-progetto-su-github)
7. [Pubblicare con GitHub Pages](#6-pubblicare-con-github-pages)
8. [Aggiornare il sito dopo una modifica](#7-aggiornare-il-sito-dopo-una-modifica)
9. [Modificare testi, prodotti, immagini, telefono e social](#8-modificare-testi-prodotti-immagini-telefono-e-social)
10. [Pagina bianca? Come risolvere](#9-pagina-bianca-come-risolvere)
11. [Limiti della demo e cosa serve per un vero e-commerce](#limiti-della-demo)
12. [Licenze di immagini e font](#licenze-di-immagini-e-font)

---

## Cosa c'è nel sito

| Pagina | Indirizzo | Contenuto |
|---|---|---|
| Home | `#/` | Hero, ultimi arrivi, categorie, manifesto, selezione, recensioni, invito in negozio |
| Shop | `#/shop` | Griglia prodotti, filtri per categoria, "solo novità", ricerca, ordinamento, stato vuoto |
| Categorie | `#/categorie` | Elenco dei reparti |
| Prodotto | `#/prodotto/nome-prodotto` | Galleria, taglie/formati, quantità, aggiunta al carrello, prodotti correlati |
| Carrello | `#/carrello` | Modifica quantità, rimozione, subtotale |
| Checkout | `#/checkout` | **Solo dimostrativo**: modulo con validazione, nessun pagamento |
| Il brand | `#/brand` | Pagina editoriale con la descrizione ufficiale |
| Contatti | `#/contatti` | Indirizzo, telefono cliccabile, indicazioni Google Maps, mappa caricata su richiesta |
| Legale | `#/legale` | Segnaposto per privacy, cookie, condizioni di vendita, crediti foto |

**Funzionalità implementate**

- Carrello reale nel browser: aggiunta, rimozione, quantità (1–10), taglia/formato conservati, subtotale automatico, contatore nel menu, salvataggio in `localStorage` (resta dopo aver chiuso il browser), sincronizzato tra più schede.
- Pannello carrello laterale + pagina carrello + notifica "aggiunto al carrello".
- Avviso se si prova ad aggiungere un prodotto senza scegliere la taglia.
- Prezzi diversi per variante (es. profumo 50 ml / 100 ml).
- Filtri e ricerca salvati nell'indirizzo (si possono condividere, es. `#/shop?cat=sneakers`).
- Menu mobile a schermo intero, accessibile da tastiera (Esc per chiudere).
- Animazioni leggere che si disattivano se nel sistema è attivo "Riduci movimento".
- Immagini con caricamento progressivo e grafica di riserva se una foto non si carica.
- Font inclusi nel progetto (nessuna richiesta a Google Fonts).
- Barra "DEMO" disattivabile con un'impostazione.

---

## 1. Installare Node.js sul Mac

Node.js è il programma che serve per avviare e compilare il sito. Si installa una volta sola.

1. Vai su **https://nodejs.org/en/download**
2. Scarica la versione **LTS** per **macOS** (il file `.pkg`, "macOS Installer").
3. Apri il file scaricato e segui l'installazione (Continua → Accetta → Installa).

**Verifica che funzioni:**

1. Apri il **Terminale**: premi `⌘ Cmd + Spazio`, scrivi `Terminale` e premi Invio.
2. Scrivi questo comando e premi Invio (puoi farlo da qualsiasi cartella):

   ```bash
   node -v
   ```

   Risultato atteso: un numero di versione, ad esempio `v22.12.0`. Deve essere **20.19 o superiore**.

3. Poi:

   ```bash
   npm -v
   ```

   Risultato atteso: un numero, ad esempio `10.9.0`.

Se compare `command not found`, chiudi e riapri il Terminale; se persiste, reinstalla Node.js.

---

## 2. Aprire il Terminale nella cartella del progetto

1. Estrai lo ZIP (doppio clic). Ottieni una cartella `districtlab`.
2. Spostala dove preferisci, ad esempio in `Documenti`.
3. Metodo più semplice: nel Terminale scrivi `cd ` (con lo **spazio** dopo `cd`), poi **trascina la cartella `districtlab` dal Finder dentro la finestra del Terminale** e premi Invio.

   Esempio di cosa vedrai:

   ```bash
   cd /Users/tuonome/Documents/districtlab
   ```

4. Controlla di essere nel posto giusto:

   ```bash
   ls
   ```

   Devi vedere, tra gli altri, `package.json`, `src`, `public`, `README.md`.

> Metodo alternativo: in Finder clic destro sulla cartella → **Servizi** → **Nuovo Terminale nella cartella**.

**Tutti i comandi seguenti vanno eseguiti in questa cartella.**

---

## 3. Installare le dipendenze e avviare il sito

### Installare (solo la prima volta)

```bash
npm install
```

Ci vuole circa un minuto. Risultato atteso: un messaggio come `added 26 packages`. Viene creata la cartella `node_modules` (non va mai caricata su GitHub, è già esclusa).

### Avviare il sito sul tuo Mac

```bash
npm run dev
```

Risultato atteso:

```
  VITE v8.x  ready in 300 ms
  ➜  Local:   http://localhost:5173/
```

Apri **http://localhost:5173/** nel browser. Ogni modifica ai file si vede subito, senza ricaricare.

Per fermare il sito: nel Terminale premi `Ctrl + C`.

---

## 4. Build di produzione

La "build" trasforma il progetto nei file finali ottimizzati da pubblicare.

```bash
npm run build
```

Risultato atteso: un elenco di file e alla fine `✓ built in ...`. I file finali sono nella cartella `dist`.

Per provare la build sul tuo Mac:

```bash
npm run preview
```

e apri l'indirizzo mostrato (di solito `http://localhost:4173/`).

> Su GitHub Pages **non devi caricare a mano la cartella `dist`**: la build la fa GitHub da solo (vedi punto 6).

---

## 5. Caricare il progetto su GitHub

Il modo più semplice con il Mac è **GitHub Desktop** (https://desktop.github.com).

### Se il repository NON esiste ancora

1. Apri GitHub Desktop → **File → Add Local Repository…** → scegli la cartella `districtlab`.
2. Se ti dice che non è un repository Git, clicca **create a repository** → **Create Repository**.
3. Clicca **Publish repository**. Scegli un nome (es. `DistrictLab`).
   Per GitHub Pages gratuito il repository deve essere **pubblico** (togli la spunta "Keep this code private"), a meno che tu non abbia un piano GitHub a pagamento.

### Se il repository ESISTE già (es. `DistrictLab`)

1. Apri la cartella del repository sul Mac (in GitHub Desktop: **Repository → Show in Finder**).
2. Copia dentro **il contenuto** della cartella `districtlab` (file e cartelle, compresa la cartella nascosta `.github`).
   Per vedere i file nascosti nel Finder premi `⌘ Cmd + Shift + .`
   Se nel repository ci sono vecchi file di un altro progetto (es. Lovable), eliminali prima, tranne la cartella nascosta `.git`.
3. In GitHub Desktop scrivi un messaggio (es. "Nuovo sito DISTRICT LAB"), clicca **Commit to main**, poi **Push origin**.

> Il ramo principale deve chiamarsi **`main`**: il workflow di pubblicazione parte solo da lì.

---

## 6. Pubblicare con GitHub Pages

Il progetto contiene già il file `.github/workflows/deploy.yml`, che a ogni push sul ramo `main`:
installa le dipendenze → esegue la build → pubblica la cartella `dist`.

**Impostazione da fare una sola volta su github.com:**

1. Apri il repository su github.com.
2. **Settings** → nel menu a sinistra **Pages**.
3. In **Build and deployment** → **Source** scegli **GitHub Actions**.

Poi:

4. Vai nella scheda **Actions**: vedrai il workflow **"Deploy su GitHub Pages"** in esecuzione (pallino giallo). Se non è partito, cliccalo e premi **Run workflow**.
5. Dopo 1–2 minuti diventa verde ✅. Clicca sull'esecuzione: trovi il link del sito, del tipo

   ```
   https://TUO-UTENTE.github.io/NOME-REPOSITORY/
   ```

### Il nome del repository e il percorso `base`

GitHub Pages pubblica il sito in un sottopercorso (`/NOME-REPOSITORY/`). **Non devi scriverlo da nessuna parte**: il workflow lo inserisce in automatico con
`BASE_PATH: /${{ github.event.repository.name }}/`.
Se rinomini il repository, il sito continua a funzionare dal push successivo.

Se un giorno vuoi forzarlo a mano, apri `vite.config.js` e sostituisci:

```js
const base = process.env.BASE_PATH || './';
```

con, ad esempio:

```js
const base = '/DistrictLab/';
```

### Perché gli indirizzi contengono `#`

Il sito usa indirizzi come `.../#/shop`. GitHub Pages non sa gestire il ricaricamento di pagine interne come `.../shop` (darebbe errore 404); con il `#` ogni pagina funziona sempre, anche ricaricando o condividendo il link.

---

## 7. Aggiornare il sito dopo una modifica

1. Modifica i file (vedi punto 8) e controlla con `npm run dev`.
2. (Consigliato) prova `npm run build`: se non dà errori, la pubblicazione andrà a buon fine.
3. In GitHub Desktop: messaggio → **Commit to main** → **Push origin**.
4. Attendi il pallino verde nella scheda **Actions** su github.com. Il sito si aggiorna da solo (a volte serve ricaricare la pagina con `⌘ Cmd + Shift + R`).

---

## 8. Modificare testi, prodotti, immagini, telefono e social

Tutti i dati sono **separati dalla grafica**: quasi sempre basta modificare uno di questi file.

| Cosa vuoi cambiare | File |
|---|---|
| Indirizzo, telefono, email, social, orari, recensioni, ragione sociale, P.IVA, barra demo | `src/config/site.js` |
| Testi della home e della pagina "Il brand" | `src/config/content.js` |
| Prodotti (nomi, prezzi, taglie, descrizioni, foto, novità) | `src/data/products.js` |
| Categorie | `src/data/categories.js` |
| Foto (quale immagine usare e dove) | `src/data/images.js` |
| Colori e font | `src/styles/base.css` (prime righe, sezione `:root`) |

Apri i file con un editor di testo per codice, ad esempio **Visual Studio Code** (gratuito: https://code.visualstudio.com). Evita TextEdit, che può rovinare le virgolette.

### Telefono e social

In `src/config/site.js`:

```js
phone: {
  display: '352 016 1300',   // come appare sul sito
  tel: '+393520161300'       // per il link "chiama" (senza spazi, con +39)
},
social: {
  instagram: '',             // es. 'https://www.instagram.com/NOME_PROFILO/'
  tiktok: ''                 // es. 'https://www.tiktok.com/@NOME_PROFILO'
},
```

Finché un social è vuoto, il sito lo mostra come "in arrivo" e non cliccabile.

### Orari

Sempre in `site.js`, la lista `hours` è vuota (gli orari non sono confermati) e il sito invita a chiamare. Per aggiungerli:

```js
hours: [
  { days: 'Lunedì', time: 'Chiuso' },
  { days: 'Martedì – Sabato', time: '00:00 – 00:00' }
],
```

### Recensioni

In `site.js` → `reviews`. Sono riportate come fornite e **vanno verificate** prima della pubblicazione. Per nasconderle: `showReviews: false`.

### Togliere la barra "DEMO"

`demoMode: false` in `site.js` — solo quando prodotti, prezzi e checkout saranno reali.

### Prodotti

In `src/data/products.js` ogni prodotto è un blocco tra `{ }`. Per aggiungerne uno copia un blocco esistente, incollalo sotto (attenzione alla virgola tra i blocchi) e cambia i valori. L'`id` deve essere unico, minuscolo, con trattini (es. `felpa-logo-nera`).

Esempio di varianti con prezzo diverso:

```js
options: {
  label: 'Formato',
  values: [
    { value: '50 ml', price: 79 },
    { value: '100 ml', price: 119 }
  ]
},
```

Per prodotti senza taglie (es. cappellini): `options: null`.

### Immagini

1. Metti la foto in `public/images/` (es. `public/images/felpa-nera.jpg`). Formato consigliato: JPG o WebP, lato lungo 1600–2000 px, peso sotto 400 KB, proporzione verticale 4:5 per i prodotti.
2. In `src/data/images.js` aggiungi una riga:

   ```js
   felpaNera: { src: local('felpa-nera.jpg'), alt: 'Felpa nera con cappuccio' },
   ```

3. In `products.js` usa il nome: `images: ['felpaNera']`.

Per cambiare la foto della home basta sostituire, ad esempio, la riga `hero:` in `images.js`.

---

## 9. Pagina bianca? Come risolvere

1. **Apri la console del browser.** In Chrome: `⌘ Cmd + Option + J`. In Safari: prima Safari → Impostazioni → Avanzate → "Mostra funzionalità per sviluppatori web", poi `⌘ Cmd + Option + C`. Gli errori in rosso dicono cosa non va.
2. **Errori 404 su file `.js` o `.css`** → il percorso `base` non corrisponde al nome del repository. Controlla che la pubblicazione sia avvenuta tramite il workflow (Settings → Pages → Source = **GitHub Actions**, non "Deploy from a branch"). Se hai forzato `base` a mano in `vite.config.js`, deve essere esattamente `/NOME-REPOSITORY/` con le barre e le maiuscole giuste.
3. **Vedi il file README o un elenco di file invece del sito** → Pages sta pubblicando i sorgenti: imposta Source su **GitHub Actions**.
4. **Il workflow è rosso ❌** → scheda Actions → clicca l'esecuzione → apri il passaggio fallito e leggi l'errore. Di solito è un errore di sintassi in un file modificato (una virgola o una virgoletta mancante). Prova `npm run build` sul Mac: ti indica file e riga.
5. **Errore `SyntaxError` in console dopo una modifica** → stesso caso: controlla virgole, virgolette e parentesi nel file che hai cambiato.
6. **Le foto non si vedono ma il sito sì** → le foto demo arrivano da Unsplash: verifica la connessione. Le foto locali devono stare in `public/images/` e il nome in `images.js` deve essere identico (maiuscole comprese).
7. **Le modifiche non compaiono** → aspetta il pallino verde in Actions e ricarica con `⌘ Cmd + Shift + R`.
8. **In locale `npm run dev` non parte** → controlla `node -v` (serve 20.19+) e di essere nella cartella giusta (`ls` deve mostrare `package.json`). Se serve, cancella `node_modules` e ripeti `npm install`.

---

## Limiti della demo

Cosa **non** fa questo sito:

- **Nessun ordine reale**: il checkout non invia dati e non crea ordini.
- **Nessun pagamento**: non raccoglie dati di carte e non è collegato a nessun sistema di pagamento.
- **Catalogo inventato**: nomi, prezzi, descrizioni, taglie e foto sono esempi. Non esistono disponibilità/stock.
- **Foto di repertorio** (Unsplash): non ritraggono il negozio né i suoi prodotti; alcune possono mostrare loghi di marchi terzi. Vanno sostituite.
- **Recensioni** riportate come fornite: da verificare.
- **Orari** non inseriti perché non confermati.
- **Pagine legali** solo segnaposto.
- Nessun pannello di amministrazione: i prodotti si modificano nei file.

### Cosa serve per rendere il checkout reale

1. **Piattaforma o backend e-commerce** — opzioni tipiche:
   - piattaforma completa (es. Shopify, WooCommerce): gestione prodotti, ordini, pagamenti già inclusi; questo design può essere adattato come tema o usato come front-end "headless";
   - in alternativa un servizio di pagamento con pagina di checkout ospitata (es. Stripe Checkout) + un piccolo backend per creare la sessione di pagamento e ricevere la conferma.
2. **Gestione ordini e magazzino**: stock per taglia, notifiche, email di conferma, stato spedizione.
3. **Pagamenti sicuri**: sempre su pagina/componente del fornitore (PCI DSS). Le chiavi segrete stanno solo sul server, **mai nel codice del sito**.
4. **Spedizioni**: corriere, tariffe, zone, ritiro in negozio.
5. **Resi e recesso**: politica di reso, diritto di recesso di 14 giorni per le vendite a distanza ai consumatori.
6. **Aspetti fiscali e legali** (da verificare con commercialista e consulente): IVA, fatturazione/corrispettivi, dati dell'azienda e P.IVA nel sito, condizioni di vendita, privacy policy e cookie policy conformi al GDPR, eventuale banner cookie se si aggiungono strumenti di analisi o marketing.
7. **Dominio** proprio (es. `districtlab.it`) collegabile anche a GitHub Pages o alla piattaforma scelta.

---

## Licenze di immagini e font

- **Foto**: da [Unsplash](https://unsplash.com), [licenza Unsplash](https://unsplash.com/license) (uso commerciale gratuito, attribuzione non obbligatoria). Sono caricate direttamente dai server di Unsplash; i crediti dei fotografi sono in `src/data/images.js` e nella pagina `#/legale`. Sono state escluse le foto "Unsplash+" (a pagamento).
- **Font** (inclusi nel progetto tramite Fontsource, licenza SIL Open Font License 1.1, uso commerciale consentito):
  Big Shoulders Display (titoli), Manrope (testi), JetBrains Mono (etichette).
- **Icone**: disegnate appositamente in SVG, nessuna libreria esterna.

## Struttura del progetto

```
districtlab/
├── .github/workflows/deploy.yml   pubblicazione automatica su GitHub Pages
├── public/                        file copiati così come sono (favicon, images/)
├── src/
│   ├── config/site.js             ★ dati del negozio
│   ├── config/content.js          ★ testi
│   ├── data/products.js           ★ prodotti
│   ├── data/categories.js         categorie
│   ├── data/images.js             ★ foto
│   ├── components/                parti riutilizzabili (header, footer, card, carrello…)
│   ├── pages/                     una pagina per file
│   ├── context/CartContext.jsx    logica del carrello
│   ├── hooks/ utils/              funzioni di supporto
│   └── styles/                    stile (base.css contiene colori e font)
├── index.html
├── package.json
└── vite.config.js
```
