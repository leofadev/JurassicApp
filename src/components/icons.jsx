import PropTypes from 'prop-types';

// Iconos SVG en línea
const Svg = ({ children, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {children}
  </svg>
);

Svg.propTypes = { children: PropTypes.node.isRequired };

// Huella de dinosaurio de tres dedos
export const Footprint = (props) => (
  <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" {...props}>
    <ellipse cx="32" cy="42" rx="11" ry="13" />
    <ellipse cx="32" cy="16" rx="5" ry="12" />
    <ellipse cx="16" cy="24" rx="5" ry="11" transform="rotate(-30 16 24)" />
    <ellipse cx="48" cy="24" rx="5" ry="11" transform="rotate(30 48 24)" />
  </svg>
);

export const IconSearch = () => <Svg><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg>;
export const IconX = () => <Svg><path d="M18 6 6 18M6 6l12 12" /></Svg>;
export const IconHeart = ({ filled = false }) => (
  <Svg fill={filled ? 'currentColor' : 'none'}>
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
  </Svg>
);
IconHeart.propTypes = { filled: PropTypes.bool };

export const IconLand = () => <Svg><path d="m3 20 6-9 4 5 3-4 5 8Z" /><circle cx="17" cy="6" r="2" /></Svg>;
export const IconWing = () => <Svg><path d="M2 12c4-6 9-7 20-6-4 1-6 3-7 6 3 0 5 1 7 3-7 1-13 0-20-3Z" /></Svg>;
export const IconWave = () => <Svg><path d="M2 8c2 0 2-2 5-2s3 2 5 2 2-2 5-2 3 2 5 2M2 14c2 0 2-2 5-2s3 2 5 2 2-2 5-2 3 2 5 2M2 20c2 0 2-2 5-2s3 2 5 2 2-2 5-2 3 2 5 2" /></Svg>;
