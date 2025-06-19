import Clock from "@src/assets/svg/clock.svg?react";
import type { DisponibilidadCardProps } from "@src/types/type";

export default function CardHorario({
  key,
  diaSemana,
  horaInicio,
  horaFin,
}: DisponibilidadCardProps) {
  return (
    <div
      key={key}
      className="bg-white/5 backdrop-blur-md rounded-xl p-4 shadow-md text-white flex flex-col hover:bg-white/10"
    >
      <span className="font-bold text-[21px]">{diaSemana}:</span>
      <span className="text-lg text-center">
        {horaInicio} – {horaFin}
      </span>
      <Clock className="size-5 absolute top-0 right-0 z-10 text-white m-2" />
    </div>
  );
}
