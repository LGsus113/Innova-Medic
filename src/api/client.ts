const BASE_URL = "http://localhost:8080";

async function refreshAccessToken(): Promise<string | null> {
  const session = localStorage.getItem("session");
  if (!session) return null;

  try {
    const parsed = JSON.parse(session);
    const refreshToken = parsed?.refreshToken;
    if (!refreshToken) return null;

    const res = await fetch(`${BASE_URL}/api/usuario/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();

    const nuevoToken = data?.token;
    if (!nuevoToken) return null;

    const nuevaSession = { ...parsed, token: nuevoToken };
    localStorage.setItem("session", JSON.stringify(nuevaSession));

    return nuevoToken;
  } catch (e) {
    console.error("Error en refreshAccessToken:", e);
    return null;
  }
}

export async function apiClient(
  endpoint: string,
  {
    method = "GET",
    body,
    headers = {},
    responseType = "json",
    retry = true,
  }: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    responseType?: "json" | "blob";
    retry?: boolean;
  } = {}
): Promise<any> {
  const url = `${BASE_URL}${endpoint}`;

  const session = localStorage.getItem("session");
  let token: string | null = null;

  if (session) {
    try {
      const parsed = JSON.parse(session);
      token = parsed?.token;
    } catch (e) {
      console.error("Error parsing session", e);
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

  if (response.status === 401 && retry) {
    const nuevoToken = await refreshAccessToken();
    if (nuevoToken) {
      return apiClient(endpoint, {
        method,
        body,
        headers,
        responseType,
        retry: false,
      });
    } else {
      localStorage.removeItem("session");
      window.location.href = "/";
      throw new Error("Sesión expirada. Inicia sesión nuevamente.");
    }
  }

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
