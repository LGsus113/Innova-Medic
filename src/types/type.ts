import type { FormEvent, ButtonHTMLAttributes } from "react";

type ZIndexTailwind =
  | `z-${number}`
  | `z-[${string}]`
  | `-z-${number}`
  | `-z-[${string}]`
  | "";
type PositionTailwind = "static" | "relative" | "absolute" | "fixed" | "sticky";
type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "datetime-local"
  | "month"
  | "week"
  | "time"
  | "checkbox"
  | "radio"
  | "file"
  | "hidden"
  | "image"
  | "reset"
  | "submit"
  | "button";
export type EstadoCita =
  | "Pendiente"
  | "Confirmada"
  | "Cancelada"
  | "Finalizada"
  | string;
export type EstadoRangoFechas = "normal" | "cargando" | "error" | "no-medico";
export type MehtodRest = "GET" | "POST" | "PUT" | "DELETE";
export type Mes = "anterior" | "actual" | "siguiente";

export interface MarcaLogoProps {
  superposition: ZIndexTailwind;
}

export interface PropsContainer {
  children: React.ReactNode;
  superposition: ZIndexTailwind;
  positionContener: PositionTailwind;
}

export interface WrapProps {
  title: string;
  children: React.ReactNode;
}

export interface InputField {
  type?: InputType;
  placeholder?: string;
  id?: string;
  value?: string;
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  className?: string;
}

export interface TextAreaField {
  placeholder?: string;
  id?: string;
  children?: React.ReactNode;
  value: string;
  onInput: (value: string) => void;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  tipo?: 1 | 2;
}

interface PerfilBase {
  sexo: string;
  telefono: string;
  email: string;
}

interface DisponibilidadMedica {
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

export interface PerfilMedico extends PerfilBase {
  especialidad: string;
  numeroColegiado: string;
  disponibilidad: DisponibilidadMedica[];
}

export interface PerfilPaciente extends PerfilBase {
  fechaNacimiento: string;
  talla: string;
  grupoSanguineo: string;
  direccion: string;
}

export type PerfilUsuario = PerfilMedico | PerfilPaciente;

export interface UsuarioValidado {
  idUsuario: number;
  nombre: string;
  apellido: string;
  rol: string;
  perfil?: PerfilUsuario;
}

export interface SessionData {
  user: UsuarioValidado | null;
  token: string;
  refreshToken?: string;
  perfil?: PerfilUsuario | null;
}

export interface AuthContextType {
  user: UsuarioValidado | null;
  perfil: PerfilUsuario | null;
  error: string | null;
  loading: boolean;
  updateUser: (newUser: UsuarioValidado, token: string) => void;
  logout: () => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ token: string; usuario: UsuarioValidado }>;
  fetchPerfil: (forceUpdate?: boolean) => Promise<PerfilUsuario>;
  refreshPerfil: () => Promise<PerfilUsuario>;
  isAuthenticated: boolean;
  userId: number;
  fullName: string | null;
  role: string | null;
  clearError: () => void;
}

export interface Cita {
  idCitas: number;
  medico: {
    idUsuario: number;
    nombre: string;
    apellido: string;
    especialidad: string;
  };
  paciente: {
    idUsuario: number;
    nombre: string;
    apellido: string;
    grupoSanguineo?: string;
  };
  fecha: string;
  hora: string;
  tratamiento: string;
  notasMedicas: string;
  diagnostico: string;
  estado: EstadoCita;
  recetaDTO?: {
    idReceta: number;
    instruccionesAdicionales: string;
    firmaMedico: string;
    fecha: string;
    medicamentos: Array<{
      idMedicamento: number;
      nombre: string;
      dosis: string;
      frecuencia: string;
    }>;
  };
}

export interface CitaModalProps {
  citas: Cita[];
  onCitaRegistrada?: () => void;
}

export interface ParrafoInfoProps {
  title?: string;
  description?: string;
  classNames?: string;
}

