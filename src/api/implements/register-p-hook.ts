import { useState } from "react";
import { apiClient } from "@src/api/client";
import { ENDPOINTS } from "@src/api/endpoints";
import { parseApiResponse } from "@src/components/utils/functions/parseApiResponse";
import type { Paciente } from "@src/types/type";

export function useRegisterPaciente() {
  const [loading, setLoading] = useState(false);

  async function registrarPaciente(paciente: Paciente) {
    try {
      setLoading(true);

      const response = await apiClient(ENDPOINTS.REGISTRO.PACIENTE(), {
        method: "POST",
        body: paciente,
      });

      const { message, error } = parseApiResponse(response);

      if (error) {
        return { success: false, errorMsg: error };
      }

      return { success: true, message: message || "Registro completado." };
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Error desconocido al registrar.";
      return { success: false, errorMsg };
    } finally {
      setLoading(false);
    }
  }

  return { registrarPaciente, loading };
}
