const BASE_URL = "http://localhost:8080";

export async function apiClient(
  endpoint: string,
  {
    method = "GET",
    body,
    headers = {},
    responseType = "json",
  }: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    responseType?: "json" | "blob";
  } = {}
) {
  const url = `${BASE_URL}${endpoint}`;

  const session = localStorage.getItem("session");
  let token: string | null = null;

  if (session) {
    try {
      const parsed = JSON.parse(session);
      token = parsed?.token;
    } catch (e) {
      console.log("Error parsing session from ls", e);
    }
  }

  const isBlob = responseType === "blob";
  const config: RequestInit = {
    method,
    headers: {
      ...(isBlob
        ? { Accept: "application/pdf" }
        : {
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, config);
  const contentType = response.headers.get("Content-Type") || "";

  if (!response.ok) {
    if (contentType.includes("application/json")) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.message || "Api error");
    } else {
      const text = await response.text().catch(() => null);
      throw new Error(text || "Api error desconocido");
    }
  }

  if (isBlob) {
    if (!contentType.includes("application/pdf")) {
      const text = await response.text().catch(() => "Respuesta no PDF");
      try {
        const parsed = JSON.parse(text);
        throw new Error(parsed.message || "Error al procesar PDF");
      } catch {
        throw new Error(text || "No se pudo descargar el PDF");
      }
    }

    return response.blob();
  }

  return response.json();
}
