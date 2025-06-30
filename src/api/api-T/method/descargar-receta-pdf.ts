import { ENDPOINTS } from "@src/api/endpoints";
import { useApiRequest } from "@src/api/api-T/useApiRequest";

export function useDescargarRecetaPDF() {
  const {
    refetch: descargar,
    loading,
    error,
  } = useApiRequest<Blob>("", {
    method: "GET",
    responseType: "blob",
    autoFetch: false,
  });

  const descargarPDF = async (idCita: number) => {
    try {
      const blob = await descargar({}, ENDPOINTS.USUARIO.RECETA_PDF(idCita));

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `receta-${idCita}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error al descargar receta:", err);
    }
  };

  return { descargarPDF, loading, error };
}
