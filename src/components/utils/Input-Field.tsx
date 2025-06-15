import type { InputField } from "@src/types/type";

export default function InputField({
  type,
  placeholder,
  id,
  value,
  onInput,
  children,
  className,
}: InputField) {
  return (
    <div className={`form-group ${className}`}>
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
