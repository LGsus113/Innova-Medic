export const ENDPOINTS = {
  USUARIO: {
    VALIDATION: () => "/usuarios/log",
    LIST_CITA_MEDICO: (id: number) => `/usuarios/medicos/cita/${id}`,
    LIST_CITA_PACIENTE: (id: number) => `/usuarios/pacientes/cita/${id}`,
  },
};
