import { useState, useEffect } from "preact/hooks";
import { apiClient } from "@src/api/client";
import { ENDPOINTS } from "@src/api/endpoints";

export function useCitasList(medicoId: number) {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCitas = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiClient(ENDPOINTS.CITA_MEDICO.LIST(medicoId));
      setCitas(data);
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
    fetchCitas();
  }, [medicoId]);

  return { citas, loading, error, refetch: fetchCitas };
}
