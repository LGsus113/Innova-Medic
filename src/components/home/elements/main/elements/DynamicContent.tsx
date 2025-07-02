import Agenda from "@src/components/home/elements/main/elements/agendas/Agenda";
import Cita from "@src/components/home/elements/main/elements/citas/Cita";
import Recetas from "@src/components/home/elements/main/elements/recetas/Receta";
import Reservas from "@src/components/home/elements/main/elements/reservas/Reservas";
import LoadingComponent from "@src/components/utils/LoadingComponent";
import ErrorComponent from "@src/components/utils/ErrorComponent";
import { useAuthContext } from "@src/context/AuthContext";
import { useSectionContext } from "@src/context/SectionContext";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "@src/api/endpoints";
import { useApiRequest } from "@src/api/api-T/useApiRequest";

export default function DynamicContent() {
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const { userId, role } = useAuthContext();
  const { activeSection } = useSectionContext();

  useEffect(() => {
    if (!userId || !role) return;

    if (role === "Medico") {
      setEndpoint(ENDPOINTS.MEDICO.LIST_CITA_MEDICO(userId));
    } else if (role === "Paciente") {
      setEndpoint(ENDPOINTS.PACIENTE.LIST_CITA_PACIENTE(userId));
    } else {
      setEndpoint(null);
    }
  }, [userId, role]);

  const { data, loading, error, refetch } = useApiRequest(endpoint || "", {
    method: "GET",
    autoFetch: !!endpoint,
  });

  const citas = data?.status === "success" ? data.data : [];

  return (
    <div className="grow min-h-0 flex flex-col gap-5">
      <h1 className="shrink-0 font-signika text-3xl text-white font-bold">
        {
          {
            citas: "Citas Pendientes",
            agenda: "Agenda",
            recetas: "Recetas",
            reservar: "Agendar Nueva Cita",
          }[activeSection]
        }
      </h1>

      {activeSection === "citas" && (
        <>
          {loading && <LoadingComponent />}
          {error && <ErrorComponent error={error} onRetry={refetch} />}
          {!loading && !error && (
            <Cita citas={citas} onCitaRegistrada={refetch} />
          )}
        </>
      )}

      {activeSection === "agenda" && <Agenda citas={citas} />}

      {activeSection === "recetas" && <Recetas onCitaRegistrada={refetch} />}

      {activeSection === "reservar" && <Reservas onCitaRegistrada={refetch} />}
    </div>
  );
}
