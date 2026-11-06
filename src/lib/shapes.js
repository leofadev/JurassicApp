import PropTypes from 'prop-types';

export const speciesShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
  firstMovie: PropTypes.number.isRequired,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({ movie: PropTypes.string.isRequired, image: PropTypes.string.isRequired })
  ).isRequired,
});
