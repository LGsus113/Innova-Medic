import { useState } from "preact/hooks";
import { login } from "@utils/login-signin";
import Button from "@components/utilities/Button";
import InputField from "@components/utilities/Input-Field";
import Arroba from "@assets/icon-svg/@.svg?url";
import Lock from "@assets/icon-svg/lock.svg?url";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setEmailError(!email.trim());
      setPasswordError(!password.trim());
      alert("Los campos son obligatorios");
      return;
    } else {
      setEmailError(false);
      setPasswordError(false);
    }

    try {
      const user = await login(email, password);

      alert(`Bienvenido(a) al sistema, ${user.nombre} ${user.apellido}`);

      localStorage.setItem("usuario", JSON.stringify(user));

      setEmail("");
      setPassword("");

      window.location.href = "/home";
    } catch (err: any) {
      let message = "Ocurrió un error inesperado.";

      if (err instanceof Error && err.message) {
        message = err.message;
      }

      alert(`Error: ${message}`);

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
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          className={emailError ? "border border-red-500" : ""}
        >
          <img src={Arroba} alt="imagen de arroba" className="invert size-9" />
        </InputField>
        <InputField
          type="password"
          placeholder="Tu contraseña"
          id="passwordUsuario"
          value={password}
          onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
          className={passwordError ? "border border-red-500" : ""}
        >
          <img src={Lock} alt="imagen de candado" className="invert size-9" />
        </InputField>
      </div>
      <Button title="Aceptar" />
    </form>
  );
}
