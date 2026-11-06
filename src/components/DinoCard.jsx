import PropTypes from 'prop-types';
import { speciesShape } from '../lib/shapes';
import FavoriteButton from './FavoriteButton';
import MovieDots from './MovieDots';
import TypeBadge from './TypeBadge';

export default function DinoCard({ dino, favorite, onToggleFavorite, onOpen }) {
  const { name, species, type, image, movies } = dino;

  return (
    <article className="card">
      <button type="button" className="card-main" onClick={onOpen} aria-label={`Ver ficha de ${name}`}>
        <span className="card-media">
          <img src={image} alt="" loading="lazy" width="250" height="250" />
          <TypeBadge type={type} />
        </span>
        <span className="card-body">
          <span className="card-name">{name}</span>
          {species.toLowerCase() !== name.toLowerCase() && <span className="card-species">{species}</span>}
          <span className="card-movies">
            <MovieDots movies={movies} />
            {movies.length} {movies.length === 1 ? 'película' : 'películas'}
          </span>
        </span>
      </button>
      <FavoriteButton className="card-fav" active={favorite} name={name} onToggle={onToggleFavorite} />
    </article>
  );
}

DinoCard.propTypes = {
  dino: speciesShape.isRequired,
  favorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
