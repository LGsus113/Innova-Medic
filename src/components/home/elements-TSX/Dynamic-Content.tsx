import { activeSection } from "@src/utils/nav-state.tsx";
import CitaModal from "@src/components/home/elements-TSX/Cita-Modal";
import Agenda from "@src/components/home/elements-TSX/Agenda";
import Recetas from "@src/components/home/elements-TSX/Recetas";
import ErrorComponent from "@components/utilities/Error-Component";
import LoadingComponent from "@components/utilities/Loading-Component";
import { useCitasList } from "@utils/list-hooks";

export default function DynamicContent() {
  const medicoId = 1;
  const section = activeSection.value;
  const { citas, loading, error, refetch } = useCitasList(medicoId);

  return (
    <>
      <h1 className="font-signika text-3xl text-white font-bold">
        {
          {
            citas: "Citas Pendientes",
            agenda: "Agenda de Ana Garcia",
            recetas: "Recetas",
          }[section]
        }
      </h1>

      {section === "citas" && (
        <>
          {loading && <LoadingComponent />}
          {error && <ErrorComponent error={error} onRetry={refetch} />}
          {!loading && !error && <CitaModal citas={citas} />}
        </>
      )}

      {section === "agenda" && <Agenda citas={citas} />}

      {section === "recetas" && <Recetas />}
    </>
  );
}
