import { useMemo, useState } from 'react';
import { useDinosaurs } from './hooks/useDinosaurs';
import { useFavorites } from './hooks/useFavorites';
import { useUrlFilters } from './hooks/useUrlFilters';
import { filterSpecies } from './lib/species';
import Header from './components/Header';
import Filters from './components/Filters';
import DinoGrid from './components/DinoGrid';
import DinoModal from './components/DinoModal';
import Loader from './components/Loader';
import { EmptyState, ErrorState } from './components/Feedback';

export default function App() {
  const { status, species, appearances, reload } = useDinosaurs();
  const { filters, update, reset } = useUrlFilters();
  const { favorites, isFavorite, toggle } = useFavorites();
  const [selected, setSelected] = useState(null);

  const list = useMemo(() => filterSpecies(species, filters, isFavorite), [species, filters, isFavorite]);

  return (
    <>
      <Header species={species.length} appearances={appearances} loading={status !== 'success'} />

      <main className="container main">
        <Filters
          filters={filters}
          onChange={update}
          onReset={reset}
          favoritesCount={favorites.length}
          resultCount={status === 'success' ? list.length : null}
        />

        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorState onRetry={reload} />}
        {status === 'success' &&
          (list.length ? (
            <DinoGrid list={list} isFavorite={isFavorite} onToggleFavorite={toggle} onOpen={setSelected} />
          ) : (
            <EmptyState favorites={filters.favorites} onReset={reset} />
          ))}
      </main>

      <footer className="footer container">
        <p>
          Datos e ilustraciones desde Google Sheets con Apps Script · Hecho por{' '}
          <a href="https://leofadev.github.io/Portafolio/" target="_blank" rel="noreferrer">Leonardo Pinto</a>
        </p>
      </footer>

      {selected && (
        <DinoModal
          dino={selected}
          favorite={isFavorite(selected.id)}
          onToggleFavorite={() => toggle(selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
