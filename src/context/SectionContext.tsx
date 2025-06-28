import { createContext, useContext, useState } from "react";
import type { CitaRecetaProps } from "@src/types/type";

const SectionContext = createContext<{
  activeSection: string;
  setActiveSection: (section: string) => void;
  citaActual: CitaRecetaProps | null;
  setCitaActual: (cita: CitaRecetaProps | null) => void;
} | null>(null);

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("citas");
  const [citaActual, setCitaActual] = useState<CitaRecetaProps | null>(null);

  return (
    <SectionContext.Provider
      value={{ activeSection, setActiveSection, citaActual, setCitaActual }}
    >
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionContext() {
  const context = useContext(SectionContext);
  if (!context)
    throw new Error("useSection debe usarse dentro de SectionProvider");
  return context;
}
