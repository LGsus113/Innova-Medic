import { useRef, useState, useEffect } from "react";
import { useAuthContext } from "@src/context/AuthContext";
import { useSectionContext } from "@src/context/SectionContext";
import { useDescargarRecetaPDF } from "@src/api/api-T/method/descargar-receta-pdf";
import { useActualizarEstadoCita } from "@src/api/api-T/method/estado-cita-hook";
import type { Cita, CitaModalProps, CitaRecetaProps } from "@src/types/type";
import DialogContent from "@src/components/home/elements/main/elements/complementos/modal/Dialog-Content";

export default function Cita({
  citas,
  onCitaRegistrada,
}: CitaModalProps & { onCitaRegistrada?: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);
  const { role } = useAuthContext();
  const { setActiveSection, setCitaActual } = useSectionContext();
  const { descargarPDF, loading, error } = useDescargarRecetaPDF();
  const {
    actualizarEstado,
    isLoading: loadingEstado,
    error: errorEstado,
  } = useActualizarEstadoCita();

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

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

  const handleAtender = async (cita: CitaRecetaProps | null) => {
    if (!cita) return;

    if (citaSeleccionada?.estado !== "Confirmada") {
      const success = await actualizarEstado(cita.idCitas, "Confirmada");
      if (!success) {
        alert(errorEstado || "No se pudo confirmar la cita.");
        return;
      }

      setCitaSeleccionada((prev) =>
        prev ? { ...prev, estado: "Confirmada" } : null
      );
    }

    setCitaActual({ idCitas: cita.idCitas, tratamiento: cita.tratamiento });
    setActiveSection("recetas");
    dialogRef.current?.close();
    onCitaRegistrada?.();
  };

  const handleCancelar = async () => {
    if (!citaSeleccionada) return;

    const success = await actualizarEstado(
      citaSeleccionada.idCitas,
      "Cancelada"
    );

    if (!success) {
      alert(errorEstado || "No se pudo cancelar la cita.");
      return;
    }

    alert("Cita cancelada correctamente.");
    dialogRef.current?.close();
    onCitaRegistrada?.();
  };

  useEffect(() => {
    if (errorEstado) {
      alert(errorEstado);
    }
  }, [errorEstado]);

  const puedeAtender = () => {
    if (!citaSeleccionada) return false;
    return (
      citaSeleccionada.estado !== "Finalizada" &&
      citaSeleccionada.estado !== "Cancelada" &&
      !loadingEstado
    );
  };

  const activarBotonPDF = () => {
    if (!citaSeleccionada) return false;
    return citaSeleccionada.estado === "Finalizada";
  };

  const noPuedesCancelar = () =>
    !citaSeleccionada ||
    ["Finalizada", "Cancelada"].includes(citaSeleccionada.estado) ||
    loadingEstado;

  return (
    <>
      <div className="w-full h-full flex flex-col gap-2 overflow-y-auto scroll-clean">
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
        className="w-1/2 h-[calc(60vh+6px)] border-none outline-none rounded-xl p-8 backdrop:bg-black/0 fixed mx-auto z-40 bg-util dialog-info-medic"
        onClose={closeModal}
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
              {role === "Medico" && (
                <>
                  <button
                    onClick={() =>
                      handleAtender({
                        idCitas: citaSeleccionada.idCitas,
                        tratamiento: citaSeleccionada.tratamiento,
                      })
                    }
                    className={`bg-teal-600 shadow-inner shadow-white/50 button-citas ${
                      !puedeAtender()
                        ? "opacity-50 cursor-not-allowed hover:brightness-95"
                        : ""
                    }`}
                    disabled={!puedeAtender()}
                  >
                    {loadingEstado ? "Confirmando..." : "Atender"}
                  </button>
                  <button className="bg-green-500 shadow-inner shadow-white/50 button-citas">
                    Editar Cita
                  </button>
                </>
              )}
              <button
                className={`bg-emerald-500 shadow-inner shadow-white/50 button-citas ${
                  loading
                    ? "opacity-50 cursor-wait"
                    : !activarBotonPDF()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  if (citaSeleccionada.idCitas) {
                    descargarPDF(citaSeleccionada.idCitas);
                  }
                }}
                disabled={!activarBotonPDF() || loading}
              >
                {loading ? "Descargando..." : "Descargar Receta"}
              </button>
              <button
                onClick={handleCancelar}
                className={`bg-red-400 shadow-inner shadow-white/50 button-citas ${
                  loadingEstado
                    ? "opacity-50 cursor-wait"
                    : noPuedesCancelar()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={noPuedesCancelar()}
              >
                {loadingEstado ? "Cancelando..." : "Cancelar Cita"}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
