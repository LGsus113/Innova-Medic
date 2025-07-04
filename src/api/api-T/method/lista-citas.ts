import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { parseApiResponse } from "@src/functions/parseApiResponse";
import type { Cita } from "@src/types/type";

export function useCitaLista(endpoint: string) {
  const {
    data,
    error: requestError,
    ...rest
  } = useApiRequest(endpoint, {
    method: "GET",
    autoFetch: !!endpoint,
  });

  const { data: citas, error: parsedError } = parseApiResponse<Cita[]>(data);

  const finalError = parsedError ?? requestError;

  return { citas, error: finalError, ...rest };
}
