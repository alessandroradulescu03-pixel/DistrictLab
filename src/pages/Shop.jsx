import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { SearchIcon, CloseIcon } from '../components/Icons.jsx';
import { products, getMinPrice } from '../data/products.js';
import { categories, getCategory } from '../data/categories.js';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { site } from '../config/site.js';

const SORTS = [
  { id: 'new', label: 'Novità' },
  { id: 'price-asc', label: 'Prezzo crescente' },
  { id: 'price-desc', label: 'Prezzo decrescente' },
  { id: 'name', label: 'Nome A–Z' }
];

const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') || 'tutti';
  const sort = SORTS.some((s) => s.id === params.get('sort')) ? params.get('sort') : 'new';
  const onlyNew = params.get('new') === '1';
  const q = params.get('q') || '';
  const [query, setQuery] = useState(q);

  const activeCat = getCategory(cat);
  usePageTitle(activeCat ? activeCat.name : 'Shop');

  // Aggiorna l'URL con un piccolo ritardo mentre si digita
  useEffect(() => {
    const t = setTimeout(() => update({ q: query.trim() || null }), 220);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => setQuery(q), [q]);

  function update(changes) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(changes).forEach(([k, v]) => (v == null || v === '' ? next.delete(k) : next.set(k, v)));
        return next.toString() === prev.toString() ? prev : next;
      },
      { replace: true }
    );
  }

  const results = useMemo(() => {
    const needle = normalize(q.trim());
    let list = products.filter((p) => {
      if (activeCat && p.category !== activeCat.id) return false;
      if (onlyNew && !p.isNew) return false;
      if (needle) {
        const hay = normalize(
          [p.name, p.color, p.description, getCategory(p.category)?.name, ...(p.details || [])].join(' ')
        );
        // "nera" trova anche "nero", "felpe" anche "felpa": si ignora la vocale finale
        return needle.split(/\s+/).every((w) => hay.includes(w.length > 3 ? w.replace(/[aeiou]$/, '') : w));
      }
      return true;
    });
    list = [...list];
    if (sort === 'new') list.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    if (sort === 'price-asc') list.sort((a, b) => getMinPrice(a) - getMinPrice(b));
    if (sort === 'price-desc') list.sort((a, b) => getMinPrice(b) - getMinPrice(a));
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'it'));
    return list;
  }, [activeCat, onlyNew, q, sort]);

  const countFor = (id) => (id === 'tutti' ? products.length : products.filter((p) => p.category === id).length);
  const filtersActive = activeCat || onlyNew || q;

  const resetAll = () => {
    setQuery('');
    setParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="page shop">
      <header className="page-head container">
        <p className="kicker">
          <span className="mono">Shop</span>
          {activeCat ? activeCat.tagline : 'Tutta la selezione'}
        </p>
        <h1 className="display-xl">{activeCat ? activeCat.name : 'Shop'}</h1>
        {site.demoMode && (
          <p className="page-head__note">
            Catalogo dimostrativo: nomi, prezzi e foto sono esempi da sostituire con gli articoli reali del negozio.
          </p>
        )}
      </header>

      <div className="shop__bar">
        <div className="container shop__bar-inner">
          <div className="chips" role="group" aria-label="Filtra per categoria">
            {[{ id: 'tutti', name: 'Tutti' }, ...categories].map((c) => {
              const active = (c.id === 'tutti' && !activeCat) || activeCat?.id === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`chip ${active ? 'is-active' : ''}`}
                  aria-pressed={active}
                  onClick={() => update({ cat: c.id === 'tutti' ? null : c.id })}
                >
                  {c.name}
                  <span className="chip__count">{countFor(c.id)}</span>
                </button>
              );
            })}
            <button
              type="button"
              className={`chip chip--outline ${onlyNew ? 'is-active' : ''}`}
              aria-pressed={onlyNew}
              onClick={() => update({ new: onlyNew ? null : '1' })}
            >
              Solo novità
            </button>
          </div>

          <div className="shop__tools">
            <label className="search">
              <SearchIcon width={18} height={18} />
              <span className="sr-only">Cerca prodotti</span>
              <input
                type="search"
                placeholder="Cerca prodotti…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Cancella ricerca" className="search__clear">
                  <CloseIcon width={16} height={16} />
                </button>
              )}
            </label>
            <label className="select">
              <span className="sr-only">Ordina per</span>
              <select value={sort} onChange={(e) => update({ sort: e.target.value === 'new' ? null : e.target.value })}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    Ordina: {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="container">
        <p className="shop__count" aria-live="polite">
          {results.length} {results.length === 1 ? 'prodotto' : 'prodotti'}
          {filtersActive && (
            <button type="button" className="link-btn" onClick={resetAll}>
              Azzera filtri
            </button>
          )}
        </p>

        {results.length ? (
          <div className="product-grid">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="display-md">Nessun risultato.</p>
            <p>
              {q ? (
                <>
                  Nessun prodotto corrisponde a “<strong>{q}</strong>”
                  {activeCat ? ` in ${activeCat.name}` : ''}.
                </>
              ) : (
                'Nessun prodotto con questi filtri.'
              )}{' '}
              Prova con un’altra parola o rimuovi i filtri.
            </p>
            <button type="button" className="btn btn--dark" onClick={resetAll}>
              Mostra tutti i prodotti
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
