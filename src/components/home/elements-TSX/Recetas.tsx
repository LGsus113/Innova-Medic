import InputField from "@components/utilities/Input-Field";
import TextAreaField from "@components/utilities/Text-Area-Field";
import Button from "@components/utilities/Button";

import BodyScan from "@assets/icon-svg/body-scan.svg?url";
import Notes from "@assets/icon-svg/notes.svg?url";
import Medicine from "@assets/icon-svg/medicine.svg?url";
import Recomendation from "@assets/icon-svg/recomendation.svg?url";

export default function Recetas() {
  return (
    <div class="size-full bg-dark rounded-xl shadow-[inset_0_0_5px_3px_rgba(0,0,0,0.70)] p-5 customer-bg flex flex-col justify-between">
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
      <Button title="Aceptar" />
    </div>
  );
}
