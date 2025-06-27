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

  const config: RequestInit = {
    method,
    headers: {
      ...(responseType !== "blob" && {
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Api error");
  }

  return responseType === "blob" ? response.blob() : response.json();
}
