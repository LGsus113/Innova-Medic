import InputField from "@components/utilities/Input-Field";
import TextAreaField from "@components/utilities/Text-Area-Field";
import Button from "@components/utilities/Button";

import BodyScan from "@assets/icon-svg/body-scan.svg?url";
import Notes from "@assets/icon-svg/notes.svg?url";
import Medicine from "@assets/icon-svg/medicine.svg?url";
import Recomendation from "@assets/icon-svg/recomendation.svg?url";
import IDSVG from "@assets/icon-svg/id.svg?url";

export default function Recetas() {
  return (
    <div class="size-full bg-dark bg-[linear-gradient(to_right,#f0f0f011_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f011_1px,transparent_1px)] bg-[size:20px_20px] rounded-xl shadow-[inset_0_0_5px_3px_rgba(0,0,0,0.70)]">
      <form className="size-full flex flex-col justify-between p-5">
        <InputField
          type="text"
          placeholder="Su diagnostico es..."
          id="diagnostico"
        >
          <img
            src={BodyScan}
            alt="icono de dianostico en input"
            className="invert size-9"
          />
        </InputField>
        <TextAreaField placeholder="Los sintomas son..." id="notas">
          <img
            src={Notes}
            alt="icono de dianostico en text area"
            className="invert size-9"
          />
        </TextAreaField>
        <TextAreaField placeholder="Medicamentos recomendados:" id="medicina">
          <img
            src={Medicine}
            alt="icono de medinas en text area"
            className="invert size-9"
          />
        </TextAreaField>
        <InputField
          type="text"
          placeholder="Las recomendaciones finales son..."
          id="recomendacion"
        >
          <img
            src={Recomendation}
            alt="icono de recomendaciones en input"
            className="invert size-9"
          />
        </InputField>
        <div className="flex items-center justify-between gap-5 pt-5 px-5">
          <InputField
            type="text"
            placeholder="El codigo de cita es..."
            id="code"
          >
            <img
              src={IDSVG}
              alt="icono de identificador en input"
              className="invert size-9"
            />
          </InputField>
          <Button title="Aceptar" tipo={2} />
        </div>
      </form>
    </div>
  );
}
