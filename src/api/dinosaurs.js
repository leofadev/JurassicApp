// Hoja de Google publicada con Apps Script: una fila por aparición de un dinosaurio en una película
const API_URL =
  'https://script.google.com/macros/s/AKfycbydyRvTTgmNfBjmTMWnS3NbeaTSmmR5eVtVTo03K36U46ukShua2sXkM_6IGByAQfI/exec';

export async function fetchAppearances(signal) {
  const res = await fetch(API_URL, { signal });
  if (!res.ok) throw new Error(`Error ${res.status} al cargar los dinosaurios`);
  const { data } = await res.json();
  return data;
}
