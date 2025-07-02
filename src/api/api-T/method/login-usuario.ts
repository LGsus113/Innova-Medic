import { ENDPOINTS } from "@src/api/endpoints";
import { useApiRequest } from "@src/api/api-T/useApiRequest";
import type { LoginResponse } from "@src/types/type";

export function useLoginUsuario() {
  const { loading, refetch: ejecutarLogin } = useApiRequest<LoginResponse>(
    ENDPOINTS.USUARIO.VALIDATION(),
    {
      method: "POST",
      autoFetch: false,
    }
  );

  const loginUsuario = async (email: string, password: string) => {
    try {
      const response = await ejecutarLogin({
        body: { email, contrasenia: password },
      });

      if (!response?.token || !response?.usuario) {
        return {
          success: false,
          errorMsg: "Respuesta inválida del servidor.",
        };
      }

      return {
        success: true,
        token: response.token,
        refreshToken: response.refreshToken,
        usuario: response.usuario,
      };
    } catch (err: any) {
      return {
        success: false,
        errorMsg: err?.message || "Error inesperado al iniciar sesión.",
      };
    }
  };

  return { loginUsuario, loading };
}
