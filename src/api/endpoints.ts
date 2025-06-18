export const ENDPOINTS = {
  USUARIO: {
    VALIDATION: () => "/login",
    LIST_CITA_MEDICO: (id: number) => `/api/medicos/cita/${id}`,
    LIST_CITA_PACIENTE: (id: number) => `/api/pacientes/cita/${id}`,
    PERFIL: (id: number) => `/api/usuario/${id}/perfil`,
  },
  REGISTRO: {
    PACIENTE: () => "/api/pacientes/registrar",
  },
};
