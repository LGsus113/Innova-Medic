import type { InputField } from "@utils/type-props";

export default function InputField({
  type,
  placeholder,
  id,
  value,
  onInput,
  children,
}: InputField) {
  return (
    <div className="form-group">
      {children}
      <input
        type={type}
        name={id}
        className="form-style"
        placeholder={placeholder}
        id={id}
        autoComplete="off"
        value={value}
        onInput={onInput}
      />
    </div>
  );
}
