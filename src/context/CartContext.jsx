import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { getPrice, getProduct } from '../data/products.js';

const STORAGE_KEY = 'districtlab-cart-v1';
export const MAX_QTY = 10;

const CartContext = createContext(null);

const lineKey = (productId, variant) => `${productId}__${variant ?? ''}`;

function loadCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Scarta righe non valide o di prodotti rimossi dal catalogo
    return parsed.filter((l) => l && getProduct(l.productId) && Number.isInteger(l.qty) && l.qty > 0);
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.productId, action.variant);
      const existing = state.find((l) => l.key === key);
      if (existing) {
        return state.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + action.qty) } : l));
      }
      return [...state, { key, productId: action.productId, variant: action.variant ?? null, qty: Math.min(MAX_QTY, action.qty) }];
    }
    case 'setQty':
      return state.map((l) => (l.key === action.key ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, action.qty)) } : l));
    case 'remove':
      return state.filter((l) => l.key !== action.key);
    case 'clear':
      return [];
    case 'replace':
      return action.lines;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, undefined, loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* archiviazione non disponibile (es. navigazione privata): il carrello resta in memoria */
    }
  }, [lines]);

  // Sincronizza il carrello tra più schede aperte
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) dispatch({ type: 'replace', lines: loadCart() });
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const product = getProduct(l.productId);
          if (!product) return null;
          const unitPrice = getPrice(product, l.variant);
          return { ...l, product, unitPrice, total: unitPrice * l.qty };
        })
        .filter(Boolean),
    [lines]
  );

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.total, 0);

  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast({ message, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const addItem = useCallback(
    (productId, variant, qty = 1) => {
      dispatch({ type: 'add', productId, variant, qty });
      const p = getProduct(productId);
      showToast(`${p?.name ?? 'Prodotto'}${variant ? ` · ${variant}` : ''} aggiunto al carrello`);
    },
    [showToast]
  );

  const value = {
    items,
    count,
    subtotal,
    addItem,
    setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
    removeItem: (key) => dispatch({ type: 'remove', key }),
    clear: () => dispatch({ type: 'clear' }),
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toast,
    dismissToast: () => setToast(null)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve essere usato dentro <CartProvider>');
  return ctx;
}
