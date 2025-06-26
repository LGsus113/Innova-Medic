import { useEffect, useState } from "react";
import { useApi } from "@src/api/api-T/api-hook";
import { ENDPOINTS } from "@src/api/endpoints";

export function useEspecialidades() {
  const { fetchData } = useApi();
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEspecialidades = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchData(ENDPOINTS.PACIENTE.ESPECIALIDADES());

      if (Array.isArray(result)) {
        setData(result);
      } else if (typeof result === "object" && result.message) {
        setError(result.message);
        setData([]);
      } else {
        setError("Respuesta inesperada del servidor.");
        setData([]);
      }
    } catch (err: any) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  return { data, loading, error, refetch: fetchEspecialidades };
}
