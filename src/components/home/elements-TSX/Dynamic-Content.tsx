import { activeSection } from "@src/utils/nav-state.tsx";
import CitaModal from "@src/components/home/elements-TSX/Cita-Modal";
import Agenda from "@src/components/home/elements-TSX/Agenda";
import Recetas from "@src/components/home/elements-TSX/Recetas";

export default function DynamicContent() {
  const citas = [
    {
      title: "Consulta general",
      paciente: "María Rodriguez",
      medico: "Dr. Ana García",
      fecha: "2025-05-14",
      hora: "10:00 a.m.",
      duracion: "30 min",
      estado: "Finalizada",
      notas: "Paciente presenta síntomas de resfriado. Se recomienda reposo.",
      diagnostico: "Resfriado común",
    },
    {
      title: "Seguimiento Cardiológico",
      paciente: "Juan Gonzáles",
      medico: "Dr. Ana García",
      fecha: "2025-05-18",
      hora: "09:00 a. m.",
      duracion: "50 min",
      estado: "Pendiente",
      notas: "Sin notas.",
      diagnostico: "Sin diagnóstico.",
    },
  ];

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
