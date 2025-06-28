import { useState } from "react";
import { ENDPOINTS } from "@src/api/endpoints";
import { useApi } from "@src/api/api-T/api-hook";
import { parseApiResponse } from "@src/components/utils/functions/parseApiResponse";

export function useActualizarEstadoCita() {
  const { fetchData } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estadoActualizado, setEstadoActualizado] = useState<string | null>(
    null
  );

  const actualizarEstado = async (idCita: number, nuevoEstado: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchData(
        ENDPOINTS.MEDICO.ESTADO_CITA(idCita, nuevoEstado),
        {
          method: "PUT",
        }
      );

      const { data, message, error } = parseApiResponse<{ estado: string }>(
        response
      );

      if (error || !data?.estado) {
        const msg = error || message || "No se pudo actualizar el estado.";
        setError(msg);
        setEstadoActualizado(null);
        return false;
      }

      setEstadoActualizado(data.estado);
      return true;
    } catch (err: any) {
      setError(err.message || "Error al actualizar estado.");
      setEstadoActualizado(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { actualizarEstado, isLoading, error, estadoActualizado };
}
