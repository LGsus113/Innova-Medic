import { ENDPOINTS } from "@src/api/endpoints";

export function endpointCita(
  role: string | null,
  section: string,
  userId: number | null,
  estadoFiltro?: string | null
): string | null {
  if (!userId || !role) return null;

  const isCitaSection = section === "citas";

  if (role === "Medico") {
    return isCitaSection
      ? ENDPOINTS.MEDICO.LIST_CITA_MEDICO(userId, estadoFiltro || undefined)
      : ENDPOINTS.MEDICO.LIST_CITA_MEDICO(userId);
  }

  if (role === "Paciente") {
    return isCitaSection
      ? ENDPOINTS.PACIENTE.LIST_CITA_PACIENTE(userId, estadoFiltro || undefined)
      : ENDPOINTS.PACIENTE.LIST_CITA_PACIENTE(userId);
  }

  return null;
}
