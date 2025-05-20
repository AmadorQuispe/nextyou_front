import { useEffect, useState, useCallback } from "react";

interface UseFetchOptions<T> {
  queryKey: unknown;
  queryFn: () => Promise<T>;
}

interface UseFetchResult<T> {
  data: T | undefined;
  error: unknown;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export function useFetch<T>({
  queryKey,
  queryFn,
}: UseFetchOptions<T>): UseFetchResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    fetchData();
  }, [queryKey, fetchData]);

  return {
    data,
    error,
    isLoading,
    refetch: fetchData,
  };
}
