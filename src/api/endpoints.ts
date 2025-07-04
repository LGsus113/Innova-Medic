export const ENDPOINTS = {
  USUARIO: {
    VALIDATION: () => "/login",
    PERFIL: (id: number) => `/api/usuario/${id}/perfil`,
    ESTADO_CITA: (id: number, estado: string) =>
      `/api/cita/actualizar/${id}/estado?estado=${estado}`,
    RECETA_PDF: (id: number) => `/api/cita/${id}/receta-pdf`,
  },
  PACIENTE: {
    LIST_CITA_PACIENTE: (id: number, estado?: string) => {
      let base = `/api/pacientes/cita/${id}`;
      return estado ? `${base}?estado=${estado}` : base;
    },
    ESPECIALIDADES: () => "/api/pacientes/especialidades",
    MEDICOS: (especialidad: string) =>
      `/api/pacientes/lista-medicos?especialidad=${encodeURIComponent(
        especialidad
      )}`,
    DISPONIBILIDAD: (idMedico: number, fechaInicio: string, fechaFin: string) =>
      `/api/cita/disponibilidad?idMedico=${idMedico}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
  },
  MEDICO: {
    LIST_CITA_MEDICO: (id: number, estado?: string) => {
      let base = `/api/medicos/cita/${id}`;
      return estado ? `${base}?estado=${estado}` : base;
    },
    FINALIZAR_CITA: () => "/api/cita/finalizar/informacion",
  },
  REGISTRO: {
    PACIENTE: () => "/api/pacientes/registrar",
    CITA: () => "/api/cita/registrar",
  },
};
