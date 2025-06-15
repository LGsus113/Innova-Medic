import type { ButtonProps } from "@src/types/type";

export default function Button({ title, tipo = 1, ...props }: ButtonProps) {
  return (
    <button
      type="submit"
      {...props}
      className={`btn font-extrabold ${
        tipo === 1
          ? "bg-white text-pink-600 mt-5 shadow-[inset_0_0_7px_1px_rgba(230,0,118,0.5)] hover:shadow-[inset_0_0_7px_2px_rgba(230,0,118,0.6)]"
          : "bg-pink-600 text-white m-0 shadow-inner shadow-white brightness-95 hover:brightness-105"
      } rounded-lg h-11 uppercase p-[0_20px] items-center justify-center text-center`}
    >
      {title}
    </button>
  );
}
