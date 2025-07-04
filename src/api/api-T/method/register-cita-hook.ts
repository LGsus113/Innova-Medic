import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { ENDPOINTS } from "@src/api/endpoints";
import { parseApiResponse } from "@src/functions/parseApiResponse";
import type { CitaRecetaVaciaDTOProps } from "src/types/type";

export function useRegistrarCita() {
  const {
    data,
    loading,
    error: requestError,
    refetch: ejecutarRegistro,
  } = useApiRequest<{ idCita: number }>(ENDPOINTS.REGISTRO.CITA(), {
    method: "POST",
    autoFetch: false,
  });

  const registrar = async (cita: CitaRecetaVaciaDTOProps) => {
    const response = await ejecutarRegistro({ body: cita });

    const { data: parsedData, error: parsedError } = parseApiResponse<{
      idCita: number;
    }>(response);

    if (!parsedData?.idCita) {
      throw new Error(parsedError || "No se pudo registrar la cita");
    }

    return { idCita: parsedData.idCita };
  };

  const { data: parsedData, error: apiError } = parseApiResponse<{
    idCita: number;
  }>(data);

  return {
    registrar,
    loading,
    error: apiError || requestError,
    data: parsedData,
  };
}
