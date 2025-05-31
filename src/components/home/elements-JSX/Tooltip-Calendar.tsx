import type { TooltipCalendarProps } from "@utils/type-props";

export default function TooltipCalendar({
  dia,
  x,
  y,
  citas,
}: TooltipCalendarProps) {
  return (
    <div
      className="absolute z-50 bg-white text-black p-3 rounded-lg shadow-lg min-w-[200px] pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y + 30}px`,
      }}
    >
      <h3 className="font-bold mb-2">Citas del día {dia}</h3>
      <ul className="space-y-2">
        {citas.map((cita) => (
          <li key={cita.title} className="border-b pb-2 last:border-b-0">
            <p>
              <strong>Paciente:</strong> {cita.paciente}
            </p>
            <p>
              <strong>Hora:</strong> {cita.hora} ({cita.duracion})
            </p>
            <p>
              <strong>Estado:</strong> {cita.estado}
            </p>
            {cita.notas && <p className="text-sm italic">{cita.notas}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
