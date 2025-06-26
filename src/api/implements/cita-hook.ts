import { useEffect, useState, useCallback } from "react";
import { apiClient } from "@src/api/client";
import type { Cita } from "@src/types/type";

export function useCitasList(endpoint: string | null) {
  const [data, setData] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    setLoading(true);
    setError(null);

    try {
      const json = await apiClient(endpoint);
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocurrió un error inesperado."
      );
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
