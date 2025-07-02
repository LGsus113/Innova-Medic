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

  const obtenerURLBlob = async (idCita: number): Promise<string | null> => {
    try {
      const blob = await descargar({}, ENDPOINTS.USUARIO.RECETA_PDF(idCita));
      return window.URL.createObjectURL(blob);
    } catch (err) {
      alert("Error al obtener receta PDF: " + err);
      return null;
    }
  };

  return { obtenerURLBlob, loading, error };
}
