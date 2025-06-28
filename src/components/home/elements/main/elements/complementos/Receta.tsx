import { useState } from "react";
import { useSectionContext } from "@src/context/SectionContext";
import { useAuthContext } from "@src/context/AuthContext";
import { useFinalizarCita } from "@src/api/implements/finalizar-cita-hook";
import InputField from "@src/components/utils/Input-Field";
import TextAreaField from "@src/components/utils/Text-Area-Field";
import Button from "@src/components/utils/Button";
import AddMedicamentosTable from "@src/components/home/elements/main/elements/complementos/receta/AddMedicamentosTable";

import BodyScan from "@src/assets/svg/body-scan.svg?react";
import Notes from "@src/assets/svg/notes.svg?react";
import Recomendation from "@src/assets/svg/recomendation.svg?react";

export default function Receta({
  onCitaRegistrada,
}: {
  onCitaRegistrada?: () => void;
}) {
  const [diagnostico, setDiagnostico] = useState("");
  const [notas, setNotas] = useState("");
  const [recomendacion, setRecomendacion] = useState("");
  const [medicamentos, setMedicamentos] = useState([
    { nombre: "", dosis: "", frecuencia: "" },
  ]);

  const { citaActual, setActiveSection, setCitaActual } = useSectionContext();
  const { fullName } = useAuthContext();
  const { finalizarCita, loading, error } = useFinalizarCita();

  const cuerpo = {
    id: citaActual?.idCitas ?? 0,
    actionCitaMedicoDTO: {
      notasMedicas: notas,
      diagnostico: diagnostico,
      instruccionesAdicionales: recomendacion,
      medicamentos: medicamentos.filter(
        (m) => m.nombre && m.dosis && m.frecuencia
      ),
    },
    nombreMedico: fullName ?? "Desconocido",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!diagnostico || !notas || !recomendacion) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    if (cuerpo.actionCitaMedicoDTO.medicamentos.length === 0) {
      alert("Debe agregar al menos un medicamento completo.");
      return;
    }

    const success = await finalizarCita(cuerpo);

    if (success) {
      alert("Cita finalizada exitosamente.");
      setDiagnostico("");
      setNotas("");
      setRecomendacion("");
      setMedicamentos([{ nombre: "", dosis: "", frecuencia: "" }]);
      setCitaActual(null);
      setActiveSection("citas");
      onCitaRegistrada?.();
    } else if (error) {
      alert("Error: " + error);
    }
  };

  return (
    <div className="size-full flex flex-col gap-5 bg-util p-5 overflow-y-auto scroll-clean">
      <h1 className="text-teal-300 text-2xl font-signika">
        Cita {citaActual?.idCitas}:{" "}
        <span className="text-3xl text-pink-600">
          {citaActual?.tratamiento}
        </span>
      </h1>
      <form className="size-full flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Su diagnostico es..."
          id="diagnostico"
          value={diagnostico}
          onInput={(e) => setDiagnostico(e.currentTarget.value)}
        >
          <BodyScan className="text-white size-9" />
        </InputField>
        <TextAreaField
          placeholder="Los síntomas son..."
          id="notas"
          value={notas}
          onInput={setNotas}
        >
          <Notes className="text-white size-9" />
        </TextAreaField>
        <AddMedicamentosTable
          medicamentos={medicamentos}
          setMedicamentos={setMedicamentos}
        />
        <InputField
          type="text"
          placeholder="Las recomendaciones finales son..."
          id="recomendacion"
          value={recomendacion}
          onInput={(e) => setRecomendacion(e.currentTarget.value)}
        >
          <Recomendation className="text-white size-9" />
        </InputField>
        <div className="w-full pb-5 flex justify-end items-center">
          <Button
            title={loading ? "Finalizando..." : "Aceptar"}
            tipo={2}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
