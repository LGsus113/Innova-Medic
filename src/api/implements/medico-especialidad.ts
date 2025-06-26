import { useEffect, useState } from "react";
import { useApi } from "@src/api/api-T/api-hook";
import { ENDPOINTS } from "@src/api/endpoints";
import type { MedicoPoEspecialidadProps } from "@src/types/type";

export function useMedicoPorEspecialidad(esp: string) {
  const { fetchData } = useApi();
  const [data, setData] = useState<MedicoPoEspecialidadProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedicos = async () => {
    if (!esp) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchData(ENDPOINTS.PACIENTE.MEDICOS(esp));

      if (Array.isArray(result)) {
        setData(result);
      } else if (typeof result === "object" && result.message) {
        setError(result.message);
        setData([]);
      } else {
        setError("Error inesperado del servidor.");
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
    setData([]);
    fetchMedicos();
  }, [esp]);

  return { data, loading, error, refetch: fetchMedicos };
}
