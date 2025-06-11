import { activeSection } from "@src/utils/nav-state.tsx";
import { getUsuarioRol } from "@utils/login-signin";

export default function Secciones() {
  const rol = getUsuarioRol();

  const headers =
    rol === "Medico"
      ? [
          { label: "Mis Citas", key: "citas" },
          { label: "Mi Agenda", key: "agenda" },
          { label: "Recetas", key: "recetas" },
        ]
      : rol === "Paciente"
      ? [
          { label: "Reservar Cita", key: "reservar" },
          { label: "Mis Recetas", key: "misRecetas" },
          { label: "Mis pagos", key: "misPagos" },
        ]
      : [];

  return (
    <ul className="flex">
      {headers.map((item) => (
        <li key={item.key} className="px-5 group" data-list-linkers>
          <button
            className={`text-white cursor-pointer transition-all duration-150 py-[2px] ${
              activeSection.value === item.key
                ? "brightness-115"
                : "brightness-85 group-hover:brightness-90"
            }`}
            onClick={() => (activeSection.value = item.key)}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
