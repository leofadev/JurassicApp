import PropTypes from 'prop-types';
import { typeLabel } from '../lib/movies';
import { TYPE_ICONS } from './typeIcons';

export default function TypeBadge({ type }) {
  const Icon = TYPE_ICONS[type];
  return (
    <span className={`type-badge type-${type.toLowerCase()}`}>
      {Icon && <Icon />} {typeLabel(type)}
    </span>
  );
}

TypeBadge.propTypes = {
  type: PropTypes.string.isRequired,
};
