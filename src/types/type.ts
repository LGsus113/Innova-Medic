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
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  tipo?: 1 | 2;
}

export interface UsuarioValidado {
  idUsuario: number;
  nombre: string;
  apellido: string;
  rol: string;
}

export interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
}

export interface AuthContextType {
  user: UsuarioValidado | null;
  updateUser: (newUser: UsuarioValidado, token: string) => void;
  logout: () => void;
  login: (email: string, password: string) => Promise<{ token: string; usuario: UsuarioValidado }>;
  isAuthenticated: boolean;
  userId: number;
  fullName: string | null;
  role: string | null;
  loading: boolean;
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
    grupoSanguineo?: string; // Opcional por si no siempre viene
  };
  fecha: string;
  hora: string;
  tratamiento: string; // Antes era "title"
  notasMedicas: string; // Antes era "notas"
  diagnostico: string;
  estado: "Pendiente" | "Confirmada" | "Cancelada" | "Finalizada" | string;
  recetaDTO?: {
    // Opcional por si no todas las citas tienen receta
    idReceta: number;
    instruccionesAdicionales: string;
    firmaMedico: string;
    fecha: string;
    medicamentos: Array<{
      idMedicamento: number;
      medicamento: string;
    }>;
  };
}

export interface CitaModalProps {
  citas: Cita[];
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
  mes: "anterior" | "actual" | "siguiente";
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
