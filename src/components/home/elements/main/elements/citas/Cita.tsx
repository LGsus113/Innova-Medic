import { useState } from "react";
import type { Cita, CitaModalProps } from "@src/types/type";
import DetalleCita from "@src/components/home/elements/main/elements/citas/components/DetalleCita";

export default function Cita({ citas, onCitaRegistrada }: CitaModalProps) {
  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

  const openCita = (cita: Cita) => {
    setCitaSeleccionada(cita);
  };

  const cerrarDetalle = () => {
    setCitaSeleccionada(null);
  };

  const detalleCitaCondicional = () =>
    citaSeleccionada
      ? "opacity-100 pointer-events-auto"
      : "opacity-0 pointer-events-none";

  const listaCitasCondicional = () =>
    citaSeleccionada ? "opacity-0 pointer-events-none" : "opacity-100";

  return (
    <div className="grow min-h-0 relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${listaCitasCondicional()}`}
      >
        <div className="flex flex-col gap-2 h-full overflow-y-auto scroll-clean">
          {!citas || citas.length === 0 ? (
            <div className="size-full flex justify-center items-center text-white/60">
              <h1 className="text-xl">
                No hay citas registradas por el momento.
              </h1>
            </div>
          ) : (
            citas.map((cita, i) => {
              const { paciente, fecha, hora, tratamiento } = cita;

              return (
                <article
                  key={i}
                  className="w-full h-auto p-3 bg-white/80 rounded-lg flex border-l-[5px] border-pink-600 shadow-inner shadow-black/50 cursor-pointer hover:bg-white/70 transition"
                  onClick={() => openCita(cita)}
                >
                  <div className="flex flex-col basis-0 grow-1">
                    <h1 className="text-2xl font-signika font-bold text-pink-600">
                      {tratamiento}
                    </h1>
                    <p className="text-xl text-dark/60">
                      Paciente: {paciente.nombre} {paciente.apellido}
                    </p>
                  </div>
                  <div className="flex flex-col basis-0 grow-1 items-end">
                    <p className="text-xl text-dark/60">{fecha}</p>
                    <p className="text-xl text-dark/60">{hora}</p>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-300 flex flex-col h-full ${detalleCitaCondicional()}`}
      >
        {citaSeleccionada && (
          <DetalleCita
            cita={citaSeleccionada}
            onClose={cerrarDetalle}
            onCitaRegistrada={onCitaRegistrada}
          />
        )}
      </div>
    </div>
  );
}
