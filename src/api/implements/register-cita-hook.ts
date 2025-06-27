import { useState } from "react";
import { useApi } from "@src/api/api-T/api-hook";
import { ENDPOINTS } from "@src/api/endpoints";
import type { CitaRecetaVaciaDTOProps } from "src/types/type";

export function useRegistrarCita() {
  const { fetchData } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ idCita: number } | null>(null);

  const registrar = async (cita: CitaRecetaVaciaDTOProps) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchData(ENDPOINTS.REGISTRO.CITA(), {
        method: "POST",
        body: cita,
      });

      if (result?.status === "success" && result.data?.idCita) {
        setData(result.data);
        return result.data;
      } else {
        const msg = result?.message || "No se pudo registrar la cita.";
        setError(msg);
        throw new Error(msg);
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registrar, loading, error, data };
}
