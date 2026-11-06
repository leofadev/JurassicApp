import { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { animate, stagger } from 'animejs';
import { prefersReducedMotion } from '../lib/motion';
import { speciesShape } from '../lib/shapes';
import DinoCard from './DinoCard';

export default function DinoGrid({ list, isFavorite, onToggleFavorite, onOpen }) {
  const ref = useRef(null);

  // Solo se anima cuando cambian las especies mostradas (no al marcar un favorito)
  const ids = list.map((d) => d.id).join();

  // Las tarjetas "emergen del ámbar": suben desde abajo con un leve giro, en cascada
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !list.length) return;
    const anim = animate(ref.current.children, {
      opacity: { from: 0 },
      translateY: { from: 60 },
      rotateX: { from: 35 },
      filter: { from: 'sepia(1) blur(6px)', to: 'sepia(0) blur(0px)' },
      delay: stagger(40),
      duration: 900,
      ease: 'outExpo',
    });
    return () => anim.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  return (
    <div className="grid" ref={ref}>
      {list.map((d) => (
        <DinoCard
          key={d.id}
          dino={d}
          favorite={isFavorite(d.id)}
          onToggleFavorite={() => onToggleFavorite(d.id)}
          onOpen={() => onOpen(d)}
        />
      ))}
    </div>
  );
}

DinoGrid.propTypes = {
  list: PropTypes.arrayOf(speciesShape).isRequired,
  isFavorite: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
