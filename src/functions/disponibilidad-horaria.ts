export function obtenerRangoSemanaActual(indice: number) {
  const hoy = new Date();
  const diaSemana = hoy.getDay();

  const offset = diaSemana === 0 ? -6 : 1 - diaSemana;

  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() + offset + indice * 7);

  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);

  const toLocalISO = (date: Date) => date.toLocaleDateString("sv-SE");

  const fechaInicio = toLocalISO(lunes);
  const fechaFin = toLocalISO(domingo);

  return { fechaInicio, fechaFin };
}
