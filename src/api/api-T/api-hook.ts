import { useCallback } from "react";
import { apiClient } from "@src/api/client";
import type { RequestOptionsProps } from "@src/types/type";

export function useApi() {
  const fetchData = useCallback(
    async (endpoint: string, options: RequestOptionsProps = {}) => {
      try {
        const data = await apiClient(endpoint, options);

        if (data?.ok === false) {
          const message = data?.message || "Ocurrió un error inesperado.";
          throw new Error(message);
        }

        return data;
      } catch (err) {
        let message = "Ocurrió un error inesperado.";

        if (err instanceof Error) {
          if (err.message.includes("Failed to fetch")) {
            message =
              "No se pudo conectar con el servidor. Verifica tu conexión.";
          } else if (err.message.includes("timeout")) {
            message = "La solicitud tardó demasiado. Inténtalo de nuevo.";
          } else {
            message = err.message;
          }
        }

        throw new Error(message);
      }
    },
    []
  );

  return { fetchData };
}
