import { useState, useEffect } from 'react';

/**
 * Generic hook for fetching content on mount.
 * Provides loading / error states so every section
 * can show a skeleton or fallback independently.
 */
export function useContent<T>(fetcher: () => Promise<T | null>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return { data, loading, error };
}
