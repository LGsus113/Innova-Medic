export function parseApiResponse<T>(response: any): {
  data: T | null;
  error: string | null;
} {
  if (!response) return { data: null, error: null };

  if (response.status === "success") {
    const data =
      response.data ??
      (response.message ? { message: response.message } : null);
    return { data: data as T, error: null };
  }

  if (response.status === "error") {
    return { data: null, error: response.message || "Error desconocido" };
  }

  return { data: null, error: "Respuesta inesperada" };
}
