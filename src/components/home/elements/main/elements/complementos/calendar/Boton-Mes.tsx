import type { BotonMesProps } from "@src/types/type";

export default function BotonMes({ onCLick, children }: BotonMesProps) {
  return (
    <button
      onClick={onCLick}
      className="bg-pink-600 shadow-inner shadow-white px-3 py-1 rounded-lg button-citas"
    >
      {children}
    </button>
  );
}
