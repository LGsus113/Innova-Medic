import type { SlotPorDia, HorarioDisponibilidadProps } from "@src/types/type";

const DIAS_ORDEN = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const generarHoras = () => {
  const horas: string[] = [];
  for (let h = 8; h < 20; h++) {
    const horaInicio = `${String(h).padStart(2, "0")}:00`;
    horas.push(horaInicio);
  }
  return horas;
};

const normalizarSlots = (slots: SlotPorDia[]) => {
  const mapa: Record<
    string,
    Record<
      string,
      {
        mitad1: SlotPorDia["slots"][number] | null;
        mitad2: SlotPorDia["slots"][number] | null;
      } | null
    >
  > = {};

  for (let h = 8; h < 20; h++) {
    const horaStr = `${String(h).padStart(2, "0")}:00`;
    mapa[horaStr] = {};
    for (const dia of DIAS_ORDEN) {
      mapa[horaStr][dia] = null;
    }
  }

  for (const dia of slots) {
    for (let h = 8; h < 20; h++) {
      const horaInicio = `${String(h).padStart(2, "0")}:00`;
      const mitad1 = `${String(h).padStart(2, "0")}:00`;
      const mitad2 = `${String(h).padStart(2, "0")}:30`;

      const slot1 = dia.slots.find((s) => s.horaInicio === mitad1);
      const slot2 = dia.slots.find((s) => s.horaInicio === mitad2);

      if (slot1 || slot2) {
        mapa[horaInicio][dia.diaSemana] = {
          mitad1: slot1 ?? null,
          mitad2: slot2 ?? null,
        };
      }
    }
  }

  return mapa;
};

export default function HorarioDisponibilidad({
  slots,
  onClickSlot,
}: HorarioDisponibilidadProps) {
  const horas = generarHoras();
  const normalizado = normalizarSlots(slots);

  const diaActualNombre = new Intl.DateTimeFormat("es-PE", {
    weekday: "long",
  })
    .format(new Date())
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <table className="table-auto text-sm text-white w-full border-collapse border border-neutral-500">
      <thead>
        <tr className="text-center">
          <th className="p-1 border border-neutral-500">Hora</th>
          {DIAS_ORDEN.map((dia) => (
            <th
              key={dia}
              className={`p-1 ${
                dia === diaActualNombre ? "bg-neutral-600/40" : ""
              }`}
            >
              {dia}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {horas.map((hora) => (
          <tr key={hora}>
            <td className="p-1 whitespace-nowrap font-semibold text-center">
              {hora} -{" "}
              {`${String(Number(hora.split(":")[0]) + 1).padStart(2, "0")}:00`}
            </td>
            {DIAS_ORDEN.map((dia) => {
              const estado = normalizado[hora][dia];
              const diaInfo = slots.find((s) => s.diaSemana === dia);

              return (
                <td key={dia} className="p-1 border border-neutral-500">
                  <div className="grid grid-cols-2 gap-1.5">
                    <div
                      className={`h-5 rounded ${
                        estado?.mitad1?.disponible === true
                          ? "bg-green-500/75 hover:cursor-pointer"
                          : estado?.mitad1?.disponible === false
                          ? "bg-red-500/75 hover:cursor-not-allowed"
                          : "bg-neutral-600/75 hover:cursor-not-allowed"
                      } brightness-90 hover:brightness-110`}
                      title="Slot 1"
                      onClick={() => {
                        if (
                          estado?.mitad1?.disponible &&
                          onClickSlot &&
                          diaInfo
                        ) {
                          onClickSlot({
                            horaInicio: estado.mitad1.horaInicio,
                            fecha: diaInfo.fecha,
                          });
                        }
                      }}
                    ></div>
                    <div
                      className={`h-5 rounded ${
                        estado?.mitad2?.disponible === true
                          ? "bg-green-500/75 hover:cursor-pointer"
                          : estado?.mitad2?.disponible === false
                          ? "bg-red-500/75 hover:cursor-not-allowed"
                          : "bg-neutral-600/75 hover:cursor-not-allowed"
                      } brightness-90 hover:brightness-110`}
                      title="Slot 2"
                      onClick={() => {
                        if (
                          estado?.mitad2?.disponible &&
                          onClickSlot &&
                          diaInfo
                        ) {
                          onClickSlot({
                            horaInicio: estado.mitad2.horaInicio,
                            fecha: diaInfo.fecha,
                          });
                        }
                      }}
                    ></div>
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
