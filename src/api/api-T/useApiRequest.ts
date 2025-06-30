import { useEffect, useState, useCallback, useRef } from "react";
import { apiClient } from "@src/api/client";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
  responseType?: "json" | "blob";
};

export function useApiRequest<T = any>(
  endpoint: string,
  {
    method = "GET",
    body,
    headers,
    responseType = "json",
    autoFetch = true,
  }: RequestOptions & { autoFetch?: boolean } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const defaultBody = useRef(body);
  const defaultHeaders = useRef(headers);
  const defaultResponseType = useRef(responseType);

  const execute = useCallback(
    async (
      override?: {
        body?: any;
        headers?: any;
        responseType?: "json" | "blob";
      },
      customEndpoint?: string
    ) => {
      setLoading(true);
      setError(null);

      const finalResponseType =
        override?.responseType ?? defaultResponseType.current;
      const isBlob = finalResponseType === "blob";

      try {
        const response = await apiClient(customEndpoint ?? endpoint, {
          method,
          body: override?.body ?? defaultBody.current,
          headers: override?.headers ?? defaultHeaders.current,
          responseType: finalResponseType,
        });

        if (!isBlob && response.status === "error") {
          throw new Error(response.message || "Error de la API");
        }

        const result = isBlob ? response : response.data;
        setData(result);
        return result;
      } catch (err: any) {
        if (
          isBlob &&
          err instanceof Error &&
          err.message &&
          err.message.startsWith("{")
        ) {
          try {
            const parsed = JSON.parse(err.message);
            if (parsed?.message) {
              setError(parsed.message);
              setData(null);
              throw new Error(parsed.message);
            }
          } catch {
            setError("Error inesperado al procesar el archivo");
            setData(null);
            throw new Error("Error inesperado al procesar el archivo");
          }
        }

        setError(err.message || "Error de conexión");
        setData(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method]
  );

  useEffect(() => {
    if (autoFetch) {
      execute();
    }
  }, [execute, autoFetch]);

  return { data, loading, error, refetch: execute };
}
