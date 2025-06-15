import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent, FormEvent } from "react";
import type { TextAreaField } from "@src/types/type";

export default function TextAreaField({
  placeholder,
  id,
  children,
}: TextAreaField) {
  const [value, setValue] = useState("");
  const isFirstFocus = useRef(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    const cursorPos = textareaRef.current.selectionStart;
    if (cursorPos === 1 && value === "- ") {
      textareaRef.current.setSelectionRange(2, 2);
    }
  }, [value]);

  const handleFocus = () => {
    if (isFirstFocus.current && value.trim() === "") {
      setValue("- ");
      isFirstFocus.current = false;
    }
  };

  const handleBlur = () => {
    const meaningfulLines = value
      .split("\n")
      .filter((line) => line.replace(/^-\s/, "").trim() !== "");

    if (meaningfulLines.length === 0) {
      setValue("");
      isFirstFocus.current = true;
    } else {
      const cleanedValue = meaningfulLines
        .map((line) => (line.startsWith("- ") ? line : `- ${line}`))
        .join("\n");
      setValue(cleanedValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const { selectionStart, selectionEnd, value: currentValue } = textarea;

    if (
      (e.key === "Backspace" && selectionStart <= 2 && selectionEnd <= 2) ||
      (e.key === "Delete" && selectionStart === 0 && selectionEnd === 0)
    ) {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const before = currentValue.slice(0, selectionStart);
      const after = currentValue.slice(selectionEnd);

      setValue(`${before}\n- ${after}`);

      requestAnimationFrame(() => {
        const newPos = selectionStart + 3;
        textarea.setSelectionRange(newPos, newPos);
      });
    }
  };

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    let inputValue = target.value;

    inputValue = inputValue
      .split("\n")
      .map((line) => {
        if (line.trim() === "") return "- ";
        return line.startsWith("- ") ? line : `- ${line}`;
      })
      .join("\n");

    if (inputValue.startsWith("-")) {
      setValue(inputValue);
    } else if (inputValue === "") {
      setValue("- ");
    } else {
      setValue(`- ${inputValue}`);
    }
  };

  return (
    <div className="form-group">
      {children}
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        className="text-area-style"
        rows={4}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      ></textarea>
    </div>
  );
}
