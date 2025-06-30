import InputField from "@src/components/utils/Input-Field";
import Medicine from "@src/assets/svg/medicine.svg?react";
import type { MedicamentosTableProps, MedicamentoProps } from "@src/types/type";

export default function MedicamentosTable({
  medicamentos,
  setMedicamentos,
}: MedicamentosTableProps) {
  const handleInputChange = (
    index: number,
    field: keyof MedicamentoProps,
    value: string
  ) => {
    const newData = [...medicamentos];
    newData[index][field] = value;

    if (
      index === medicamentos.length - 1 &&
      newData[index].nombre &&
      newData[index].dosis &&
      newData[index].frecuencia
    ) {
      newData.push({ nombre: "", dosis: "", frecuencia: "" });
    }

    setMedicamentos(newData);
  };

  const handleDelete = (index: number) => {
    const newData = medicamentos.filter((_, i) => i !== index);
    if (newData.length === 0) {
      newData.push({ nombre: "", dosis: "", frecuencia: "" });
    }
    setMedicamentos(newData);
  };

  return (
    <div className="w-full flex flex-col bg-[#1f2029] p-3">
      <div className="flex items-center gap-3 mb-2">
        <Medicine className="text-white size-9" />
        <span className="text-white font-semibold">Medicamentos</span>
      </div>
      <table className="w-full text-white/70 text-left">
        <thead>
          <tr className="[&>th]:px-2.5 [&>th]:py-0.5">
            <th>Nombre</th>
            <th>Dosis</th>
            <th>Frecuencia</th>
            <th className="text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
              } [&>td]:px-2.5 [&>td]:py-2`}
            >
              <td>
                <InputField
                  type="text"
                  placeholder="Ej. Paracetamol"
                  id={`nombre-${index}`}
                  value={med.nombre}
                  onInput={(e) =>
                    handleInputChange(index, "nombre", e.currentTarget.value)
                  }
                  className="!mb-0"
                />
              </td>
              <td>
                <InputField
                  type="text"
                  placeholder="Ej. 500 mg"
                  id={`dosis-${index}`}
                  value={med.dosis}
                  onInput={(e) =>
                    handleInputChange(index, "dosis", e.currentTarget.value)
                  }
                  className="!mb-0"
                />
              </td>
              <td>
                <InputField
                  type="text"
                  placeholder="Ej. cada 8 horas"
                  id={`frecuencia-${index}`}
                  value={med.frecuencia}
                  onInput={(e) =>
                    handleInputChange(
                      index,
                      "frecuencia",
                      e.currentTarget.value
                    )
                  }
                  className="!mb-0"
                />
              </td>
              <td>
                <button
                  className={`bg-red-400 button-citas shadow-inner shadow-white/50 ${
                    med.nombre && med.dosis && med.frecuencia
                      ? ""
                      : "opacity-50 cursor-not-allowed hover:brightness-95"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (med.nombre && med.dosis && med.frecuencia) {
                      handleDelete(index);
                    }
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
