import { useState } from "preact/hooks";
import type { DiaCalendario } from "@utils/type-props";

const obtenerDiaDelMes = (año: number, mes: number) => {
  const dias: DiaCalendario[][] = [];

  const primerDiaSemana = new Date(año, mes, 1).getDay();
  const diasEnMes = new Date(año, mes + 1, 0).getDate();
  const diasEnMesAnterior = new Date(año, mes, 0).getDate();

  let dia = 1;
  let siguienteMesDia = 1;

  for (let semanaIndex = 0; semanaIndex < 6; semanaIndex++) {
    const semana: DiaCalendario[] = [];

    for (let diaSemana = 0; diaSemana < 7; diaSemana++) {
      const celdaIndex = semanaIndex * 7 + diaSemana;

      if (celdaIndex < primerDiaSemana) {
        semana.push({
          numero: diasEnMesAnterior - primerDiaSemana + 1 + celdaIndex,
          mes: "anterior",
        });
      } else if (dia <= diasEnMes) {
        semana.push({ numero: dia, mes: "actual" });
        dia++;
      } else {
        semana.push({ numero: siguienteMesDia, mes: "siguiente" });
        siguienteMesDia++;
      }
    }

    dias.push(semana);
  }

  return dias;
};

export default function Agenda() {
  const hoy = new Date();
  const [año, setAño] = useState(hoy.getFullYear());
  const [mes, setMes] = useState(hoy.getMonth());

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

  const semanas = obtenerDiaDelMes(año, mes);
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

  return (
    <div className="p-4 rounded-xl bg-dark bg-[linear-gradient(to_right,#f0f0f011_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f011_1px,transparent_1px)] bg-[size:20px_20px] text-center size-full flex flex-col gap-3 font-signika shadow-[inset_0_0_8px_2px_rgba(0,0,0,0.75)]">
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
                className={`
                  h-full rounded-lg flex items-start justify-start px-2 py-1 border
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
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
