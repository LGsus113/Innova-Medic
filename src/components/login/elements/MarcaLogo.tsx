import ContainerHeader from "@src/components/utils/ContainerHeader";
import type { MarcaLogoProps } from "@src/types/type";
import Logo from "@public/logo-innova-medic.webp";
import Title from "@src/components/utils/Title";

export default function MarcaLogo({ superposition }: MarcaLogoProps) {
  return (
    <ContainerHeader superposition={superposition} positionContener="fixed">
      <div className="flex justify-between items-center w-3/5 py-5">
        <div className="relative inline-block">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-5 bg-black/30 rounded-full blur-sm"></div>
          <img
            src={Logo}
            alt="logo marca de innova medic"
            className="relative z-10 size-32 drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]"
          />
        </div>
        <Title />
      </div>
    </ContainerHeader>
  );
}
