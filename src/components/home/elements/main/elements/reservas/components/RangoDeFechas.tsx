import type { RangoFechasProps } from "@src/types/type";
import Left from "@src/assets/svg/left.svg?react";
import Right from "@src/assets/svg/right.svg?react";

export default function RangoDeFechas({
  fechaInicio,
  fechaFin,
  onBack,
  onNext,
  disabled,
  puedeRetroceder,
  puedeAvanzar,
  estado,
}: RangoFechasProps) {
  const mensaje =
    estado === "no-medico"
      ? "Selecciona un médico para ver fechas."
      : estado === "cargando"
      ? "Cargando fechas..."
      : estado === "error"
      ? "Ocurrió un error al cargar disponibilidad."
      : null;

  return (
    <div className="w-auto flex flex-col gap-1">
      <div className="w-full flex justify-between items-center">
        <label className="ml-3 opacity-80">Rango de fechas</label>
        <div className="mr-3 flex gap-1">
          <button
            onClick={onBack}
            disabled={disabled || !puedeRetroceder}
            className={`bg-transparent border-none outline-none ${
              !puedeRetroceder || disabled
                ? "opacity-30 cursor-not-allowed"
                : "hover:brightness-110"
            }`}
          >
            <Left className="text-xl" />
          </button>
          <button
            onClick={onNext}
            disabled={disabled || !puedeAvanzar}
            className={`bg-transparent border-none outline-none ${
              !puedeAvanzar || disabled
                ? "opacity-30 cursor-not-allowed"
                : "hover:brightness-110"
            }`}
          >
            <Right className="text-xl" />
          </button>
        </div>
      </div>
      <div className="w-[260px] p-1 text-center border border-white/70 bg-dark/50 rounded-sm">
        {mensaje ? (
          <p className="text-neutral-400 text-sm">{mensaje}</p>
        ) : (
          <h2 className="text-xl text-white/70">
            <span className="text-emerald-400">{fechaInicio}</span> /{" "}
            <span className="text-teal-400">{fechaFin}</span>
          </h2>
        )}
      </div>
    </div>
  );
}
