import InputField from "@src/components/utils/Input-Field";
import TextAreaField from "@src/components/utils/Text-Area-Field";
import Button from "@src/components/utils/Button";

import BodyScan from "@src/assets/svg/body-scan.svg?react";
import Notes from "@src/assets/svg/notes.svg?react";
import Medicine from "@src/assets/svg/medicine.svg?react";
import Recomendation from "@src/assets/svg/recomendation.svg?react";
import IDSVG from "@src/assets/svg/id.svg?react";

export default function Receta() {
  return (
    <div className="size-full bg-dark bg-[linear-gradient(to_right,#f0f0f011_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f011_1px,transparent_1px)] bg-[size:20px_20px] rounded-xl shadow-[inset_0_0_5px_3px_rgba(0,0,0,0.70)]">
      <form className="size-full flex flex-col justify-between p-5">
        <InputField
          type="text"
          placeholder="Su diagnostico es..."
          id="diagnostico"
        >
          <BodyScan className="text-white size-9" />
        </InputField>
        <TextAreaField placeholder="Los sintomas son..." id="notas">
          <Notes className="text-white size-9" />
        </TextAreaField>
        <TextAreaField placeholder="Medicamentos recomendados:" id="medicina">
          <Medicine className="text-white size-9" />
        </TextAreaField>
        <InputField
          type="text"
          placeholder="Las recomendaciones finales son..."
          id="recomendacion"
        >
          <Recomendation className="text-white size-9" />
        </InputField>
        <div className="flex items-center justify-between gap-5 pt-5 px-5">
          <InputField
            type="text"
            placeholder="El codigo de cita es..."
            id="code"
          >
            <IDSVG className="text-white size-9" />
          </InputField>
          <Button title="Aceptar" tipo={2} />
        </div>
      </form>
    </div>
  );
}
