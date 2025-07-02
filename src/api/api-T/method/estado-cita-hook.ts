import { ENDPOINTS } from "@src/api/endpoints";
import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { parseApiResponse } from "@src/api/api-T/parseApiResponse";

export function useActualizarEstadoCita() {
  const {
    loading: isLoading,
    error: requestError,
    refetch: ejecutarCambioEstado,
    data,
  } = useApiRequest<{ estado: string }>("", {
    method: "PUT",
    autoFetch: false,
  });

  const actualizarEstado = async (idCita: number, nuevoEstado: string) => {
    const response = await ejecutarCambioEstado(
      { responseType: "json" },
      ENDPOINTS.USUARIO.ESTADO_CITA(idCita, nuevoEstado)
    );

    const { data: parsedData, error: parseError } = parseApiResponse<{
      estado: string;
    }>(response);

    if (!parsedData?.estado) {
      throw new Error(parseError || "No se pudo actualizar el estado.");
    }

    return true;
  };

  const { error: apiError } = parseApiResponse<{ estado: string }>(data);

  return {
    actualizarEstado,
    isLoading,
    error: apiError || requestError,
  };
}
