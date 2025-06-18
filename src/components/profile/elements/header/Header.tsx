import HeaderContener from "@src/components/utils/HeaderContener";
import Title from "@src/components/utils/Title";

export default function Header() {
  return (
    <HeaderContener>
      <div className="text-center">
        <Title />
      </div>
    </HeaderContener>
  );
}
