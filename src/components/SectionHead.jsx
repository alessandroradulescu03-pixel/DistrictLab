import { Link } from 'react-router-dom';
import { ArrowIcon } from './Icons.jsx';
import Reveal from './Reveal.jsx';

export default function SectionHead({ index, kicker, title, text, link }) {
  return (
    <Reveal className="section-head">
      <div className="section-head__left">
        {(index || kicker) && (
          <p className="kicker">
            {index && <span className="mono">{index}</span>}
            {kicker}
          </p>
        )}
        <h2 className="display-md">{title}</h2>
      </div>
      <div className="section-head__right">
        {text && <p>{text}</p>}
        {link && (
          <Link to={link.to} className="arrow-link">
            {link.label} <ArrowIcon width={18} height={18} />
          </Link>
        )}
      </div>
    </Reveal>
  );
}
