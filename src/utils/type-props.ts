type AstroComponent = () => Promise<{ html: string }>;
export interface SetupProps {
  MainComponent: AstroComponent;
}

export interface LayoutProps {
  title?: string;
  description?: string;
}

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
export interface InputField {
  type?: InputType;
  placeholder?: string;
  id?: string;
}

type ZIndexTailwind =
  | `z-${number}`
  | `z-[${string}]`
  | `-z-${number}`
  | `-z-[${string}]`
  | "";
type PositionTailwind = "static" | "relative" | "absolute" | "fixed" | "sticky";
export interface ZIndex {
  superposition?: ZIndexTailwind;
  positionContener?: PositionTailwind;
}

export interface Cita {
  title: string;
  paciente: string;
  fecha: string;
  hora: string;
  duracion: string;
  medico: string;
  estado: "Pendiente" | "Confirmada" | "Cancelada" | "Finalizada" | string;
  notas: string;
  diagnostico: string;
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

export interface TooltipCalendarProps {
  dia: number;
  x: number;
  y: number;
  citas: Cita[];
}
