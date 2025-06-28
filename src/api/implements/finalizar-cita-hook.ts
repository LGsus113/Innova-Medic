import { useState } from "react";
import { ENDPOINTS } from "@src/api/endpoints";
import { useApi } from "@src/api/api-T/api-hook";
import type { FinalizarCitaBody } from "@src/types/type";

export function useFinalizarCita() {
  const { fetchData } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finalizarCita = async (body: FinalizarCitaBody): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchData(ENDPOINTS.MEDICO.FINALIZAR_CITA(), {
        method: "PUT",
        body,
      });

      if (response?.status === "error") {
        throw new Error(
          response.message || "Error desconocido al finalizar cita"
        );
      }

      return true;
    } catch (err: any) {
      setError(err.message || "Error al finalizar la cita.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    finalizarCita,
    loading,
    error,
  };
}
