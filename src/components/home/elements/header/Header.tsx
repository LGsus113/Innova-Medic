import HeaderContener from "@src/components/utils/HeaderContener";
import HeaderCentration from "@src/components/utils/HeaderCentration";
import Top from "@src/components/home/elements/header/elements/Top";
import Nav from "@src/components/home/elements/header/elements/Nav";

export default function Header() {
  return (
    <HeaderContener>
      <HeaderCentration superposition="z-50" positionContener="sticky">
        <div
          data-container-linkers
          className="w-full flex flex-col justify-center items-center py-5"
        >
          <Top />
          <Nav />
        </div>
      </HeaderCentration>
    </HeaderContener>
  );
}
