import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@src/context/AuthContext";
import { useSectionContext } from "@src/context/SectionContext";
import { useDescargarRecetaPDF } from "@src/api/api-T/method/descargar-receta-pdf";
import { useActualizarEstadoCita } from "@src/api/api-T/method/estado-cita-hook";
import type { CitaRecetaProps, DetalleCitaProps } from "@src/types/type";
import CitaContent from "@src/components/home/elements/main/elements/citas/components/CitaContent";
import PDFDialog from "@src/components/home/elements/main/elements/citas/components/PDFDialog";

export default function DetalleCita({
  cita,
  onClose,
  onCitaRegistrada,
}: DetalleCitaProps) {
  const [urlPDF, setUrlPDF] = useState<string | null>(null);
  const pdfDialogRef = useRef<HTMLDialogElement>(null);
  const { role } = useAuthContext();
  const { setActiveSection, setCitaActual } = useSectionContext();
  const { obtenerURLBlob, loading, error } =
    useDescargarRecetaPDF();
  const {
    actualizarEstado,
    isLoading: loadingEstado,
    error: errorEstado,
  } = useActualizarEstadoCita();

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  useEffect(() => {
    if (errorEstado) alert(errorEstado);
  }, [errorEstado]);

  const handleAtender = async (citaData: CitaRecetaProps | null) => {
    if (!citaData) return;

    if (cita.estado !== "Confirmada") {
      const success = await actualizarEstado(citaData.idCitas, "Confirmada");
      if (!success) {
        alert(errorEstado || "No se pudo confirmar la cita.");
        return;
      }
    }

    setCitaActual({
      idCitas: citaData.idCitas,
      tratamiento: citaData.tratamiento,
    });
    setActiveSection("recetas");
    onCitaRegistrada?.();
    onClose();
  };

  const handleCancelar = async () => {
    const success = await actualizarEstado(cita.idCitas, "Cancelada");

    if (!success) {
      alert(errorEstado || "No se pudo cancelar la cita.");
      return;
    }

    alert("Cita cancelada correctamente.");
    onCitaRegistrada?.();
    onClose();
  };

  const puedeAtender = () => {
    return !["Finalizada", "Cancelada"].includes(cita.estado) && !loadingEstado;
  };

  const activarBotonPDF = () => cita.estado === "Finalizada";

  const noPuedesCancelar = () =>
    ["Finalizada", "Cancelada"].includes(cita.estado) || loadingEstado;

  const abrirVistaPrevia = async () => {
    const url = await obtenerURLBlob(cita.idCitas);
    if (url) {
      setUrlPDF(url);
      pdfDialogRef.current?.showModal();
    }
  };

  const cerrarVistaPrevia = () => {
    setUrlPDF(null);
    pdfDialogRef.current?.close();
  };

  return (
    <div className="grow min-h-0 flex flex-col gap-5 p-5 bg-dark rounded-md bg-util">
      <div className="w-full h-auto flex justify-between items-center">
        <h2 className="text-5xl font-signika font-bold text-amber-100">
          Detalles de Cita {cita.idCitas}
        </h2>
        <button
          onClick={onClose}
          className="bg-pink-600 shadow-inner shadow-white/50 button-citas"
        >
          Regresar a la lista
        </button>
      </div>
      <div className="w-full min-h-0 font-signika flex flex-col grow gap-5 overflow-y-auto scroll-clean pr-2">
        <CitaContent citaSeleccionada={cita} />
      </div>
      <div className="w-full h-auto flex items-center justify-end gap-5">
        {role === "Medico" && (
          <>
            <button
              onClick={() =>
                handleAtender({
                  idCitas: cita.idCitas,
                  tratamiento: cita.tratamiento,
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
          onClick={abrirVistaPrevia}
          className={`bg-emerald-500 shadow-inner shadow-white/50 button-citas ${
            loading
              ? "opacity-50 cursor-wait"
              : !activarBotonPDF()
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={!activarBotonPDF() || loading}
        >
          {loading ? "Cargando..." : "Ver Receta"}
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
      {urlPDF && (
        <PDFDialog
          url={urlPDF!}
          open={!!urlPDF}
          onClose={cerrarVistaPrevia}
        />
      )}
    </div>
  );
}
