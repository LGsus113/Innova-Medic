import { useCallback, useEffect, useState } from "react";
import { apiClient } from "@src/api/client";
import type { Cita } from "@src/types/type";

export function useCitasList(
  endpoint: string | null,
  accessToken: string | null
) {
  const [data, setData] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!endpoint || !accessToken) return;
    setLoading(true);
    setError(null);

    try {
      const json = await apiClient(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocurrió un error inesperado."
      );
    } finally {
      setLoading(false);
    }
  }, [endpoint, accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
