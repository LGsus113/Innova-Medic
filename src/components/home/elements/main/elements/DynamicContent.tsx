import Agenda from "@src/components/home/elements/main/elements/complementos/Agenda";
import Cita from "@src/components/home/elements/main/elements/complementos/Cita";
import Recetas from "@src/components/home/elements/main/elements/complementos/Receta";
import LoadingComponent from "@src/components/utils/LoadingComponent";
import ErrorComponent from "@src/components/utils/ErrorComponent";
import { useAuthContext } from "@src/context/AuthContext";
import { useSectionContext } from "@src/context/SectionContext";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "@src/api/endpoints";
import { useCitasList } from "@src/api/implements/cita-hook";

export default function DynamicContent() {
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const { userId, role } = useAuthContext();
  const { activeSection } = useSectionContext();

  useEffect(() => {
    if (!userId || !role) return;

    if (role === "Medico") {
      setEndpoint(ENDPOINTS.USUARIO.LIST_CITA_MEDICO(userId));
    } else if (role === "Paciente") {
      setEndpoint(ENDPOINTS.USUARIO.LIST_CITA_PACIENTE(userId));
    } else {
      setEndpoint(null);
    }
  }, [userId, role]);

  const { data, loading, error, refetch } = useCitasList(endpoint);

  return (
    <>
      <h1 className="font-signika text-3xl text-white font-bold">
        {
          {
            citas: "Citas Pendientes",
            agenda: "Agenda",
            recetas: "Recetas",
            reservar: "Agendar Nueva Cita"
          }[activeSection]
        }
      </h1>

      {activeSection === "citas" && (
        <>
          {loading && <LoadingComponent />}
          {error && <ErrorComponent error={error} onRetry={refetch} />}
          {!loading && !error && <Cita citas={data} />}
        </>
      )}

      {activeSection === "agenda" && <Agenda citas={data} />}

      {activeSection === "recetas" && <Recetas />}

      {activeSection === "reservar" && <p>Hola reservas...</p>}
    </>
  );
}