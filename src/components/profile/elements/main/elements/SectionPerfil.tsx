import { useAuthContext } from "@src/context/AuthContext";
import type { PerfilMedico, PerfilPaciente } from "@src/types/type";
import CardHorario from "@src/components/profile/elements/main/elements/CardHorario";
import DataContenerUser from "@src/components/profile/elements/main/elements/DataContenerUser";
import UserAvatar from "@src/components/profile/elements/main/elements/UserAvatar";
import PText from "@src/components/profile/elements/main/elements/PText";

export default function SectionPerfil() {
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
          disponibilidad: (perfil as PerfilMedico).disponibilidad || [],
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
    <section className="w-2/3 h-full flex gap-5 p-10 justify-center items-center">
      <div className="grow h-full flex flex-col gap-5 justify-center items-center">
        <UserAvatar
          title={fullName || "Invitado"}
          content={role || "Masculino"}
          sexo={sexo}
        />
        <div className="w-full grow flex justify-center items-center gap-5">
          <DataContenerUser title="Contacto">
            <PText title="Teléfono" content={`+51 ${telefono}`} />
            <PText title="Email" content={email} />
          </DataContenerUser>
          <DataContenerUser title="Datos Medicos">
            {medicoFields && (
              <>
                <PText
                  title="Especialidad"
                  content={medicoFields.especialidad}
                />
                <PText
                  title="N° Colegiado"
                  content={medicoFields.numeroColegiado}
                />
              </>
            )}
            {pacienteFields && (
              <>
                <PText
                  title="F. Nac."
                  content={pacienteFields.fechaNacimiento}
                />
                <PText title="Talla" content={pacienteFields.talla} />
                <PText
                  title="G. Sanguineo"
                  content={pacienteFields.grupoSanguineo}
                />
                <PText title="Dirección" content={pacienteFields.direccion} />
              </>
            )}
          </DataContenerUser>
        </div>
      </div>
      {medicoFields && medicoFields.disponibilidad.length > 0 && (
        <article className="grow h-full flex flex-col gap-5 items-center justify-center font-signika card-front customer-bg-2 p-5 rounded-4xl">
          <h2 className="text-white text-4xl font-bold">Horario:</h2>
          <div className="w-full flex flex-col gap-2 flex-wrap">
            {medicoFields.disponibilidad.map((d, key) => (
              <CardHorario
                key={key}
                diaSemana={d.diaSemana}
                horaInicio={d.horaInicio}
                horaFin={d.horaFin}
              />
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
