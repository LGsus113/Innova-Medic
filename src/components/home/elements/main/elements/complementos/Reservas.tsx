import { useRef, useState } from "react";
import { useAuthContext } from "@src/context/AuthContext";
import { useEspecialidades } from "@src/api/implements/especialidades-hook";
import { useMedicoPorEspecialidad } from "@src/api/implements/medico-especialidad";
import { useDisponibilidad } from "@src/api/implements/disponibilidad-hook";
import { obtenerRangoSemanaActual } from "@src/components/utils/functions/disponibilidad-horaria";
import { useRegistrarCita } from "@src/api/implements/register-cita-hook";
import type { DialogConfirmarCitaRef } from "@src/types/type";
import ComboEspecialidades from "@src/components/home/elements/main/elements/complementos/reserva/ComboEspecialidades";
import ComboMedicos from "@src/components/home/elements/main/elements/complementos/reserva/ComboMedicos";
import RangoDeFechas from "@src/components/home/elements/main/elements/complementos/reserva/RangoDeFechas";
import HorarioDisponibilidad from "@src/components/home/elements/main/elements/complementos/reserva/HorarioDisponibilidad";
import DialogReservas from "@src/components/home/elements/main/elements/complementos/reserva/DialogReservas";

export default function Reservas({
  onCitaRegistrada,
}: {
  onCitaRegistrada?: () => void;
}) {
  const { userId } = useAuthContext();
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [medicoSeleccionado, setMedicoSeleccionado] = useState("");
  const [semanaIndex, setSemanaIndex] = useState(0);
  const [slotSeleccionado, setSlotSeleccionado] = useState<{
    fecha: string;
    horaInicio: string;
  } | null>(null);
  const [tratamiento, setTratamiento] = useState("");

  const dialogRef = useRef<DialogConfirmarCitaRef>(null);

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

  const { fechaInicio, fechaFin } = obtenerRangoSemanaActual(semanaIndex);
  const puedeRetroceder = semanaIndex > 0;
  const puedeAvanzar = semanaIndex < 3;

  const retrocederSemana = () => {
    if (puedeRetroceder) setSemanaIndex((prev) => prev - 1);
  };

  const avanzarSemana = () => {
    if (puedeAvanzar) setSemanaIndex((prev) => prev + 1);
  };

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

  const handleClickSlot = (slot: { fecha: string; horaInicio: string }) => {
    setSlotSeleccionado(slot);
    setTratamiento("");
    dialogRef.current?.open();
  };

  const {
    registrar,
    loading: registrando,
    error: errorRegistro,
  } = useRegistrarCita();

  const handleConfirmarCita = async () => {
    if (
      !slotSeleccionado ||
      !tratamiento.trim() ||
      !userId ||
      !medicoSeleccionado
    )
      return;

    const cita = {
      idMedico: Number(medicoSeleccionado),
      idPaciente: Number(userId),
      fecha: slotSeleccionado.fecha,
      hora: slotSeleccionado.horaInicio + ":00",
      tratamiento: tratamiento.trim(),
    };

    try {
      const res = await registrar(cita);
      alert(`Cita registrada con éxito. Código: ${res.idCita}`);
      dialogRef.current?.close();
      setMedicoSeleccionado("");
      setEspecialidadSeleccionada("");
      setTratamiento("");
      setSlotSeleccionado(null);
      onCitaRegistrada?.();
    } catch (err) {
      alert(`Error al registrar la cita:\n${(err as Error).message}`);
    }
  };

  return (
    <>
      <div className="size-full p-4 rounded-xl bg-util font-signika text-white flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="w-auto h-auto flex gap-5 items-center justify-center">
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
          <RangoDeFechas
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            onBack={retrocederSemana}
            onNext={avanzarSemana}
            disabled={!medicoSeleccionado}
            puedeRetroceder={puedeRetroceder}
            puedeAvanzar={puedeAvanzar}
            estado={
              !medicoSeleccionado
                ? "no-medico"
                : loadingSlots
                ? "cargando"
                : errorSlots
                ? "error"
                : "normal"
            }
          />
        </div>
        <div className="size-full overflow-auto flex justify-center items-center">
          {(() => {
            if (!medicoSeleccionado) {
              return (
                <p className="text-neutral-400">
                  Seleccione un médico para ver disponibilidad.
                </p>
              );
            }
            if (loadingSlots) {
              return (
                <p className="text-yellow-200">Cargando disponibilidad...</p>
              );
            }
            if (errorSlots) {
              return <p className="text-red-500">{errorSlots}</p>;
            }
            if (slots.length === 0) {
              return (
                <p className="text-neutral-400">
                  No hay disponibilidad para este médico.
                </p>
              );
            }
            return (
              <HorarioDisponibilidad
                slots={slots}
                onClickSlot={handleClickSlot}
              />
            );
          })()}
        </div>
      </div>
      <DialogReservas
        ref={dialogRef}
        slot={slotSeleccionado}
        tratamiento={tratamiento}
        setTratamiento={setTratamiento}
        onConfirmar={handleConfirmarCita}
        loading={registrando}
        error={errorRegistro}
      />
    </>
  );
}
