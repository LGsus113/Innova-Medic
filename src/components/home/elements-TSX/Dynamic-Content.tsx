import { activeSection } from "@src/utils/nav-state.tsx";
import CitaModal from "@src/components/home/elements-TSX/Cita-Modal";
import Agenda from "@src/components/home/elements-TSX/Agenda";
import Recetas from "@src/components/home/elements-TSX/Recetas";
import { useState, useEffect } from "preact/hooks";
import { apiClient } from "@src/api/client";
import { ENDPOINTS } from "@src/api/endpoints";

export default function DynamicContent() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const medicoId = 1;

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const data = await apiClient(ENDPOINTS.CITA_MEDICO.LIST(medicoId));
        setCitas(data);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Error desconocido");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCitas();
  }, [medicoId]);

  if (loading) return <p>Cargando citas...</p>;
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <>
      <h1 className="font-signika text-3xl text-white font-bold">
        {
          {
            citas: "Citas Pendientes",
            agenda: "Agenda de Ana Garcia",
            recetas: "Recetas",
          }[activeSection.value]
        }
      </h1>
      {
        {
          citas: <CitaModal citas={citas} />,
          agenda: <Agenda citas={citas} />,
          recetas: <Recetas />,
        }[activeSection.value]
      }
    </>
  );
}
