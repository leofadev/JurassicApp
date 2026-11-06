import { movieIndex } from './movies';

const slug = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Imagen a mayor resolución (la hoja guarda miniaturas de 250 px)
export const largeImage = (url, width = 800) => url.replace(/=w\d+/, `=w${width}`);

// El nombre más usado entre sus apariciones, p. ej. "Tyrannosaurus Rex"
function mostCommon(values) {
  const counts = values.reduce((acc, v) => acc.set(v, (acc.get(v) ?? 0) + 1), new Map());
  return [...counts].sort((a, b) => b[1] - a[1])[0][0];
}

// Agrupa las apariciones por especie y ordena sus películas por año
export function groupBySpecies(rows) {
  const groups = new Map();
  rows.forEach((row) => {
    const species = row.Especie.trim();
    const key = species.toLowerCase();
    if (!groups.has(key)) groups.set(key, { species, rows: [] });
    groups.get(key).rows.push({
      name: row.name.trim(),
      movie: row['Name Movie'].trim(),
      type: row.type.trim(),
      image: row.image,
    });
  });

  return [...groups.values()].map(({ species, rows: list }) => {
    const appearances = [...list].sort((a, b) => movieIndex(a.movie) - movieIndex(b.movie));
    // Una imagen por película, sin repetir la misma ilustración
    const gallery = appearances.filter((a, i) => appearances.findIndex((b) => b.image === a.image) === i);
    return {
      id: slug(species),
      name: mostCommon(appearances.map((a) => a.name)),
      species,
      type: mostCommon(appearances.map((a) => a.type)),
      image: appearances[0].image,
      movies: appearances.map((a) => a.movie),
      firstMovie: movieIndex(appearances[0].movie),
      gallery,
    };
  });
}

const SORTERS = {
  name: (a, b) => a.name.localeCompare(b.name, 'es'),
  appearances: (a, b) => b.movies.length - a.movies.length || a.name.localeCompare(b.name, 'es'),
  debut: (a, b) => a.firstMovie - b.firstMovie || a.name.localeCompare(b.name, 'es'),
};

export function filterSpecies(list, { query, movie, type, sort, favorites }, isFavorite) {
  const q = query.trim().toLowerCase();
  return list
    .filter(
      (d) =>
        (!q || d.name.toLowerCase().includes(q) || d.species.toLowerCase().includes(q)) &&
        (!movie || d.movies.includes(movie)) &&
        (!type || d.type === type) &&
        (!favorites || isFavorite(d.id))
    )
    .sort(SORTERS[sort] ?? SORTERS.name);
}
