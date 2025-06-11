import { apiClient } from "@src/api/client";
import { ENDPOINTS } from "@src/api/endpoints";
import type { UsuarioValidado } from "@utils/type-props";

function getUsuarioFromStorage(): UsuarioValidado | null {
  try {
    const stored = localStorage.getItem("usuario");
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.log("Error al parsear el usuario desde el localStorage");
    return null;
  }
}

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

export function getUsuarioId(): number {
  const usuario = getUsuarioFromStorage();
  return typeof usuario?.idUsuario === "number" ? usuario.idUsuario : 0;
}

export function getUsuarioNombreCompleto(): string | null {
  const usuario = getUsuarioFromStorage();

  if (
    typeof usuario?.nombre === "string" &&
    typeof usuario?.apellido === "string"
  )
    return `${usuario.nombre} ${usuario.apellido}`;

  return null;
}

export function getUsuarioRol(): string | null {
  const usuario = getUsuarioFromStorage();
  return typeof usuario?.rol === "string" ? usuario.rol : null;
}
