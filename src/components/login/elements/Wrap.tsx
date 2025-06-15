import type { WrapProps } from "@src/types/type";

export default function Wrap({ title, children }: WrapProps) {
  return (
    <div className="center-wrap card-wrap transform translate-y-[-50%] translate-z-[35px] perspective-[100px]">
      <div className="relative w-full block text-center">
        <h4 className="mb-5 text-4xl text-white font-Cherry-Bomb">{title}</h4>
      </div>

      {children}

      {title === "Log in" && (
        <p className="text-center mt-1 font-bold text-md font-signika leading-[1.7]">
          <a href="#0" className="text-light-dark hover:text-tertiary">
            ¿Olvidaste tu contraseña?
          </a>
        </p>
      )}
    </div>
  );
}
