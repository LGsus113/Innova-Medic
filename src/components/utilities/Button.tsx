import type { ButtonProps } from "@utils/type-props";

export default function Button({ title, tipo = 1 }: ButtonProps) {
  return (
    <a
      href="#"
      className={`btn font-extrabold ${tipo === 1 ? "mt-5" : "m-0"} rounded-sm h-11 uppercase p-[0_20px] items-center justify-center text-center bg-white text-pink-600`}
    >
      {title}
    </a>
  );
}
