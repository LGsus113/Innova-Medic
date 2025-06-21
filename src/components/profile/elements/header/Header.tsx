import HeaderContener from "@src/components/utils/HeaderContener";
import GoBack from "@src/components/profile/elements/header/GoBack";
import Title from "@src/components/utils/Title";

export default function Header() {
  return (
    <HeaderContener>
      <div className="w-2/3 flex justify-center items-center relative">
        <GoBack />
        <div className="text-center">
          <Title />
        </div>
      </div>
    </HeaderContener>
  );
}
