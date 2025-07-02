import { ENDPOINTS } from "@src/api/endpoints";
import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { parseApiResponse } from "@src/api/api-T/parseApiResponse";
import type { Paciente } from "@src/types/type";

export function useRegisterPaciente() {
  const { loading, refetch: ejecutarRegistro } = useApiRequest<{
    message: string;
  }>(ENDPOINTS.REGISTRO.PACIENTE(), {
    method: "POST",
    autoFetch: false,
  });

  const registrarPaciente = async (paciente: Paciente) => {
    try {
      const response = await ejecutarRegistro({ body: paciente });

      const { data: parsed, error: parseError } = parseApiResponse<{
        message?: string;
      }>(response);

      if (parseError) {
        return {
          success: false,
          errorMsg: parseError,
        };
      }

      const mensaje = parsed?.message ?? response.message ?? "Registro exitoso";

      return { success: true, message: mensaje };
    } catch (err: any) {
      return {
        success: false,
        errorMsg: err.message || "Error desconocido al registrar.",
      };
    }
  };

  return { registrarPaciente, loading };
}
