import { useAuthContext } from "@src/context/AuthContext";
import { useSectionContext } from "@src/context/SectionContext";

export default function Secciones() {
  const { role } = useAuthContext();
  const { activeSection, setActiveSection } = useSectionContext();

  const HEADERS =
    role === "Medico"
      ? [
          { label: "Mis Citas", key: "citas" },
          { label: "Mi Agenda", key: "agenda" },
          { label: "Recetas", key: "recetas" },
        ]
      : role === "Paciente"
      ? [
          { label: "Mis Citas", key: "citas" },
          { label: "Reservar", key: "reservar" },
        ]
      : [];

  return (
    <ul className="flex">
      {HEADERS.map((item) => (
        <li key={item.key} className="px-5 group" data-list-linkers>
          <button
            className={`text-white cursor-pointer transition-all duration-150 py-[2px] ${
              activeSection === item.key
                ? "brightness-115"
                : "brightness-85 group-hover:brightness-90"
            }`}
            onClick={() => setActiveSection(item.key)}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
