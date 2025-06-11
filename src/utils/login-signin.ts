import { apiClient } from "@src/api/client";
import { ENDPOINTS } from "@src/api/endpoints";

export async function login(email: string, password: string) {
  try {
    const response = await apiClient(ENDPOINTS.USUARIO.VALIDATION(), {
      method: "POST",
      body: { email, password },
    });

    return response;
  } catch (err: any) {
    let message = "Ocurrió un error inesperado.";

    if (err instanceof Error) {
      if (err.message.includes("Failed to fetch")) {
        message = "No se pudo conectar con el servidor. Verifica tu conexión.";
      } else if (err.message.includes("timeout")) {
        message = "La solicitud tardó demasiado. Intenta de nuevo.";
      } else {
        message = err.message;
      }
    }

    console.error("Error en login:", message);
    throw new Error(message);
  }
}

export function getUsuarioRol(): string | null {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    return usuario?.rol || null;
  } catch (err) {
    return null;
  }
}
