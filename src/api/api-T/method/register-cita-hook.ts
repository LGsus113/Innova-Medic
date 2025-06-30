import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { ENDPOINTS } from "@src/api/endpoints";
import type { CitaRecetaVaciaDTOProps } from "src/types/type";

export function useRegistrarCita() {
  const {
    data,
    loading,
    error,
    refetch: ejecutarRegistro,
  } = useApiRequest<{ idCita: number }>(ENDPOINTS.REGISTRO.CITA(), {
    method: "POST",
    autoFetch: false,
  });

  const registrar = async (cita: CitaRecetaVaciaDTOProps) => {
    const response = await ejecutarRegistro({ body: cita });

    const idCita = response?.idCita;

    if (!idCita) {
      throw new Error("No se pudo registrar la cita.");
    }

    return { idCita };
  };

  return { registrar, loading, error, data };
}
