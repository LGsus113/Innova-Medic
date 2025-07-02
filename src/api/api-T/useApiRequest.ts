import { useEffect, useState, useCallback, useRef } from "react";
import { apiClient } from "@src/api/client";
import type { RequestOptionsProps } from "@src/types/type";

export function useApiRequest<T = any>(
  endpoint: string,
  {
    method = "GET",
    body,
    headers,
    responseType = "json",
    autoFetch = true,
  }: RequestOptionsProps & { autoFetch?: boolean } = {}
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

      try {
        const response = await apiClient(customEndpoint ?? endpoint, {
          method,
          body: override?.body ?? defaultBody.current,
          headers: override?.headers ?? defaultHeaders.current,
          responseType: finalResponseType,
        });

        setData(response);
        return response;
      } catch (err: any) {
        if (
          finalResponseType === "blob" &&
          err instanceof Error &&
          err.message?.startsWith("{")
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
