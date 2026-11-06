import PropTypes from 'prop-types';
import { MOVIES } from '../lib/movies';
import Emblem from './Emblem';

export default function Header({ species, appearances, loading }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href={import.meta.env.BASE_URL} className="brand">
          <Emblem />
          <span>
            <span className="brand-title">Jurassic Archive</span>
            <span className="brand-subtitle">Catálogo de especies de la saga</span>
          </span>
        </a>
        {!loading && (
          <ul className="header-stats" aria-label="Resumen">
            <li><strong>{species}</strong> especies</li>
            <li><strong>{MOVIES.length}</strong> películas</li>
            <li><strong>{appearances}</strong> apariciones</li>
          </ul>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  species: PropTypes.number.isRequired,
  appearances: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
