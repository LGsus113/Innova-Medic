import ContainerHeader from "@src/components/utils/ContainerHeader";
import Top from "@src/components/home/elements/header/elements/Top";
import Nav from "@src/components/home/elements/header/elements/Nav";

export default function Header() {
  return (
    <header id="header-home" className="w-full h-auto max-w-[2000px]">
      <ContainerHeader superposition="z-50" positionContener="sticky">
        <div
          data-container-linkers
          className="w-full flex flex-col justify-center items-center py-5"
        >
          <Top />
          <Nav />
        </div>
      </ContainerHeader>
    </header>
  );
}
