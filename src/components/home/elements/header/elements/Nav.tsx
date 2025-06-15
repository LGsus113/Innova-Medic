import Secciones from "@src/components/home/elements/header/elements/Secciones";
import Hovered from "@src/components/home/elements/header/elements/Hovered";

export default function Nav() {
  return (
    <nav className="w-auto h-auto mt-7 flex justify-center items-center text-2xl text-black font-signika">
      <Secciones />
      <Hovered />
    </nav>
  );
}
