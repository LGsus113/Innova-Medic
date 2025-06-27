import { useState, useCallback } from "react";
import { ENDPOINTS } from "@src/api/endpoints";
import { apiClient } from "@src/api/client";

export function useDescargarRecetaPDF() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const descargarPDF = useCallback(async (idCita: number) => {
    setLoading(true), setError(null);

    try {
      const blob = await apiClient(ENDPOINTS.USUARIO.RECETA_PDF(idCita), {
        method: "GET",
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(blob as Blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `receta-${idCita}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error("Error al descargar receta:", err);
      setError(err.message || "Error inesperado al descargar PDF.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { descargarPDF, loading, error };
}
