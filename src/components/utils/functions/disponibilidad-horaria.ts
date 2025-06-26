export function obtenerRangoSemanaActual() {
  const hoy = new Date();
  const diaSemana = hoy.getDay();
  
  const diferenciaConLunes = (diaSemana + 6) % 7;
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - diferenciaConLunes);

  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);

  const fechaInicio = lunes.toISOString().split("T")[0];
  const fechaFin = domingo.toISOString().split("T")[0];

  return { fechaInicio, fechaFin };
}
