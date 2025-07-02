import { useRef } from "react";
import type { SelectorMesProps } from "@src/types/type";

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

export default function SelectorMes({ año, mes, onChange }: SelectorMesProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current?.showPicker) {
      inputRef.current.showPicker();
    } else {
      inputRef.current?.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    const [y, m] = target.value.split("-");
    onChange(Number(y), Number(m) - 1);
  };

  return (
    <div
      className="relative inline-block text-white font-semibold text-lg cursor-pointer"
      onClick={handleClick}
    >
      <span className="pointer-events-none">{`${meses[mes]} de ${año}`}</span>
      <input
        ref={inputRef}
        type="month"
        value={`${año}-${String(mes + 1).padStart(2, "0")}`}
        onChange={handleChange}
        className="absolute left-1/2 top-0 -translate-x-[56%] opacity-0 h-full cursor-pointer"
        aria-label="Selector de mes"
      />
    </div>
  );
}
