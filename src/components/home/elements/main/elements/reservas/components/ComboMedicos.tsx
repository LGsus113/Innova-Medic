import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import type { ComboMedicosPorEspecialidadProps } from "@src/types/type";

export default function ComboMedicos({
  medicos,
  value,
  onChange,
  disabled,
}: ComboMedicosPorEspecialidadProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger
        className={`w-[260px] bg-dark/50 border-white/70 text-white ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <SelectValue
          placeholder={
            disabled
              ? "Seleccione primero una especialidad"
              : "Seleccione un médico"
          }
        />
      </SelectTrigger>
      <SelectContent className="bg-dark text-white border-white/60">
        {medicos.map((medico) => (
          <SelectItem
            key={medico.idUsuario}
            value={medico.idUsuario.toString()}
            className="relative cursor-default select-none py-1.5 pl-8 pr-2 rounded-sm hover:bg-neutral-300/25 focus:bg-neutral-300/25 font-normal"
          >
            {medico.nombre} {medico.apellido}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
