import { useRef, useImperativeHandle, forwardRef } from "react";
import type {
  DialogConfirmarCitaProps,
  DialogConfirmarCitaRef,
} from "@src/types/type";

const DialogReservas = forwardRef<
  DialogConfirmarCitaRef,
  DialogConfirmarCitaProps
>(({ slot, tratamiento, setTratamiento, onConfirmar, loading, error }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog
      ref={dialogRef}
      className="rounded-xl p-5 bg-dark bg-[linear-gradient(to_right,#f0f0f011_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f011_1px,transparent_1px)] bg-[size:20px_20px] font-signika shadow-[inset_0_0_8px_2px_rgba(0,0,0,0.75)] text-white border border-green-600 w-[90%] max-w-md m-auto"
    >
      <h2 className="text-center text-3xl text-green-600 font-bold mb-3">
        Confirmar Cita
      </h2>
      <p className="text-lg">
        Fecha: <strong className="text-xl">{slot?.fecha}</strong>
        <br />
        Hora: <strong className="text-xl">{slot?.horaInicio}</strong>
      </p>

      <label className="block mt-4 mb-1 text-sm text-neutral-300">
        Tratamiento:
      </label>
      <input
        type="text"
        className="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring focus:ring-green-500"
        value={tratamiento}
        onChange={(e) => setTratamiento(e.target.value)}
        placeholder="Ej: Evaluación general, examen de sangre..."
      />
      {error && (
        <div className="mt-2 bg-red-500/10 border border-red-400 text-red-300 text-sm p-2 rounded">
          {error}
        </div>
      )}
      <div className="mt-5 flex justify-end gap-3">
        <form method="dialog">
          <button className="px-4 py-2 bg-neutral-600 hover:bg-neutral-500 rounded">
            Cancelar
          </button>
        </form>
        <button
          onClick={onConfirmar}
          disabled={loading}
          className={`px-4 py-2 rounded ${
            loading
              ? "bg-green-800 cursor-not-allowed opacity-70"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {loading ? "Registrando..." : "Confirmar"}
        </button>
      </div>
    </dialog>
  );
});

export default DialogReservas;
