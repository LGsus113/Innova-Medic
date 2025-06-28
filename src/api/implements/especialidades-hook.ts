import { useEffect, useState } from "react";
import { useApi } from "@src/api/api-T/api-hook";
import { ENDPOINTS } from "@src/api/endpoints";
import { parseApiResponse } from "@src/components/utils/functions/parseApiResponse";

export function useEspecialidades() {
  const { fetchData } = useApi();
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const fetchEspecialidades = async () => {
    setLoading(true);
    setError(null);
    setMensaje(null);

    try {
      const result = await fetchData(ENDPOINTS.PACIENTE.ESPECIALIDADES());
      const { data, message, error } = parseApiResponse<string[]>(result);

      if (error) {
        setError(error);
        setData([]);
      } else {
        const especialidades = Array.isArray(data) ? data : [];
        setData(especialidades);
        if (message) setMensaje(message);
      }
    } catch (err: any) {
      setError(err.message || "Error de red.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  return { data, loading, error, mensaje, refetch: fetchEspecialidades };
}
