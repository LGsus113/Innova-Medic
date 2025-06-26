export const ENDPOINTS = {
  USUARIO: {
    VALIDATION: () => "/login",
    PERFIL: (id: number) => `/api/usuario/${id}/perfil`,
  },
  PACIENTE: {
    LIST_CITA_PACIENTE: (id: number) => `/api/pacientes/cita/${id}`,
    ESPECIALIDADES: () => "/api/pacientes/especialidades",
    MEDICOS: (especialidad: string) =>
      `/api/pacientes/lista-medicos?especialidad=${encodeURIComponent(
        especialidad
      )}`,
    DISPONIBILIDAD: (idMedico: number, fechaInicio: string, fechaFin: string) =>
      `/api/cita/disponibilidad?idMedico=${idMedico}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
  },
  MEDICO: {
    LIST_CITA_MEDICO: (id: number) => `/api/medicos/cita/${id}`,
  },
  REGISTRO: {
    PACIENTE: () => "/api/pacientes/registrar",
  },
};
