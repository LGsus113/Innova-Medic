import { useEffect, useState } from "react";
import { apiClient } from "@src/api/client";
import type { Cita } from "@src/types/type";

export function useCitasList(endpoint: string | null) {
  const [data, setData] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!endpoint) return;
    setLoading(true);
    setError(null);

    try {
      const json = await apiClient(endpoint);

      if (Array.isArray(json)) {
        setData(json);
      } else {
        setData([]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const refetch = async () => {
    if (endpoint) {
      setLoading(true);
      try {
        const json = await apiClient(endpoint);
        if (Array.isArray(json)) {
          setData(json);
          setError(null);
        } else {
          console.warn("Refetch: respuesta no es array:", json);
          setData([]);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error inesperado");
      } finally {
        setLoading(false);
      }
    }
  };

  return { data, loading, error, refetch };
}