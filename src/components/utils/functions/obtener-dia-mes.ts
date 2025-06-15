import type { Cita, DiaCalendarioConCitas } from "@src/types/type";

export const obtenerDiaDelMes = (
  año: number,
  mes: number,
  citas: Cita[] = []
): DiaCalendarioConCitas[][] => {
  const dias: DiaCalendarioConCitas[][] = [];
  const primerDiaSemana = new Date(año, mes, 1).getDay();
  const diasEnMes = new Date(año, mes + 1, 0).getDate();
  const diasEnMesAnterior = new Date(año, mes, 0).getDate();

  let dia = 1;
  let siguienteMesDia = 1;

  for (let semanaIndex = 0; semanaIndex < 6; semanaIndex++) {
    const semana: DiaCalendarioConCitas[] = [];

    for (let diaSemana = 0; diaSemana < 7; diaSemana++) {
      const celdaIndex = semanaIndex * 7 + diaSemana;
      let diaCalendario: DiaCalendarioConCitas;

      if (celdaIndex < primerDiaSemana) {
        diaCalendario = {
          numero: diasEnMesAnterior - primerDiaSemana + 1 + celdaIndex,
          mes: "anterior",
        };
      } else if (dia <= diasEnMes) {
        const fechaStr = `${año}-${String(mes + 1).padStart(2, "0")}-${String(
          dia
        ).padStart(2, "0")}`;
        const citasDia = citas.filter((c) => c.fecha.startsWith(fechaStr));

        diaCalendario = {
          numero: dia,
          mes: "actual",
          tieneCitas: citasDia.length > 0,
          citas: citasDia.length > 0 ? citasDia : undefined,
        };

        dia++;
      } else {
        diaCalendario = {
          numero: siguienteMesDia,
          mes: "siguiente",
        };

        siguienteMesDia++;
      }
      semana.push(diaCalendario);
    }
    dias.push(semana);
  }

  return dias;
};
