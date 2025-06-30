import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { ENDPOINTS } from "@src/api/endpoints";
import type { MedicoPoEspecialidadProps } from "@src/types/type";

export function useMedicoPorEspecialidad(esp: string) {
  const endpoint = esp ? ENDPOINTS.PACIENTE.MEDICOS(esp) : "";
  return useApiRequest<MedicoPoEspecialidadProps[]>(endpoint, {
    method: "GET",
    autoFetch: !!esp,
  });
}
