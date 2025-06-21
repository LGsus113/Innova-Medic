import type { apiClientProps } from "@src/types/type";

const BASE_URL = "http://localhost:8080";

export async function apiClient<T = any>(
  endpoint: string,
  {
    method = "GET",
    body,
    headers = {},
    retry = true,
    onTokenRefresh,
  }: apiClientProps = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const sessionStr = localStorage.getItem("session");
  let session: any = sessionStr ? JSON.parse(sessionStr) : null;

  const accessToken = session?.accessToken || null;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, config);

  if (response.status === 401 && session?.refreshToken && retry) {
    try {
      const refreshResp = await fetch(`${BASE_URL}/api/usuario/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: session.refreshToken }),
      });

      if (!refreshResp.ok) {
        throw new Error("Refresh token inválido");
      }

      const { accessToken: nuevoToken } = await refreshResp.json();

      const nuevaSesion = {
        ...session,
        accessToken: nuevoToken,
      };
      localStorage.setItem("session", JSON.stringify(nuevaSesion));

      if (onTokenRefresh) {
        onTokenRefresh(nuevoToken);
      }

      return await apiClient(endpoint, {
        method,
        body,
        headers,
        retry: false,
        onTokenRefresh,
      });
    } catch (err) {
      localStorage.removeItem("session");
      throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Api error");
  }

  return response.json();
}
