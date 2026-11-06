import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { prefersReducedMotion } from '../lib/motion';
import { Footprint } from './icons';

// Huellas que aparecen una tras otra, como un dinosaurio caminando
export default function Loader() {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const anim = animate(ref.current.querySelectorAll('.loader-print'), {
      opacity: [{ to: 1, duration: 200 }, { to: 0.15, duration: 700, delay: 500 }],
      scale: [{ from: 0.4, to: 1, duration: 300, ease: 'outBack(3)' }],
      delay: stagger(220),
      loop: true,
      loopDelay: 300,
    });
    return () => anim.revert();
  }, []);

  return (
    <div className="loader" role="status" ref={ref}>
      <div className="loader-trail" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <Footprint key={i} className={`loader-print ${i % 2 ? 'is-right' : ''}`} />
        ))}
      </div>
      <p>Rastreando especies…</p>
    </div>
  );
}
