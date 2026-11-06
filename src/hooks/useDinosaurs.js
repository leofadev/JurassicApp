import { useCallback, useEffect, useState } from 'react';
import { fetchAppearances } from '../api/dinosaurs';
import { groupBySpecies } from '../lib/species';

export function useDinosaurs() {
  const [state, setState] = useState({ status: 'loading', species: [], appearances: 0 });
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, status: 'loading' }));
    fetchAppearances(controller.signal)
      .then((rows) => setState({ status: 'success', species: groupBySpecies(rows), appearances: rows.length }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState((s) => ({ ...s, status: 'error' }));
      });
    return () => controller.abort();
  }, [retry]);

  const reload = useCallback(() => setRetry((n) => n + 1), []);
  return { ...state, reload };
}
