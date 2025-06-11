export const ENDPOINTS = {
  USUARIO: {
    VALIDATION: () => "/usuarios/log"
  },
  CITA_MEDICO: {
    LIST: (id: number) => `/usuarios/medicos/cita/${id}`,
  }
}