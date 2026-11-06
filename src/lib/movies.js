// Saga en orden de estreno
export const MOVIES = [
  { title: 'Jurassic Park', short: 'Jurassic Park', year: 1993 },
  { title: 'The Lost World: Jurassic Park', short: 'The Lost World', year: 1997 },
  { title: 'Jurassic Park III', short: 'Jurassic Park III', year: 2001 },
  { title: 'Jurassic World', short: 'Jurassic World', year: 2015 },
  { title: 'Jurassic World: Fallen Kingdom', short: 'Fallen Kingdom', year: 2018 },
  { title: 'Jurassic World: Dominion', short: 'Dominion', year: 2022 },
];

export const movieIndex = (title) => MOVIES.findIndex((m) => m.title === title);

export const TYPES = [
  { value: 'Terrestre', label: 'Terrestre' },
  { value: 'Volador', label: 'Volador' },
  { value: 'Acuatico', label: 'Acuático' },
];

export const typeLabel = (value) => TYPES.find((t) => t.value === value)?.label ?? value;
