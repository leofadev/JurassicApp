import { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { animate, stagger } from 'animejs';
import { MOVIES } from '../lib/movies';
import { prefersReducedMotion } from '../lib/motion';
import { speciesShape } from '../lib/shapes';
import { largeImage } from '../lib/species';
import FavoriteButton from './FavoriteButton';
import TypeBadge from './TypeBadge';
import { IconX } from './icons';

export default function DinoModal({ dino, favorite, onToggleFavorite, onClose }) {
  const dialogRef = useRef(null);
  const imageRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const { name, species, type, movies, gallery } = dino;
  const shown = gallery[current];

  // <dialog> nativo: gestiona el foco, Escape y el fondo. No se cierra en la limpieza:
  // al desmontarse sale del DOM, y cerrarlo dispararía onClose (en StrictMode, justo al abrir)
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    if (prefersReducedMotion()) return;
    animate(dialog.querySelector('.modal'), {
      opacity: { from: 0 },
      scale: { from: 0.88 },
      translateY: { from: 40 },
      duration: 600,
      ease: 'outExpo',
    });
    animate(dialog.querySelectorAll('.timeline-item'), {
      opacity: { from: 0 },
      translateY: { from: 16 },
      delay: stagger(70, { start: 200 }),
      duration: 500,
      ease: 'outQuad',
    });
  }, []);

  const showImage = (index) => {
    setCurrent(index);
    if (!prefersReducedMotion()) {
      animate(imageRef.current, { opacity: { from: 0.2 }, scale: { from: 1.06 }, duration: 500, ease: 'outQuad' });
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal-backdrop"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className="modal">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
          <IconX />
        </button>

        <div className="modal-gallery">
          <figure className="modal-figure">
            <img ref={imageRef} src={largeImage(shown.image)} alt={`${name} en ${shown.movie}`} />
            <figcaption>{shown.movie}</figcaption>
          </figure>
          {gallery.length > 1 && (
            <div className="thumbs" role="group" aria-label="Imágenes por película">
              {gallery.map((g, i) => (
                <button
                  key={g.image}
                  type="button"
                  className={`thumb ${i === current ? 'is-active' : ''}`}
                  aria-pressed={i === current}
                  aria-label={`Ver imagen de ${g.movie}`}
                  onClick={() => showImage(i)}
                >
                  <img src={g.image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-content">
          <div className="modal-head">
            <TypeBadge type={type} />
            <FavoriteButton active={favorite} name={name} onToggle={onToggleFavorite} />
          </div>
          <h2 id="modal-title" className="modal-title">{name}</h2>
          {species.toLowerCase() !== name.toLowerCase() && <p className="modal-species">Género {species}</p>}

          <p className="modal-summary">
            Aparece en <strong>{movies.length}</strong> de las {MOVIES.length} películas de la saga
            {movies.length > 0 && <>, desde <strong>{movies[0]}</strong></>}.
          </p>

          <ol className="timeline" aria-label="Apariciones en la saga">
            {MOVIES.map((m) => {
              const index = gallery.findIndex((g) => g.movie === m.title);
              const appears = movies.includes(m.title);
              return (
                <li key={m.title} className={`timeline-item ${appears ? 'is-on' : ''}`}>
                  <span className="timeline-year">{m.year}</span>
                  <span className="timeline-title">{m.short}</span>
                  {index >= 0 ? (
                    <button type="button" className="timeline-link" onClick={() => showImage(index)}>
                      Ver imagen
                    </button>
                  ) : (
                    <span className="timeline-state">{appears ? 'Aparece' : 'No aparece'}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </dialog>
  );
}

DinoModal.propTypes = {
  dino: speciesShape.isRequired,
  favorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
