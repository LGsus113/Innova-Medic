import { useCitasList } from "@utils/list-hooks";
import { useEffect, useState } from "preact/hooks";
import { getUsuarioId, getUsuarioRol } from "@utils/login-signin";
import { ENDPOINTS } from "@src/api/endpoints";
import { activeSection } from "@src/utils/nav-state.tsx";
import CitaModal from "@src/components/home/elements-TSX/Cita-Modal";
import Agenda from "@src/components/home/elements-TSX/Agenda";
import Recetas from "@src/components/home/elements-TSX/Recetas";
import ErrorComponent from "@components/utilities/Error-Component";
import LoadingComponent from "@components/utilities/Loading-Component";

export default function DynamicContent() {
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const section = activeSection.value;

  useEffect(() => {
    const id = getUsuarioId();
    const rol = getUsuarioRol();

    if (rol === "Medico") {
      setEndpoint(ENDPOINTS.USUARIO.LIST_CITA_MEDICO(id));
    } else if (rol === "Paciente") {
      setEndpoint(ENDPOINTS.USUARIO.LIST_CITA_PACIENTE(id));
    } else {
      setEndpoint(null);
    }
  }, []);

  const { data, loading, error, refetch } = useCitasList(endpoint);

  return (
    <>
      <h1 className="font-signika text-3xl text-white font-bold">
        {
          {
            citas: "Citas Pendientes",
            agenda: "Agenda de Ana Garcia",
            recetas: "Recetas",
            reservar: "Reservar Cita",
          }[section]
        }
      </h1>

      {section === "citas" && (
        <>
          {loading && <LoadingComponent />}
          {error && <ErrorComponent error={error} onRetry={refetch} />}
          {!loading && !error && <CitaModal citas={data} />}
        </>
      )}

      {section === "agenda" && <Agenda citas={data} />}

      {section === "recetas" && <Recetas />}

      {section === "reservar" && <p>Hola reservas...</p>}
    </>
  );
}