export interface BotonMesProps {
  onCLick: () => void;
  children: string;
}

export interface SelectorMesProps {
  año: number;
  mes: number;
  onChange: (año: number, mes: number) => void;
}

interface CitaTooltip {
  id: number;
  paciente: string;
  hora: string;
  estado: string;
}

export interface TooltipCalendarProps {
  dia: number;
  x: number;
  y: number;
  citas: CitaTooltip[];
}

interface DiaCalendario {
  numero: number;
  mes: Mes;
}

export interface DiaCalendarioConCitas extends DiaCalendario {
  tieneCitas?: boolean;
  citas?: Cita[];
}

export interface Paciente {
  nombre: string;
  apellido: string;
  sexo: string;
  telefono: string;
  email: string;
  contrasenia: string;
  fechaNacimiento: string;
  talla: string;
  grupoSanguineo: string;
  direccion: string;
}

export interface DisponibilidadCardProps {
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

export interface PTextProps {
  title: string;
  content: string;
}

export interface UserAvatarProps extends PTextProps {
  sexo: string;
}

export interface MedicoPoEspecialidadProps {
  idUsuario: number;
  nombre: string;
  apellido: string;
}

export interface ComboEspecialidadesProps {
  especialidades: string[];
  value: string;
  onChange: (value: string) => void;
}

export interface ComboSexoProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export interface ComboMedicosPorEspecialidadProps {
  medicos: MedicoPoEspecialidadProps[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

interface SlotTime {
  horaInicio: string;
  horaFin: string;
  disponible: boolean;
}

export interface SlotPorDia {
  fecha: string;
  diaSemana: string;
  slots: SlotTime[];
}

export interface HorarioDisponibilidadProps {
  slots: SlotPorDia[];
  onClickSlot?: (slot: { fecha: string; horaInicio: string }) => void;
}

export interface RangoFechasProps {
  fechaInicio: string;
  fechaFin: string;
  onBack: () => void;
  onNext: () => void;
  disabled: boolean;
  puedeRetroceder: boolean;
  puedeAvanzar: boolean;
  estado: EstadoRangoFechas;
}

export interface DialogConfirmarCitaProps {
  slot: { fecha: string; horaInicio: string } | null;
  tratamiento: string;
  setTratamiento: (value: string) => void;
  onConfirmar: () => void;
  loading: boolean;
  error: String | null;
}

export interface DialogConfirmarCitaRef {
  open: () => void;
  close: () => void;
}

export interface CitaRecetaVaciaDTOProps {
  idMedico: number;
  idPaciente: number;
  fecha: string;
  hora: string;
  tratamiento: string;
}

export interface CitaRecetaProps {
  idCitas: number;
  tratamiento: string;
}

export interface DetalleCitaProps {
  cita: Cita;
  onClose: () => void;
  onCitaRegistrada?: () => void;
}

export interface PDFDialogProps {
  url: string;
  open: boolean;
  onClose: () => void;
  title?: string;
}

export interface MedicamentoProps {
  nombre: string;
  dosis: string;
  frecuencia: string;
}

interface ActionCitaMedicoDTO {
  notasMedicas: string;
  diagnostico: string;
  instruccionesAdicionales: string;
  medicamentos: MedicamentoProps[];
}

export interface FinalizarCitaBody {
  id: number;
  actionCitaMedicoDTO: ActionCitaMedicoDTO;
  nombreMedico: string;
}

export interface MedicamentosTableProps {
  medicamentos: MedicamentoProps[];
  setMedicamentos: React.Dispatch<React.SetStateAction<MedicamentoProps[]>>;
}

export interface RequestOptionsProps {
  method?: MehtodRest;
  body?: any;
  headers?: Record<string, string>;
  responseType?: "json" | "blob";
  retry?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  usuario: UsuarioValidado;
}

export interface ApiClientOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  responseType?: "json" | "blob";
  retry?: boolean;
}
