import { ENDPOINTS } from "@src/api/endpoints";
import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { parseApiResponse } from "@src/functions/parseApiResponse";
import type { SlotPorDia } from "@src/types/type";

export function useDisponibilidad(
  idMedico: number,
  fechaInicio: string,
  fechaFin: string
) {
  const isValid = idMedico > 0 && fechaInicio !== "" && fechaFin !== "";

  const endpoint = isValid
    ? ENDPOINTS.PACIENTE.DISPONIBILIDAD(idMedico, fechaInicio, fechaFin)
    : "";

  const {
    data,
    error: requestError,
    ...rest
  } = useApiRequest(endpoint, {
    method: "GET",
    autoFetch: isValid,
  });

  const { data: disponibilidades, error: parsedError } =
    parseApiResponse<SlotPorDia[]>(data);
  const finalError = parsedError ?? requestError;

  return {
    data: disponibilidades,
    error: finalError,
    ...rest,
  };
}
