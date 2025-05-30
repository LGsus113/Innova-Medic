import { useState } from "preact/hooks";
import { obtenerDiaDelMes } from "@utils/calendar-functions";
import TooltipCalendar from "@components/home/elements-JSX/Tooltip-Calendar";
import type { CitaModalProps } from "@utils/type-props";

export default function Agenda({ citas = [] }: CitaModalProps) {
  const hoy = new Date();
  const [año, setAño] = useState(hoy.getFullYear());
  const [mes, setMes] = useState(hoy.getMonth());
  const [diaHover, setDiaHover] = useState<{
    dia: number;
    x: number;
    y: number;
  } | null>(null);

  const avanzarMes = () => {
    if (mes === 11) {
      setMes(0);
      setAño(año + 1);
    } else {
      setMes(mes + 1);
    }
  };

  const retrocederMes = () => {
    if (mes === 0) {
      setMes(11);
      setAño(año - 1);
    } else {
      setMes(mes - 1);
    }
  };

  const semanas = obtenerDiaDelMes(año, mes, citas);
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const citasDiaHover = diaHover
    ? semanas
        .flat()
        .find((d) => d.numero === diaHover.dia && d.mes === "actual")?.citas
    : [];

  const handleDiaMouseEnter = (dia: number, e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const calendarContainer = target.closest(".calendar-container");
    const containerRect = calendarContainer?.getBoundingClientRect();
    const rect = target.getBoundingClientRect();

    if (containerRect) {
      setDiaHover({
        dia,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top,
      });
    }
  };

  const handleDiaMouseLeave = () => {
    setDiaHover(null);
  };

  return (
    <div className="calendar-container p-4 rounded-xl bg-dark bg-[linear-gradient(to_right,#f0f0f011_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f011_1px,transparent_1px)] bg-[size:20px_20px] text-center size-full flex flex-col gap-3 font-signika shadow-[inset_0_0_8px_2px_rgba(0,0,0,0.75)] relative">
      <div className="w-full h-auto flex justify-between items-center">
        <button
          onClick={retrocederMes}
          className="bg-pink-600 shadow-inner shadow-white px-3 py-1 rounded-lg button-citas"
        >
          Anterior
        </button>
        <span className="text-lg font-semibold text-white">
          {meses[mes]} de {año}
        </span>
        <button
          onClick={avanzarMes}
          className="bg-pink-600 shadow-inner shadow-white px-3 py-1 rounded-lg button-citas"
        >
          Siguiente
        </button>
      </div>

      <div className="w-full h-auto grid grid-cols-7 text-md text-white/50">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="basis-0 grow grid grid-cols-7 gap-1 text-sm justify-center items-center">
        {semanas.map((semana, i) =>
          semana.map((dia, j) => {
            const esHoy =
              dia.numero === hoy.getDate() &&
              mes === hoy.getMonth() &&
              año === hoy.getFullYear() &&
              dia.mes === "actual";

            return (
              <div
                key={`${i}-${j}`}
                onMouseEnter={(e) =>
                  dia.mes === "actual" && handleDiaMouseEnter(dia.numero, e)
                }
                onMouseLeave={handleDiaMouseLeave}
                className={`
                  h-full rounded-lg flex items-start justify-start px-2 py-1 border relative
                  ${dia.mes === "actual" ? "opacity-100" : "opacity-50"}
                  ${
                    esHoy
                      ? "bg-pink-100 border-pink-100"
                      : "bg-neutral-400 border-white"
                  }
                  shadow-inner shadow-white hover:brightness-110
                `}
              >
                <span
                  className={`font-bold ${
                    dia.mes === "actual" ? "text-black" : "text-white"
                  }`}
                >
                  {dia.numero}
                </span>
                {dia.tieneCitas && dia.mes === "actual" && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-pink-600 rounded-full"></div>
                )}
              </div>
            );
          })
        )}
      </div>

      {diaHover && citasDiaHover && citasDiaHover.length > 0 && (
        <TooltipCalendar
          dia={diaHover.dia}
          x={diaHover.x}
          y={diaHover.y}
          citas={citasDiaHover}
        />
      )}
    </div>
  );
}
