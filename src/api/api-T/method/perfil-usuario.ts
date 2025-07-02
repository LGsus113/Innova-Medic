import { ENDPOINTS } from "@src/api/endpoints";
import { useApiRequest } from "@src/api/api-T/useApiRequest";
import { parseApiResponse } from "@src/api/api-T/parseApiResponse";
import type { PerfilUsuario } from "@src/types/type";

export function usePerfilUsuario(userId: number | undefined) {
  const {
    refetch: obtenerPerfil,
    loading,
    error,
  } = useApiRequest(ENDPOINTS.USUARIO.PERFIL(userId || 0), {
    method: "GET",
    autoFetch: false,
  });

  const fetchPerfil = async (): Promise<PerfilUsuario> => {
    const response = await obtenerPerfil();
    const { data, error } = parseApiResponse<PerfilUsuario>(response);

    if (error || !data) {
      throw new Error(error || "No se pudo obtener el perfil del usuario.");
    }

    return data;
  };

  return { fetchPerfil, loading, error };
}
