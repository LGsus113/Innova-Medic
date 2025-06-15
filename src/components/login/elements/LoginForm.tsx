import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@src/context/AuthContext";
import InputField from "@src/components/utils/Input-Field";
import Button from "@src/components/utils/Button";
import Arroba from "@src/assets/@.svg";
import Lock from "@src/assets/lock.svg";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { login } = useAuthContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setEmailError(!email.trim());
      setPasswordError(!password.trim());
      alert("Los campos son obligatorios");
      return;
    }

    setEmailError(false);
    setPasswordError(false);

    try {
      const { usuario } = await login(email, password);

      alert(`Bienvenido(a) al sistema, ${usuario.nombre} ${usuario.apellido}`);

      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocurrió un error inesperado.";
      alert(`Error: ${errorMessage}`);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full h-auto flex flex-col gap-2">
        <InputField
          type="email"
          placeholder="Tu correo"
          id="emailUsuario"
          value={email}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
          className={emailError ? "border border-red-500" : ""}
        >
          <img src={Arroba} alt="imagen de arroba" className="invert size-9" />
        </InputField>
        <InputField
          type="password"
          placeholder="Tu contraseña"
          id="passwordUsuario"
          value={password}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
          className={passwordError ? "border border-red-500" : ""}
        >
          <img src={Lock} alt="imagen de candado" className="invert size-9" />
        </InputField>
      </div>
      <Button title="Aceptar" />
    </form>
  );
}
