import type { InputField } from "@utils/type-props";

export default function TextAreaField({
  placeholder,
  id,
  children,
}: InputField) {
  return (
    <div className="form-group">
      {children}
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        className="text-area-style"
        rows={3}
      ></textarea>
    </div>
  );
}
