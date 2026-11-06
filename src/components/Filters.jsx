import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDebounce } from '../hooks/useDebounce';
import { MOVIES, TYPES } from '../lib/movies';
import { IconHeart, IconSearch, IconX } from './icons';
import { TYPE_ICONS } from './typeIcons';

const SORTS = [
  { value: 'name', label: 'Nombre (A–Z)' },
  { value: 'appearances', label: 'Más apariciones' },
  { value: 'debut', label: 'Primera aparición' },
];

export default function Filters({ filters, onChange, onReset, favoritesCount, resultCount }) {
  const [query, setQuery] = useState(filters.query);
  const debounced = useDebounce(query);

  // Solo reacciona a lo que escribe el usuario; así "Limpiar" no reaplica el texto anterior
  const current = useRef(filters.query);
  current.current = filters.query;
  useEffect(() => {
    if (debounced !== current.current) onChange({ query: debounced });
  }, [debounced, onChange]);

  const hasFilters = filters.query || filters.movie || filters.type || filters.favorites;

  return (
    <section className="filters" aria-label="Filtros">
      <label className="search">
        <IconSearch />
        <input
          type="search"
          placeholder="Busca una especie: Velociraptor, Mosasaurus, Indominus…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar por nombre o especie"
        />
      </label>

      <div className="filters-row">
        <label className="field">
          <span className="field-label">Película</span>
          <select value={filters.movie} onChange={(e) => onChange({ movie: e.target.value })}>
            <option value="">Toda la saga</option>
            {MOVIES.map((m) => (
              <option key={m.title} value={m.title}>{m.year} · {m.title}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">Ordenar</span>
          <select value={filters.sort} onChange={(e) => onChange({ sort: e.target.value })}>
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>

        <div className="type-chips" role="group" aria-label="Tipo">
          {TYPES.map(({ value, label }) => {
            const Icon = TYPE_ICONS[value];
            const active = filters.type === value;
            return (
              <button
                key={value}
                type="button"
                className={`chip ${active ? 'is-active' : ''}`}
                aria-pressed={active}
                onClick={() => onChange({ type: active ? '' : value })}
              >
                <Icon /> {label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={`chip chip-fav ${filters.favorites ? 'is-active' : ''}`}
          aria-pressed={filters.favorites}
          onClick={() => onChange({ favorites: !filters.favorites })}
        >
          <IconHeart filled={filters.favorites} /> Favoritos
          <span className="chip-count">{favoritesCount}</span>
        </button>

        {hasFilters && (
          <button
            type="button"
            className="chip chip-ghost"
            onClick={() => {
              setQuery('');
              onReset();
            }}
          >
            <IconX /> Limpiar
          </button>
        )}
      </div>

      <p className="result-count" aria-live="polite">
        {resultCount !== null && `${resultCount} ${resultCount === 1 ? 'especie' : 'especies'}`}
      </p>
    </section>
  );
}

Filters.propTypes = {
  filters: PropTypes.shape({
    query: PropTypes.string,
    movie: PropTypes.string,
    type: PropTypes.string,
    sort: PropTypes.string,
    favorites: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  // null mientras se cargan los datos
  resultCount: PropTypes.number,
};
