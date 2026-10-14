import { site } from '../config/site.js';
import { InstagramIcon, TikTokIcon } from './Icons.jsx';

const LIST = [
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'tiktok', label: 'TikTok', Icon: TikTokIcon }
];

/*
 * Se l'URL in src/config/site.js è vuoto, il social viene mostrato come
 * "in arrivo" (non cliccabile), così non esistono link finti.
 */
export default function SocialLinks({ withLabels = false, className = '' }) {
  return (
    <ul className={`socials ${className}`}>
      {LIST.map(({ key, label, Icon }) => {
        const url = site.social[key];
        return (
          <li key={key}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className="social">
                <Icon />
                {withLabels ? <span>{label}</span> : <span className="sr-only">{label} (si apre in una nuova scheda)</span>}
              </a>
            ) : (
              <span className="social social--soon" title={`${label}: profilo in arrivo`}>
                <Icon />
                {withLabels ? (
                  <span>
                    {label} <em>· in arrivo</em>
                  </span>
                ) : (
                  <span className="sr-only">{label}: profilo in arrivo</span>
                )}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
