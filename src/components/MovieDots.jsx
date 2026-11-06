import PropTypes from 'prop-types';
import { MOVIES } from '../lib/movies';

// Seis puntos, uno por película: encendido si la especie aparece en ella
export default function MovieDots({ movies }) {
  return (
    <span className="movie-dots" aria-label={`Aparece en ${movies.length} de ${MOVIES.length} películas`}>
      {MOVIES.map((m) => (
        <span
          key={m.title}
          className={`movie-dot ${movies.includes(m.title) ? 'is-on' : ''}`}
          title={`${m.title} (${m.year})`}
        />
      ))}
    </span>
  );
}

MovieDots.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
