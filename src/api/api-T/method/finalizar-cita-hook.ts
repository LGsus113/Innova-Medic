import { ENDPOINTS } from "@src/api/endpoints";
import { useApiRequest } from "@src/api/api-T/useApiRequest";
import type { FinalizarCitaBody } from "@src/types/type";

export function useFinalizarCita() {
  const {
    loading,
    error,
    refetch: ejecutarFinalizacion,
  } = useApiRequest<null>("", {
    method: "PUT",
    autoFetch: false,
  });

  const finalizarCita = async (body: FinalizarCitaBody): Promise<boolean> => {
    try {
      await ejecutarFinalizacion(
        { body, responseType: "json" },
        ENDPOINTS.MEDICO.FINALIZAR_CITA()
      );
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    finalizarCita,
    loading,
    error,
  };
}
