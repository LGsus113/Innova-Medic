export async function refreshAccessToken(
  BASE_URL: string
): Promise<string | null> {
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

    if (!res.ok) {
      const errorText = await res.text().catch(() => null);
      console.error("Error al refrescar token:", errorText);
      return null;
    }

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
