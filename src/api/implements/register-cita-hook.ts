import { useState } from "react";
import { useApi } from "@src/api/api-T/api-hook";
import { ENDPOINTS } from "@src/api/endpoints";
import { parseApiResponse } from "@src/components/utils/functions/parseApiResponse";
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

      const {
        data: resultData,
        message,
        error,
      } = parseApiResponse<{ idCita: number }>(result);

      const idCita = resultData?.idCita ?? result?.idCita;

      if (error || !idCita) {
        const msg = error || message || "No se pudo registrar la cita.";
        setError(msg);
        throw new Error(msg);
      }

      const finalData = { idCita };
      setData(finalData);
      return finalData;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registrar, loading, error, data };
}
