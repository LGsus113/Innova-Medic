import { useNavigate } from "react-router-dom";
import HeaderContener from "@src/components/utils/HeaderContener";
import Title from "@src/components/utils/Title";
import Left from "@src/assets/png/arrow-left.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <HeaderContener>
      <div className="w-2/3 flex justify-center items-center relative">
        <button
          onClick={() => navigate("/home")}
          className="absolute left-0 border-none outline-none bg-transparent hover:cursor-pointer group"
        >
          <img
            src={Left}
            alt="icono de flecha izquierda"
            className="size-12 bg-pink-600 p-2 rounded-full shadow-inner shadow-white/60 group-hover:bg-pink-700 group-hover:shadow-white/70"
          />
        </button>
        <div className="text-center">
          <Title />
        </div>
      </div>
    </HeaderContener>
  );
}
