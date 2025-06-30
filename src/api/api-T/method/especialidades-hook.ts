import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { ENDPOINTS } from "@src/api/endpoints";

export function useEspecialidades() {
  return useApiRequest<string[]>(ENDPOINTS.PACIENTE.ESPECIALIDADES(), {
    method: "GET",
    autoFetch: true,
  });
}
