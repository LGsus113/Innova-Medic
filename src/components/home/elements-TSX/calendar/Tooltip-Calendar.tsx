import type { TooltipCalendarProps } from "@utils/type-props";

export default function TooltipCalendar({
  dia,
  x,
  y,
  citas,
}: TooltipCalendarProps) {
  return (
    <div
      className="absolute z-50 bg-white text-black p-3 rounded-lg shadow-lg shadow-black/65 min-w-[200px] pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y + 30}px`,
      }}
    >
      <h3 className="text-xl font-bold mb-2">Citas del día {dia}</h3>
      <ul className="space-y-3">
        {citas.map((cita) => (
          <li key={cita.title} className="border-b pb-2 last:border-b-0 flex gap-3 items-center">
            <div className="flex flex-col">
              <p>
                <strong>Paciente:</strong> {cita.paciente}
              </p>
              <p>
                <strong>Hora:</strong> {cita.hora} ({cita.duracion})
              </p>
            </div>
            <p className="font-bold">
              Cita {cita.estado}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
