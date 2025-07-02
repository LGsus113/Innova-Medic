import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { ENDPOINTS } from "@src/api/endpoints";
import { parseApiResponse } from "@src/api/api-T/parseApiResponse";

export function useEspecialidades() {
  const {
    data,
    error: requestError,
    ...rest
  } = useApiRequest(ENDPOINTS.PACIENTE.ESPECIALIDADES(), {
    method: "GET",
    autoFetch: true,
  });

  const { data: especialidades, error: parsedError } =
    parseApiResponse<string[]>(data);

  const finalError = parsedError ?? requestError;

  return {
    data: especialidades,
    error: finalError,
    ...rest,
  };
}
