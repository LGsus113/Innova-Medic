import { useState } from "react";
import { useEspecialidades } from "@src/api/implements/especialidades-hook";
import { useMedicoPorEspecialidad } from "@src/api/implements/medico-especialidad";
import { useDisponibilidad } from "@src/api/implements/disponibilidad-hook";
import { obtenerRangoSemanaActual } from "@src/components/utils/functions/disponibilidad-horaria";
import ComboEspecialidades from "@src/components/home/elements/main/elements/complementos/reserva/ComboEspecialidades";
import ComboMedicos from "@src/components/home/elements/main/elements/complementos/reserva/ComboMedicos";
import HorarioDisponibilidad from "@src/components/home/elements/main/elements/complementos/reserva/HorarioDisponibilidad";

export default function Reservas() {
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [medicoSeleccionado, setMedicoSeleccionado] = useState("");

  const {
    data: especialidades,
    loading: loadingEspecialidades,
    error: errorEspecialidades,
  } = useEspecialidades();

  const {
    data: medicos,
    loading: loadingMedicos,
    error: errorMedicos,
  } = useMedicoPorEspecialidad(especialidadSeleccionada);

  const { fechaInicio, fechaFin } = obtenerRangoSemanaActual();

  const {
    data: slots,
    loading: loadingSlots,
    error: errorSlots,
  } = useDisponibilidad(
    medicoSeleccionado ? Number(medicoSeleccionado) : -1,
    fechaInicio,
    fechaFin
  );

  const medicoDisabled = !especialidadSeleccionada || medicos.length === 0;

  console.log(medicoSeleccionado);
  console.log("fechas son: ", fechaInicio, "-", fechaFin);

  return (
    <div className="size-full p-4 rounded-xl bg-dark bg-[linear-gradient(to_right,#f0f0f011_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f011_1px,transparent_1px)] bg-[size:20px_20px] font-signika shadow-[inset_0_0_8px_2px_rgba(0,0,0,0.75)] text-white flex flex-col gap-4">
      <div className="flex gap-10 items-center justify-center">
        <div className="w-[260px] flex flex-col gap-1">
          <label className="ml-3 opacity-80">Especialidades</label>
          {loadingEspecialidades && (
            <p className="text-yellow-200 text-lg">
              Cargando especialidades...
            </p>
          )}
          {errorEspecialidades && (
            <p className="text-red-400 text-lg">{errorEspecialidades}</p>
          )}
          {!loadingEspecialidades && !errorEspecialidades && (
            <ComboEspecialidades
              especialidades={especialidades}
              value={especialidadSeleccionada}
              onChange={(value) => {
                setEspecialidadSeleccionada(value);
                setMedicoSeleccionado("");
              }}
            />
          )}
        </div>
        <div className="w-[260px] flex flex-col gap-1">
          <label className="ml-3 opacity-80">Médicos especialistas</label>
          {loadingMedicos && (
            <p className="text-yellow-200 text-lg">Cargando médicos...</p>
          )}
          {errorMedicos && (
            <p className="text-red-400 text-lg">{errorMedicos}</p>
          )}
          {!loadingMedicos && !errorMedicos && (
            <ComboMedicos
              medicos={medicos}
              value={medicoSeleccionado}
              onChange={setMedicoSeleccionado}
              disabled={medicoDisabled}
            />
          )}
        </div>
      </div>
      <div className="size-full overflow-auto flex justify-center items-center">
        {!medicoSeleccionado ? (
          <p className="text-neutral-400">
            Seleccione un médico para ver disponibilidad.
          </p>
        ) : loadingSlots ? (
          <p className="text-yellow-200">Cargando disponibilidad...</p>
        ) : errorSlots ? (
          <p className="text-red-500">{errorSlots}</p>
        ) : slots.length > 0 ? (
          <HorarioDisponibilidad slots={slots} />
        ) : (
          <p className="text-neutral-400">
            No hay disponibilidad para este médico.
          </p>
        )}
      </div>
    </div>
  );
}
