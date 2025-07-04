import { throwApiError } from "@src/functions/errorAPI";
import { refreshAccessToken } from "@src/api/api-T/refresh";
import type { ApiClientOptions } from "@src/types/type";

const BASE_URL = "http://localhost:8080";

export async function apiClient(
  endpoint: string,
  {
    method = "GET",
    body,
    headers = {},
    responseType = "json",
    retry = true,
  }: ApiClientOptions = {}
): Promise<any> {
  const url = `${BASE_URL}${endpoint}`;
  const session = localStorage.getItem("session");

  let parsedSession: any = null;
  let token: string | null = null;

  try {
    parsedSession = session ? JSON.parse(session) : null;
    token = parsedSession?.token || null;
  } catch (e) {
    console.error("Error al parsear la sesión:", e);
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

  if (response.status === 401 && retry) {
    if (window.location.pathname === "/") {
      throwApiError("Credenciales inválidas");
    }

    const nuevoToken = await refreshAccessToken(BASE_URL);
    if (nuevoToken) {
      return apiClient(endpoint, {
        method,
        body,
        headers,
        responseType,
        retry: false,
      });
    }

    localStorage.removeItem("session");
    window.location.href = "/";
    throwApiError("Sesión expirada. Inicia sesión nuevamente.");
  }

  if (!response.ok) {
    if (contentType.includes("application/json")) {
      try {
        const error = await response.json();
        throwApiError(error?.message || "Error en la API");
      } catch {
        throwApiError("Error inesperado al procesar respuesta JSON");
      }
    }

    const text = await response.text().catch(() => null);
    throwApiError(text || "Error desconocido en la API");
  }

  if (isBlob) {
    if (!contentType.includes("application/pdf")) {
      const text = await response.text().catch(() => "Respuesta no PDF");
      try {
        const parsed = JSON.parse(text);
        throwApiError(parsed.message || "Error al procesar PDF");
      } catch {
        throwApiError(text || "No se pudo descargar el PDF");
      }
    }

    return response.blob();
  }

  return response.json();
}
