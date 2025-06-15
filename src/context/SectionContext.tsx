import { createContext, useContext, useState } from "react";

const SectionContext = createContext<{
  activeSection: string;
  setActiveSection: (section: string) => void;
} | null>(null);

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("citas");

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
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
