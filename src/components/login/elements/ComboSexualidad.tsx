import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import type { ComboSexoProps } from "@src/types/type";

export default function ComboSexo({ value, onChange, error }: ComboSexoProps) {
  return (
    <Select
      value={value || "__empty__"}
      onValueChange={(val) => {
        onChange(val === "__empty__" ? "" : val);
      }}
    >
      <SelectTrigger
        className={`w-full bg-[#1f2029] text-white border rounded-none ${
          error ? "border-red-500" : "border-transparent"
        }`}
      >
        <SelectValue placeholder="Selecciona tu sexo" />
      </SelectTrigger>
      <SelectContent className="bg-[#1f2029] text-white rounded-none">
        <SelectItem
          value="__empty__"
          className="relative cursor-default select-none py-1.5 pl-8 pr-2 hover:bg-neutral-300/25 focus:bg-neutral-300/25 font-normal rounded-none"
        >
          Selecciona tu sexo
        </SelectItem>
        <SelectItem value="Masculino" className="rounded-none">
          Masculino
        </SelectItem>
        <SelectItem value="Femenino" className="rounded-none">
          Femenino
        </SelectItem>
        <SelectItem value="Otro" className="rounded-none">
          Otro
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
