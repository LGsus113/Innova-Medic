import { useState, useEffect } from "preact/hooks";
import { apiClient } from "@src/api/client";

export function useCitasList(endpoint: string | null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!endpoint) return;
    setLoading(true);
    setError(null);

    try {
      const data = await apiClient(endpoint);
      setData(data);
    } catch (err) {
      let message = "Ocurrió un error inesperado.";

      if (err instanceof Error) {
        if (err.message.includes("Failed to fetch")) {
          message =
            "No se pudo conectar con el servidor. Verifica tu conexión.";
        } else if (err.message.includes("timeout")) {
          message = "La solicitud tardó demasiado. Intentalo denuevo.";
        } else {
          message = err.message;
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
}
