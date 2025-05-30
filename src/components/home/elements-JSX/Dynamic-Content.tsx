import { activeSection } from "@src/utils/nav-state.tsx";
import CitaModal from "@components/home/elements-JSX/Cita-Modal.tsx";
import Agenda from "@components/home/elements-JSX/Agenda.tsx";
import Recetas from "@components/home/elements-JSX/Recetas.tsx";

export default function DynamicContent() {
  const citas = [
    {
      title: "Consulta general",
      paciente: "María Rodriguez",
      medico: "Dr. Ana García",
      fecha: "14 de noviembre de 2023",
      hora: "10:00 a. m.",
      duracion: "30",
      estado: "Finalizada",
      notas: "Paciente presenta síntomas de resfriado. Se recomienda reposo.",
      diagnostico: "Resfriado común",
    },
    {
      title: "Seguimiento Cardiológico",
      paciente: "Juan Gonzáles",
      medico: "Dr. Ana García",
      fecha: "16 de noviembre de 2023",
      hora: "09:00 a. m.",
      duracion: "50",
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
          agenda: <Agenda />,
          recetas: <Recetas />,
        }[activeSection.value]
      }
    </>
  );
}
