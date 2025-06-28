export function parseApiResponse<T = any>(
  res: any
): {
  data?: T;
  message?: string;
  error?: string;
} {
  if (!res) return { error: "Sin respuesta del servidor." };

  if (res.status === "success") {
    return {
      data: res.data ?? undefined,
      message: res.message ?? undefined,
    };
  }

  return {
    error: res.message || "Ocurrió un error inesperado.",
  };
}
