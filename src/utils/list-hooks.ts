import { useState, useEffect } from "preact/hooks";
import { apiClient } from "@src/api/client";
import { ENDPOINTS } from "@src/api/endpoints";

export function useCitasList(medicoId: number) {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const data = await apiClient(ENDPOINTS.CITA_MEDICO.LIST(medicoId));
        setCitas(data);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Error desconocido");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, [medicoId]);

  return { citas, loading, error };
}
