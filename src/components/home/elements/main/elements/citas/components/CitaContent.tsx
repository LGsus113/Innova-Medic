import ParrafoInfo from "@src/components/home/elements/main/elements/citas/components/Parrafo-Info";
import type { Cita } from "@src/types/type";

function getEstadoColor(estado: string) {
  switch (estado) {
    case "Pendiente":
      return "text-yellow-500";
    case "Confirmada":
      return "text-green-600";
    case "Cancelada":
      return "text-red-500";
    case "Finalizada":
      return "text-blue-500";
    default:
      return "text-black";
  }
}

export default function CitaContent({
  citaSeleccionada,
}: {
  citaSeleccionada: Cita;
}) {
  const stylep = "w-full h-auto flex [&>p]:basis-full [&>p]:flex-wrap";

  const {
    tratamiento,
    fecha,
    hora,
    medico,
    paciente,
    estado,
    notasMedicas,
    diagnostico,
    recetaDTO,
  } = citaSeleccionada;
  const {
    nombre: nombreMedico,
    apellido: apellidoMedico,
    especialidad,
  } = medico;
  const { nombre: nombrePaciente, apellido: apellidoPaciente } = paciente;

  return (
    <>
      <div className={stylep}>
        <ParrafoInfo title="Tratamiento:" description={tratamiento} />
        <ParrafoInfo title="Fecha:" description={fecha} />
      </div>
      <div className={stylep}>
        <ParrafoInfo title="Hora:" description={hora} />
        <ParrafoInfo title="Especialidad:" description={especialidad} />
      </div>
      <div className={stylep}>
        <ParrafoInfo
          title="Médico:"
          description={`${nombreMedico} ${apellidoMedico}`}
        />
        <ParrafoInfo
          title="Paciente:"
          description={`${nombrePaciente} ${apellidoPaciente}`}
        />
      </div>
      <ParrafoInfo
        title="Estado:"
        description={estado}
        classNames={getEstadoColor(estado)}
      />
      <div className={stylep}>
        <ParrafoInfo title="Notas:" description={notasMedicas} />
        <ParrafoInfo title="Diagnóstico:" description={diagnostico} />
      </div>
      {recetaDTO && (
        <>
          <h1 className="text-4xl font-signika font-bold text-green-500 brightness-95 mt-7">
            Receta medica
          </h1>
          <div className={stylep}>
            <ParrafoInfo
              title="Nro. y fecha de receta:"
              description={`${recetaDTO.idReceta} - (${recetaDTO.fecha})`}
            />
            <ParrafoInfo
              title="Firma del Doctor:"
              description={`${recetaDTO.firmaMedico}`}
            />
          </div>
          <ParrafoInfo
            title="Instrucciones adicionales:"
            description={recetaDTO.instruccionesAdicionales}
          />
          {recetaDTO.medicamentos?.length > 0 && (
            <>
              <ParrafoInfo
                title="Medicamentos:"
                description="La siguiente lista de medicamentos es especial para este caso."
              />
              <ul className="list-disc pl-6">
                {recetaDTO.medicamentos.map((medicamento) => {
                  const contentMedicamento = `${medicamento.nombre} ${medicamento.dosis} ${medicamento.frecuencia}`;

                  return (
                    <li
                      className="list-none text-teal-200 text-xl"
                      key={medicamento.idMedicamento}
                    >
                      <p>
                        <strong className="font-signika not-italic text-white text-lg mr-1">
                          -
                        </strong>
                        {contentMedicamento}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
}
