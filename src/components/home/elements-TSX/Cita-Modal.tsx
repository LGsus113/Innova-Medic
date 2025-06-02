import { useRef, useState, useEffect } from "preact/hooks";
import type { ParrafoInfoProps, Cita, CitaModalProps } from "@utils/type-props";

function ParrafoInfo({
  title = "",
  description = "",
  classNames = "",
}: ParrafoInfoProps) {
  const finalColor = classNames || "text-white/90";

  return (
    <p className={`text-xl font-playwrite italic ${finalColor}`}>
      <strong className="font-signika not-italic text-white/55 text-lg">
        {title}
      </strong>
      <br />
      {description}
    </p>
  );
}

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

export default function CitaModal({ citas }: CitaModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

  const stylep = "w-full flex [&>p]:basis-full [&>p]:flex-wrap";

  useEffect(() => {
    if (citaSeleccionada && dialogRef.current) {
      const header = document.getElementById("header-home");
      const dialog = dialogRef.current;

      if (header) {
        const headerHeight = header.offsetHeight;
        dialog.style.top = `${headerHeight + 20}px`;
      }

      dialogRef.current.showModal();
    }
  }, [citaSeleccionada]);

  const openModal = (cita: Cita) => {
    setCitaSeleccionada(cita);
  };

  const closeModal = () => {
    setCitaSeleccionada(null);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-2 overflow-y-auto scroll-clean">
        {citas.map((cita, i) => {
          const { title, paciente, fecha, hora } = cita;

          return (
            <article
              key={i}
              className="w-full h-auto p-3 bg-white/80 rounded-lg flex shadow-inner shadow-black/50 cursor-pointer hover:bg-white/70 transition"
              onClick={() => openModal(cita)}
            >
              <div className="flex flex-col basis-0 grow-1">
                <h1 className="text-2xl font-signika font-bold text-pink-600">
                  {title}
                </h1>
                <p className="text-xl text-dark/60">Paciente: {paciente}</p>
              </div>
              <div class="flex flex-col basis-0 grow-1 items-end">
                <p className="text-xl text-dark/60">{fecha}</p>
                <p className="text-xl text-dark/60">{hora}</p>
              </div>
            </article>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        closedby="any"
        className="w-1/2 h-[calc(60vh+6px)] border-none outline-none rounded-xl p-8 backdrop:bg-black/0 fixed mx-auto z-40 bg-dark dialog-info-medic bg-[linear-gradient(to_right,#f0f0f011_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f011_1px,transparent_1px)] bg-[size:20px_20px]"
        onClose={() => closeModal()}
      >
        {citaSeleccionada && (
          <div className="flex flex-col gap-5 h-full">
            <div className="w-full flex justify-between items-center shrink-0">
              <h2 className="text-5xl font-signika font-bold text-amber-100">
                Detalles de Cita {citaSeleccionada.cod}
              </h2>
              <form method="dialog" className="flex justify-end">
                <button className="bg-pink-600 shadow-inner shadow-white/50 button-citas">
                  Regresar a la lista
                </button>
              </form>
            </div>

            <div className="font-signika flex flex-col gap-5 overflow-y-auto grow scroll-clean pr-2">
              <div className={stylep}>
                <ParrafoInfo
                  title="Tratamiento:"
                  description={citaSeleccionada.title}
                />
                <ParrafoInfo
                  title="Fecha:"
                  description={citaSeleccionada.fecha}
                />
              </div>
              <div className={stylep}>
                <ParrafoInfo
                  title="Hora:"
                  description={citaSeleccionada.hora}
                />
                <ParrafoInfo
                  title="Duración (min):"
                  description={citaSeleccionada.duracion}
                />
              </div>
              <div className={stylep}>
                <ParrafoInfo
                  title="Médico:"
                  description={citaSeleccionada.medico}
                />
                <ParrafoInfo
                  title="Paciente:"
                  description={citaSeleccionada.paciente}
                />
              </div>
              <ParrafoInfo
                title="Estado:"
                description={citaSeleccionada.estado}
                classNames={getEstadoColor(citaSeleccionada.estado)}
              />
              <ParrafoInfo
                title="Notas:"
                description={citaSeleccionada.notas}
              />
              <ParrafoInfo
                title="Diagnóstico:"
                description={citaSeleccionada.diagnostico}
              />
            </div>
            <div class="flex items-center justify-end gap-5">
              <button className="bg-green-500 shadow-inner shadow-white/50 button-citas">
                Editar Cita
              </button>
              <button className="bg-red-400 shadow-inner shadow-white/50 button-citas">
                Cancelar Cita
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
