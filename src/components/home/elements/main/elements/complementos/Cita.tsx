import { useRef, useState, useEffect } from "react";
import type { Cita, CitaModalProps } from "@src/types/type";
import DialogContent from "@src/components/home/elements/main/elements/complementos/modal/Dialog-Content";

export default function Cita({ citas }: CitaModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

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
        {citas.length === 0 ? (
          <div className="size-full flex justify-center items-center text-white/60">
            <h1 className="text-xl">No hay citas registradas por el momento.</h1>
          </div>
        ) : (
          citas.map((cita, i) => {
            const { paciente, fecha, hora, tratamiento } = cita;

            return (
              <article
                key={i}
                className="w-full h-auto p-3 bg-white/80 rounded-lg flex border-l-[5px] border-pink-600 shadow-inner shadow-black/50 cursor-pointer hover:bg-white/70 transition"
                onClick={() => openModal(cita)}
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

      <dialog
        ref={dialogRef}
        className="w-1/2 h-[calc(60vh+6px)] border-none outline-none rounded-xl p-8 backdrop:bg-black/0 fixed mx-auto z-40 bg-dark dialog-info-medic bg-[linear-gradient(to_right,#f0f0f011_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f011_1px,transparent_1px)] bg-[size:20px_20px]"
        onClose={() => closeModal()}
      >
        {citaSeleccionada && (
          <div className="flex flex-col gap-5 h-full">
            <div className="w-full flex justify-between items-center shrink-0">
              <h2 className="text-5xl font-signika font-bold text-amber-100">
                Detalles de Cita {citaSeleccionada.idCitas}
              </h2>
              <form method="dialog" className="flex justify-end">
                <button className="bg-pink-600 shadow-inner shadow-white/50 button-citas">
                  Regresar a la lista
                </button>
              </form>
            </div>
            <div className="font-signika flex flex-col gap-5 overflow-y-auto grow scroll-clean pr-2">
              <DialogContent citaSeleccionada={citaSeleccionada} />
            </div>
            <div className="flex items-center justify-end gap-5">
              <button className="bg-green-500 shadow-inner shadow-white/50 button-citas">
                Editar Cita
              </button>
              <button className="bg-red-400 shadow-inner shadow-white/50 button-citas">
                Cancelar Cita
              </button>
              <button
                className={`bg-teal-600 shadow-inner shadow-white/50 button-citas ${
                  citaSeleccionada.estado === "Finalizada"
                    ? "opacity-50 cursor-not-allowed hover:brightness-95"
                    : ""
                }`}
                disabled={citaSeleccionada.estado === "Finalizada"}
              >
                Atender
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
