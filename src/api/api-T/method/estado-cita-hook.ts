import { ENDPOINTS } from "@src/api/endpoints";
import { useApiRequest } from "@src/api/api-T/useApiRequest";

export function useActualizarEstadoCita() {
  const {
    loading: isLoading,
    error,
    refetch: ejecutarCambioEstado,
  } = useApiRequest<{ estado: string }>("", {
    method: "PUT",
    autoFetch: false,
  });

  const actualizarEstado = async (idCita: number, nuevoEstado: string) => {
    try {
      const response = await ejecutarCambioEstado({
        responseType: "json",
      }, ENDPOINTS.USUARIO.ESTADO_CITA(idCita, nuevoEstado));

      const estadoActualizado = response?.estado;
      if (!estadoActualizado) {
        throw new Error("No se pudo actualizar el estado.");
      }

      return true;
    } catch (err) {
      return false;
    }
  };

  return { actualizarEstado, isLoading, error };
}