import PropTypes from 'prop-types';
import { Footprint } from './icons';

// Emblema circular rojo y ámbar, guiño al logo clásico de la saga
export default function Emblem({ size = 56 }) {
  return (
    <span className="emblem" style={{ width: size, height: size }} aria-hidden="true">
      <Footprint className="emblem-print" />
    </span>
  );
}

Emblem.propTypes = {
  size: PropTypes.number,
};
