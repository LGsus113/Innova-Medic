import type { ComponentChildren } from "preact";

type AstroComponent = () => Promise<{ html: string }>;

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

type ZIndexTailwind =
  | `z-${number}`
  | `z-[${string}]`
  | `-z-${number}`
  | `-z-[${string}]`
  | "";

type PositionTailwind = "static" | "relative" | "absolute" | "fixed" | "sticky";

export interface SetupProps {
  MainComponent: AstroComponent;
}

export interface LayoutProps {
  title?: string;
  description?: string;
}

export interface InputField {
  type?: InputType;
  placeholder?: string;
  id?: string;
  children?: ComponentChildren;
}

export interface ZIndex {
  superposition?: ZIndexTailwind;
  positionContener?: PositionTailwind;
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
  recetaDTO?: { // Opcional por si no todas las citas tienen receta
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

export interface ParrafoInfoProps {
  title?: string;
  description?: string;
  classNames?: string;
}

export interface CitaModalProps {
  citas: Cita[];
}

interface DiaCalendario {
  numero: number;
  mes: "anterior" | "actual" | "siguiente";
}

export interface DiaCalendarioConCitas extends DiaCalendario {
  tieneCitas?: boolean;
  citas?: Cita[];
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

export interface BotonMesProps {
  onCLick: () => void;
  children: string;
}

export interface SelectorMesProps {
  año: number;
  mes: number;
  onChange: (año: number, mes: number) => void;
}

export interface ButtonProps {
  title: string;
  tipo?: 1 | 2;
}
