const eur = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

export const formatPrice = (n) => eur.format(n);

export const pad2 = (n) => String(n).padStart(2, '0');
