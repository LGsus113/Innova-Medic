import { useState } from "preact/hooks";

type DiaCalendario = {
  numero: number;
  mes: "anterior" | "actual" | "siguiente";
};

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
    <div className="p-4 rounded-xl shadow-xl bg-white text-center size-full flex flex-col">
      <div className="w-full h-auto flex justify-between items-center mb-2">
        <button
          onClick={retrocederMes}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Anterior
        </button>
        <span className="text-lg font-semibold">
          {meses[mes]} de {año}
        </span>
        <button
          onClick={avanzarMes}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Siguiente
        </button>
      </div>

      <div className="w-full h-auto grid grid-cols-7 text-sm font-medium text-gray-600 mb-2">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="basis-0 grow grid grid-cols-7 gap-1 text-sm justify-center items-center">
        {semanas.map((semana, i) =>
          semana.map((dia, j) => (
            <div
              key={`${i}-${j}`}
              className="h-full border rounded-lg flex items-start justify-start px-2 py-1 bg-gray-50"
            >
              <span
                className={`font-bold ${
                  dia.mes === "actual"
                    ? "text-gray-800"
                    : "text-gray-400 opacity-60"
                }`}
              >
                {dia.numero}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
