import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterPaciente } from "@src/api/api-T/method/register-p-hook";
import { useAuthContext } from "@src/context/AuthContext";
import InputField from "@src/components/utils/Input-Field";
import Button from "@src/components/utils/Button";
import Name from "@src/assets/svg/name.svg?react";
import LastName from "@src/assets/svg/lastname.svg?react";
import Phone from "@src/assets/svg/phone.svg?react";
import Calendar from "@src/assets/svg/calendar.svg?react";
import Size from "@src/assets/svg/size.svg?react";
import Address from "@src/assets/svg/address.svg?react";
import Blood from "@src/assets/svg/blood.svg?react";
import Left from "@src/assets/svg/left.svg?react";
import Right from "@src/assets/svg/right.svg?react";
import Arroba from "@src/assets/svg/@.svg?react";
import Lock from "@src/assets/svg/clock.svg?react";

export default function SignForm() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    sexo: "",
    telefono: "",
    email: "",
    contrasenia: "",
    fechaNacimiento: "",
    talla: "",
    grupoSanguineo: "",
    direccion: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validarPage = () => {
    const newErrors: Record<string, boolean> = {};
    const fieldToCheck =
      page === 0
        ? [
            "nombre",
            "apellido",
            "fechaNacimiento",
            "telefono",
            "talla",
            "direccion",
            "grupoSanguineo",
          ]
        : ["sexo", "email", "contrasenia"];

    fieldToCheck.forEach((key) => {
      if (!formData[key as keyof typeof formData].trim()) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: false }));
  };

  const { registrarPaciente, loading } = useRegisterPaciente();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleAceppt = async (e: FormEvent) => {
    e.preventDefault();

    const allFields = [
      "nombre",
      "apellido",
      "sexo",
      "telefono",
      "email",
      "contrasenia",
      "fechaNacimiento",
      "talla",
      "grupoSanguineo",
      "direccion",
    ];

    const newErrors: Record<string, boolean> = {};
    allFields.forEach((key) => {
      if (!formData[key as keyof typeof formData].trim()) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const result = await registrarPaciente(formData);

    if (!result.success) {
      alert("❌ Error: " + result.errorMsg);
      return;
    }

    alert("✅ " + result.message);

    try {
      await login(formData.email, formData.contrasenia);
      navigate("/home");
    } catch (e) {
      console.error("Error al iniciar sesión automáticamente:", e);
      alert("Registro completado, pero el inicio de sesión falló.");
    }

    setFormData({
      nombre: "",
      apellido: "",
      sexo: "",
      telefono: "",
      email: "",
      contrasenia: "",
      fechaNacimiento: "",
      talla: "",
      grupoSanguineo: "",
      direccion: "",
    });
    setErrors({});
    setPage(0);
  };

  const renderPage = () => {
    if (page === 0) {
      return (
        <>
          <div className="size-full flex gap-2">
            <InputField
              type="text"
              placeholder="Tu nombre"
              id="nombre"
              value={formData.nombre}
              onInput={handleInput}
              className={errors.nombre ? "border border-red-500" : ""}
            >
              <Name className="text-white size-7" />
            </InputField>
            <InputField
              type="text"
              placeholder="Tu apellido"
              id="apellido"
              value={formData.apellido}
              onInput={handleInput}
              className={errors.apellido ? "border border-red-500" : ""}
            >
              <LastName className="text-white size-7" />
            </InputField>
          </div>
          <InputField
            type="date"
            placeholder="Fecha Nacimiento"
            id="fechaNacimiento"
            value={formData.fechaNacimiento}
            onInput={handleInput}
            className={errors.fechaNacimiento ? "border border-red-500" : ""}
          >
            <Calendar className="text-white size-7" />
          </InputField>
          <div className="size-full flex gap-2">
            <InputField
              type="text"
              placeholder="Tu numero"
              id="telefono"
              value={formData.telefono}
              onInput={handleInput}
              className={errors.telefono ? "border border-red-500" : ""}
            >
              <Phone className="text-white size-7" />
            </InputField>
            <InputField
              type="text"
              placeholder="Tu talla"
              id="talla"
              value={formData.talla}
              onInput={handleInput}
              className={errors.talla ? "border border-red-500" : ""}
            >
              <Size className="text-white size-7" />
            </InputField>
          </div>
          <div className="size-full flex gap-2">
            <InputField
              type="text"
              placeholder="Dirección"
              id="direccion"
              value={formData.direccion}
              onInput={handleInput}
              className={errors.direccion ? "border border-red-500" : ""}
            >
              <Address className="text-white size-7" />
            </InputField>
            <InputField
              type="text"
              placeholder="G. Sanguineo"
              id="grupoSanguineo"
              value={formData.grupoSanguineo}
              onInput={handleInput}
              className={errors.grupoSanguineo ? "border border-red-500" : ""}
            >
              <Blood className="text-white size-7" />
            </InputField>
          </div>
        </>
      );
    } else {
      return (
        <>
          <InputField
            type="text"
            placeholder="Tu sexualidad"
            id="sexo"
            value={formData.sexo}
            onInput={handleInput}
            className={errors.sexo ? "border border-red-500" : ""}
          >
            <Phone className="text-white size-7" />
          </InputField>
          <InputField
            type="email"
            placeholder="Tu correo"
            id="email"
            value={formData.email}
            onInput={handleInput}
            className={errors.email ? "border border-red-500" : ""}
          >
            <Arroba className="text-white size-7" />
          </InputField>
          <InputField
            type="password"
            placeholder="Tu contraseña"
            id="contrasenia"
            value={formData.contrasenia}
            onInput={handleInput}
            className={errors.contrasenia ? "border border-red-500" : ""}
          >
            <Lock className="text-white size-7" />
          </InputField>
        </>
      );
    }
  };

  return (
    <form className="relative" onSubmit={handleAceppt}>
      <div className="w-auto h-auto flex gap-2 absolute bottom-0 right-0">
        <button
          type="button"
          disabled={page === 0}
          className="bg-transparent border-none outline-none cursor-pointer brightness-75 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={() => setPage((p) => p - 1)}
        >
          <Left className="text-white size-8 my-2" />
        </button>
        <button
          type="button"
          disabled={page === 1}
          className="bg-transparent border-none outline-none cursor-pointer brightness-75 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={() => {
            if (validarPage()) setPage((p) => p + 1);
            else alert("Completa todos los campos antes de continuar.");
          }}
        >
          <Right className="text-white size-8 my-2" />
        </button>
      </div>
      <div className="w-full h-auto flex flex-col gap-2">{renderPage()}</div>
      <Button
        title={loading ? "Registrando..." : "Aceptar"}
        disabled={loading}
      />
    </form>
  );
}
