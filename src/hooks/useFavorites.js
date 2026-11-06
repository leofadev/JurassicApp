import { useCallback, useEffect, useState } from 'react';

const KEY = 'jurassic-favorites';

function load() {
  try {
    const ids = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

// Especies favoritas, guardadas en el navegador
export function useFavorites() {
  const [favorites, setFavorites] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favorites));
    } catch {
      // Sin almacenamiento (modo privado): los favoritos duran solo la sesión
    }
  }, [favorites]);

  const toggle = useCallback(
    (id) => setFavorites((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id])),
    []
  );
  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  return { favorites, isFavorite, toggle };
}
