import { useState } from "react";
import { ENDPOINTS } from "@src/api/endpoints";
import { useApi } from "@src/api/api-T/api-hook";

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

      if (response?.status === "error") {
        throw new Error(
          response.message || "Error desconocido en el servidor."
        );
      }

      setEstadoActualizado(response.estado ?? null);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { actualizarEstado, isLoading, error, estadoActualizado };
}
