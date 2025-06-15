import Title from "@src/components/utils/Title";
import NombreUsuario from "@src/components/home/elements/header/elements/NombreUsuario";
import Informacion from "@src/components/home/elements/header/elements/Information";

export default function Top() {
  return (
    <div className="flex justify-between items-center w-4/5">
      <Title />
      <div className="flex items-center gap-5 bg-pink-600 px-5 py-3 rounded-lg drop-shadow-[0_0_3px_rgba(255,255,255,0.5)] shadow-inner shadow-pink-300">
        <NombreUsuario />
        <Informacion />
      </div>
    </div>
  );
}
