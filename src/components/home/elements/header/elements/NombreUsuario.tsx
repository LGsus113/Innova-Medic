import { useAuthContext } from "@src/context/AuthContext";

export default function NombreUsuario() {
  const { fullName } = useAuthContext();

  return (
    <h1 className="font-signika text-lg text-white">
      <span className="font-bold text-xl underline decoration-2 decoration-pink-300 underline-offset-[4px]">
        {fullName || "Invitado"}
      </span>
    </h1>
  );
}
