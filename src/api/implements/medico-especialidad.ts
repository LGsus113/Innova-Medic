import { useEffect, useState } from "react";
import { useApi } from "@src/api/api-T/api-hook";
import { ENDPOINTS } from "@src/api/endpoints";
import { parseApiResponse } from "@src/components/utils/functions/parseApiResponse";
import type { MedicoPoEspecialidadProps } from "@src/types/type";

export function useMedicoPorEspecialidad(esp: string) {
  const { fetchData } = useApi();
  const [data, setData] = useState<MedicoPoEspecialidadProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const fetchMedicos = async () => {
    if (!esp) return;

    setLoading(true);
    setError(null);
    setMensaje(null);

    try {
      const result = await fetchData(ENDPOINTS.PACIENTE.MEDICOS(esp));
      const { data, message, error } =
        parseApiResponse<MedicoPoEspecialidadProps[]>(result);

      if (error) {
        setError(error);
        setData([]);
      } else {
        setData(data ?? []);
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
    setData([]);
    fetchMedicos();
  }, [esp]);

  return { data, loading, error, mensaje, refetch: fetchMedicos };
}
