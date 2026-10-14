import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

// Font self-hosted (licenza SIL Open Font License): nessuna richiesta a Google Fonts
import '@fontsource-variable/big-shoulders-display';
import '@fontsource-variable/manrope';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';

import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

/*
 * HashRouter: gli indirizzi delle pagine usano "#" (es. /#/shop).
 * È la scelta più affidabile per GitHub Pages, che non sa gestire
 * il ricaricamento di pagine interne come /shop.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>
);
