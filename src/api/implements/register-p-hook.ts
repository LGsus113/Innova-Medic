import { useState } from "react";
import { apiClient } from "@src/api/client";
import { ENDPOINTS } from "@src/api/endpoints";
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

      const message = response.data?.message || "Registro completado.";

      return { success: true, message };
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.errorMsg ||
        err.message ||
        "Error desconocido al registrar.";
      return { success: false, errorMsg };
    } finally {
      setLoading(false);
    }
  }

  return { registrarPaciente, loading };
}
