import Agenda from "@src/components/home/elements/main/elements/agendas/Agenda";
import Cita from "@src/components/home/elements/main/elements/citas/Cita";
import Recetas from "@src/components/home/elements/main/elements/recetas/Receta";
import Reservas from "@src/components/home/elements/main/elements/reservas/Reservas";
import LoadingComponent from "@src/components/utils/LoadingComponent";
import ErrorComponent from "@src/components/utils/ErrorComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { useAuthContext } from "@src/context/AuthContext";
import { useSectionContext } from "@src/context/SectionContext";
import { useEffect, useState } from "react";
import { useCitaLista } from "@src/api/api-T/method/lista-citas";
import { endpointCita } from "@src/functions/endpoint-cita";

export default function DynamicContent() {
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [estadoFiltro, setEstadoFiltro] = useState<string | null>(null);
  const { userId, role } = useAuthContext();
  const { activeSection } = useSectionContext();

  useEffect(() => {
    const endpointGenerado = endpointCita(
      role,
      activeSection,
      userId,
      estadoFiltro
    );
    setEndpoint(endpointGenerado);
  }, [userId, role, activeSection, estadoFiltro]);

  const { citas, loading, error, refetch } = useCitaLista(endpoint || "");

  const classItem =
    "relative cursor-default select-none py-1.5 pl-8 pr-2 rounded-sm hover:bg-neutral-300/75 focus:bg-neutral-300/75 font-normal";

  return (
    <div className="grow min-h-0 flex flex-col gap-3">
      <div className="w-full h-auto flex items-center justify-between">
        <h1 className="flex-1 font-signika text-3xl text-white font-bold">
          {
            {
              citas: "Lista de Citas",
              agenda: `Tu agenda`,
              recetas: "Atencio Cita",
              reservar: "Nueva Cita",
            }[activeSection]
          }
        </h1>
        {activeSection === "citas" && (
          <span className="w-16 text-center bg-white/15 py-0.5 shrink-0 font-signika font-bold text-2xl text-teal-400 rounded-full shadow-inner shadow-black/50">
            {citas?.length}
          </span>
        )}
        {activeSection === "citas" && (
          <div className="flex-1 flex justify-end">
            <Select
              value={estadoFiltro ?? "todas"}
              onValueChange={(value) =>
                setEstadoFiltro(value === "todas" ? null : value)
              }
            >
              <SelectTrigger className="w-[260px] bg-dark/50 border-white/70 text-white">
                <SelectValue placeholder="Estado a filtrar" />
              </SelectTrigger>
              <SelectContent className="bg-dark text-white border-white/60">
                <SelectItem value="Pendiente" className={classItem}>
                  Pendientes
                </SelectItem>
                <SelectItem value="Cancelada" className={classItem}>
                  Canceladas
                </SelectItem>
                <SelectItem value="Finalizada" className={classItem}>
                  Finalizadas
                </SelectItem>
                <SelectItem value="todas" className={classItem}>
                  Todas
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {activeSection === "citas" && (
        <>
          {loading && <LoadingComponent />}
          {error && <ErrorComponent error={error} onRetry={refetch} />}
          {!loading && !error && (
            <Cita citas={citas ?? []} onCitaRegistrada={refetch} />
          )}
        </>
      )}

      {activeSection === "agenda" && <Agenda citas={citas ?? []} />}

      {activeSection === "recetas" && <Recetas onCitaRegistrada={refetch} />}

      {activeSection === "reservar" && <Reservas onCitaRegistrada={refetch} />}
    </div>
  );
}
