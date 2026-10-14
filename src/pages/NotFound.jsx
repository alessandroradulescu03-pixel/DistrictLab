import { Link } from 'react-router-dom';
import { ArrowIcon } from '../components/Icons.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function NotFound({ title = 'Pagina non trovata', text = 'L’indirizzo che hai aperto non esiste o è stato spostato.' }) {
  usePageTitle(title);
  return (
    <div className="page container not-found">
      <p className="not-found__code mono">404</p>
      <h1 className="display-lg">{title}</h1>
      <p className="lead">{text}</p>
      <div className="btn-row">
        <Link to="/shop" className="btn btn--dark">
          Vai allo shop <ArrowIcon width={18} height={18} />
        </Link>
        <Link to="/" className="btn btn--ghost">
          Home
        </Link>
      </div>
    </div>
  );
}
