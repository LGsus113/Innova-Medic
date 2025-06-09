const BASE_URL = "http://localhost:8080";

export async function apiClient(
  endpoint: string,
  { method = "GET", body, headers = {} }: { method?: string; body?: any; headers?: Record<string, string>} = {}
) {
  const url = `${BASE_URL}${endpoint}`;
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Api error");
  }

  return response.json();
}