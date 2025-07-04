import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { ENDPOINTS } from "@src/api/endpoints";
import { parseApiResponse } from "@src/functions/parseApiResponse";
import type { MedicoPoEspecialidadProps } from "@src/types/type";

export function useMedicoPorEspecialidad(esp: string) {
  const endpoint = esp ? ENDPOINTS.PACIENTE.MEDICOS(esp) : "";

  const {
    data,
    error: requestError,
    ...rest
  } = useApiRequest(endpoint, {
    method: "GET",
    autoFetch: !!esp,
  });

  const { data: medicos, error: parsedError } =
    parseApiResponse<MedicoPoEspecialidadProps[]>(data);

  const finalError = parsedError ?? requestError;

  return {
    data: medicos,
    error: finalError,
    ...rest,
  };
}
