import { Component } from 'react';

/*
 * Se qualcosa va storto mentre la pagina si carica, invece di una
 * pagina bianca mostra un messaggio con l'errore (utile per capire il problema).
 */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Errore DISTRICT LAB:', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeContent: 'center', padding: 24, textAlign: 'center', fontFamily: 'system-ui, sans-serif', background: '#ecebe6', color: '#121211' }}>
        <h1 style={{ fontSize: 28, margin: '0 0 12px' }}>Qualcosa non ha funzionato</h1>
        <p style={{ margin: '0 0 16px' }}>Prova a ricaricare la pagina. Se il problema resta, invia questo messaggio a chi gestisce il sito:</p>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#fff', padding: 12, fontSize: 13, maxWidth: 640, margin: '0 auto 16px', textAlign: 'left' }}>
          {String(this.state.error?.message || this.state.error)}
        </pre>
        <button type="button" onClick={() => { try { localStorage.removeItem('districtlab-cart-v1'); } catch { /* */ } location.reload(); }} style={{ padding: '12px 20px', background: '#121211', color: '#ecebe6', border: 0, fontWeight: 700, cursor: 'pointer' }}>
          Ricarica
        </button>
      </div>
    );
  }
}
