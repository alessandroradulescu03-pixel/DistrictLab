import { Link } from 'react-router-dom';

// Logo testuale: "DISTRICT" pieno + "LAB" in un riquadro, come un'etichetta.
export default function Logo({ onClick, size = 'md' }) {
  return (
    <Link to="/" className={`logo logo--${size}`} onClick={onClick} aria-label="DISTRICT LAB — Home">
      <span className="logo__district">DISTRICT</span>
      <span className="logo__lab">LAB</span>
    </Link>
  );
}
