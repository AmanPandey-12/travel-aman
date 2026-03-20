import { useState, useEffect } from 'react';

interface UseFetchOptions {
  skip?: boolean;
  refetchInterval?: number;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(
  fetchFn: () => Promise<any>,
  options: UseFetchOptions = {}
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!options.skip);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options.skip) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        if (result.success) {
          setData(result.data);
          setError(null);
        } else {
          setError(result.error || result.message || 'Unknown error');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up refetch interval if specified
    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);
    }
  }, [options.skip, options.refetchInterval]);

  return { data, loading, error };
}
