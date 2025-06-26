import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import type { ComboEspecialidadesProps } from "@src/types/type";

export default function ComboEspecialidades({
  especialidades,
  value,
  onChange,
}: ComboEspecialidadesProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value === "__empty__") return onChange("");
        onChange(value);
      }}
    >
      <SelectTrigger className="w-[260px] bg-dark/50 border-white/70 text-white">
        <SelectValue placeholder="Seleccione una especialidad" />
      </SelectTrigger>
      <SelectContent className="bg-dark text-white border-white/60">
        <SelectItem
          value="__empty__"
          className="relative cursor-default select-none py-1.5 pl-8 pr-2 rounded-sm hover:bg-neutral-300/25 focus:bg-neutral-300/25 font-normal"
        >
          Seleccione una especialidad
        </SelectItem>
        {especialidades.map((esp, idx) => (
          <SelectItem
            key={idx}
            value={esp}
            className="relative cursor-default select-none py-1.5 pl-8 pr-2 rounded-sm hover:bg-neutral-300/25 focus:bg-neutral-300/25 font-normal"
          >
            {esp}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
