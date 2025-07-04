export function parseApiResponse<T>(response: any): {
  data: T | null;
  error: string | null;
} {
  if (!response) return { data: null, error: null };

  if (response.status === "success" && "data" in response) {
    return { data: response.data as T, error: null };
  }

  if (response.status === "success" && "message" in response) {
    return { data: null, error: response.message || null };
  }

  if (response.status === "error") {
    return { data: null, error: response.message || "Error desconocido" };
  }

  return { data: null, error: "Respuesta inesperada" };
}
