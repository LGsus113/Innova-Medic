import { useState } from "react";
import { ENDPOINTS } from "@src/api/endpoints";
import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { parseApiResponse } from "@src/functions/parseApiResponse";
import type { FinalizarCitaBody } from "@src/types/type";

export function useFinalizarCita() {
  const {
    loading,
    error: requestError,
    refetch: ejecutarFinalizacion,
  } = useApiRequest<{ message: string; estadoActualizacion: string }>("", {
    method: "PUT",
    autoFetch: false,
  });

  const [error, setError] = useState<string | null>(null);

  const finalizarCita = async (body: FinalizarCitaBody): Promise<boolean> => {
    setError(null);

    try {
      const response = await ejecutarFinalizacion(
        { body, responseType: "json" },
        ENDPOINTS.MEDICO.FINALIZAR_CITA()
      );

      const { data: parsed, error: parseError } = parseApiResponse<{
        message: string;
        estadoActualizacion: string;
      }>(response);

      if (parseError || !parsed?.message) {
        setError(parseError || "No se pudo finalizar la cita.");
        return false;
      }

      return true;
    } catch {
      setError(requestError || "Error inesperado al finalizar la cita.");
      return false;
    }
  };

  return {
    finalizarCita,
    loading,
    error,
  };
}
