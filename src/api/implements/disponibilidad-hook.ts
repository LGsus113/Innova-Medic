import { useEffect, useState } from "react";
import { useApi } from "@src/api/api-T/api-hook";
import { ENDPOINTS } from "@src/api/endpoints";
import type { SlotPorDia } from "@src/types/type";

export function useDisponibilidad(
  idMedico: number,
  fechaInicio: string,
  fechaFin: string
) {
  const { fetchData } = useApi();
  const [data, setData] = useState<SlotPorDia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDisponibilidad = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchData(
        ENDPOINTS.PACIENTE.DISPONIBILIDAD(idMedico, fechaInicio, fechaFin)
      );
      
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
    if (!idMedico || idMedico < 1) return;
    fetchDisponibilidad();
  }, [idMedico, fechaInicio, fechaFin]);

  return { data, loading, error, refetch: fetchDisponibilidad };
}
