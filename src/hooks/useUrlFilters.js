import { useCallback, useState } from 'react';

const DEFAULTS = { query: '', movie: '', type: '', sort: 'name', favorites: false };
const PARAMS = { query: 'q', movie: 'pelicula', type: 'tipo', sort: 'orden', favorites: 'favoritos' };

function read() {
  const params = new URLSearchParams(window.location.search);
  return {
    query: params.get(PARAMS.query) ?? '',
    movie: params.get(PARAMS.movie) ?? '',
    type: params.get(PARAMS.type) ?? '',
    sort: params.get(PARAMS.sort) ?? DEFAULTS.sort,
    favorites: params.get(PARAMS.favorites) === '1',
  };
}

function write(filters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== DEFAULTS[key]) params.set(PARAMS[key], value === true ? '1' : value);
  });
  const query = params.toString();
  window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
}

// Filtros sincronizados con la URL para poder compartir una búsqueda
export function useUrlFilters() {
  const [filters, setFilters] = useState(read);

  const update = useCallback((changes) => {
    setFilters((current) => {
      const next = { ...current, ...changes };
      write(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    write(DEFAULTS);
    setFilters(DEFAULTS);
  }, []);

  return { filters, update, reset };
}
