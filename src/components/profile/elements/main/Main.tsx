import { useAuthContext } from "@src/context/AuthContext";
import Man from "@src/assets/png/man.png";

export default function Main() {
  const { fullName, role, perfil } = useAuthContext();

  if (!perfil) {
    return
  }

  return (
    <main className="w-full grow h-auto max-w-[2000px] flex justify-center">
      <section className="p-10">
        <img src={Man} alt="icono user" />
        <h1>{role} - {fullName} - {perfil.sexo}</h1>
      </section>
    </main>
  );
}