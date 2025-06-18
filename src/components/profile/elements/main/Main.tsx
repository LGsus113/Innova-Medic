import { useAuthContext } from "@src/context/AuthContext";
import type { PerfilMedico, PerfilPaciente } from "@src/types/type";
import Man from "@src/assets/png/man.png";
import Woman from "@src/assets/png/woman.png";
import Male from "@src/assets/png/male.png";
import Female from "@src/assets/png/female.png";

export default function Main() {
  const { fullName, role, perfil } = useAuthContext();

  if (!perfil) {
    return;
  }

  const { sexo, telefono, email } = perfil;

  const medicoFields =
    role === "Medico"
      ? {
          especialidad: (perfil as PerfilMedico).especialidad,
          numeroColegiado: (perfil as PerfilMedico).numeroColegiado,
        }
      : null;

  const pacienteFields =
    role === "Paciente"
      ? {
          fechaNacimiento: (perfil as PerfilPaciente).fechaNacimiento,
          talla: (perfil as PerfilPaciente).talla,
          grupoSanguineo: (perfil as PerfilPaciente).grupoSanguineo,
          direccion: (perfil as PerfilPaciente).direccion,
        }
      : null;

  return (
    <main className="w-full grow h-auto max-w-[2000px] flex justify-center">
      <section className="p-10">
        <div className="flex flex-col items-center justify-center gap-10 px-10 py-6 rounded-4xl card-front customer-bg">
          <div className="relative size-64 border-8 border-white rounded-full">
            <div className="size-full overflow-hidden rounded-full">
              <img
                src={sexo === "Masculino" ? Man : Woman}
                alt="Avatar principal"
                className="size-full object-cover"
              />
            </div>
            <h1 className="absolute left-1/2 -translate-x-1/2 bottom-0 mb-10 z-10 w-full text-center text-white font-bold text-4xl font-signika">
              {role}
            </h1>
            <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 translate-y-1/2 size-16 rounded-3xl bg-white z-10 flex items-center justify-center p-[10px]">
              <img
                src={sexo === "Masculino" ? Male : Female}
                alt="Icono de género"
                className="size-full aspect-square object-contain"
              />
            </div>
          </div>
          <h1 className="m-0 p-0 text-center text-4xl font-signika text-white font-bold">{fullName}</h1>
        </div>

        <p>Sexo: {sexo}</p>
        <p>Teléfono: {telefono}</p>
        <p>Email: {email}</p>

        {medicoFields && (
          <>
            <p>Especialidad: {medicoFields.especialidad}</p>
            <p>N° Colegiado: {medicoFields.numeroColegiado}</p>
          </>
        )}

        {pacienteFields && (
          <>
            <p>Fecha Nacimiento: {pacienteFields.fechaNacimiento}</p>
            <p>Talla: {pacienteFields.talla}</p>
            <p>Grupo Sanguineo: {pacienteFields.grupoSanguineo}</p>
            <p>Dirección: {pacienteFields.direccion}</p>
          </>
        )}
      </section>
    </main>
  );
}
