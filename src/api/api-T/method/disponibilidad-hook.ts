import { ENDPOINTS } from "@src/api/endpoints";
import { useApiRequest } from "@src/api/api-T/useApiRequest";
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

  return useApiRequest<SlotPorDia[]>(endpoint, {
    method: "GET",
    autoFetch: isValid,
  });
}
