import { useAuthContext } from "@src/context/AuthContext";
import { useSectionContext } from "@src/context/SectionContext";

export default function Secciones() {
  const { role } = useAuthContext();
  const { activeSection, setActiveSection, citaActual } = useSectionContext();

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
            } ${
              item.key === "recetas" && !citaActual
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => {
              if (item.key === "recetas" && !citaActual) {
                alert("Primero debes seleccionar una cita para atender.");
                return;
              }
              setActiveSection(item.key);
            }}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
