import { useState } from 'react';
import { getImage, imageSrcSet, imageUrl } from '../utils/image.js';

/*
 * Immagine con:
 * - caricamento progressivo (sfondo neutro + dissolvenza all'arrivo)
 * - srcset per scaricare la dimensione giusta su ogni schermo
 * - fallback grafico se la foto non è raggiungibile
 */
export default function SmartImage({
  name,
  alt,
  className = '',
  sizes = '(max-width: 760px) 100vw, 50vw',
  widths = [480, 800, 1200, 1600],
  priority = false,
  width = 1200
}) {
  const img = getImage(name);
  const [status, setStatus] = useState(img ? 'loading' : 'error');
  const altText = alt ?? img?.alt ?? '';

  return (
    <div className={`smart-img smart-img--${status} ${className}`}>
      {img && status !== 'error' && (
        <img
          src={imageUrl(img.src, width)}
          srcSet={imageSrcSet(img.src, widths)}
          sizes={sizes}
          alt={altText}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
      {status === 'error' && (
        <div className="smart-img__fallback" role="img" aria-label={altText || 'Immagine non disponibile'}>
          <span>DISTRICT LAB</span>
        </div>
      )}
    </div>
  );
}
