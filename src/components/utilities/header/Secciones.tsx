import { activeSection } from "@src/utils/nav-state.tsx";

const HEADERS = [
  { label: "Mis Citas", key: "citas" },
  { label: "Mi Agenda", key: "agenda" },
  { label: "Recetas", key: "recetas" },
];

export default function Secciones() {
  return (
    <ul className="flex">
      {HEADERS.map((item) => (
        <li key={item.key} className="px-5 group" data-list-linkers>
          <button
            className={`text-white cursor-pointer transition-all duration-150 py-[2px] ${
              activeSection.value === item.key ? "brightness-115" : "brightness-85 group-hover:brightness-90"
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
