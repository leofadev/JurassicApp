import PropTypes from 'prop-types';
import Emblem from './Emblem';

export function EmptyState({ favorites, onReset }) {
  return (
    <div className="feedback">
      <Emblem size={84} />
      <h2>{favorites ? 'Aún no tienes favoritos aquí' : 'Ninguna especie coincide'}</h2>
      <p>
        {favorites
          ? 'Marca especies con el corazón para reunirlas en esta lista.'
          : 'Prueba con otro nombre o quita algunos filtros.'}
      </p>
      <button type="button" className="btn" onClick={onReset}>Limpiar filtros</button>
    </div>
  );
}

EmptyState.propTypes = {
  favorites: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
};

export function ErrorState({ onRetry }) {
  return (
    <div className="feedback" role="alert">
      <Emblem size={84} />
      <h2>Las cercas eléctricas están caídas</h2>
      <p>No pudimos cargar el catálogo desde Google Sheets. Revisa tu conexión e intenta de nuevo.</p>
      <button type="button" className="btn" onClick={onRetry}>Reintentar</button>
    </div>
  );
}

ErrorState.propTypes = {
  onRetry: PropTypes.func.isRequired,
};
