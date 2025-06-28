import { useRef, useEffect, type KeyboardEvent } from "react";
import type { TextAreaField } from "@src/types/type";

export default function TextAreaField({
  placeholder,
  id,
  children,
  value,
  onInput,
}: TextAreaField) {
  const isFirstFocus = useRef(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    const cursorPos = textareaRef.current.selectionStart;
    if (cursorPos === 1 && value === "- ") {
      textareaRef.current.setSelectionRange(2, 2);
    }
  }, [value]);

  const capitalizeFirst = (line: string) => {
    const trimmed = line.trimStart().replace(/^- /, "");
    if (trimmed.length === 0) return "- ";
    return `- ${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}`;
  };

  const handleFocus = () => {
    if (isFirstFocus.current && value.trim() === "") {
      onInput("- ");
      isFirstFocus.current = false;
    }
  };

  const handleBlur = () => {
    const meaningfulLines = value
      .split("\n")
      .filter((line) => line.replace(/^-\s/, "").trim() !== "");

    if (meaningfulLines.length === 0) {
      onInput("");
      isFirstFocus.current = true;
    } else {
      const cleanedValue = meaningfulLines.map(capitalizeFirst).join("\n");
      onInput(cleanedValue);
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

      const nextLine = "- ";
      const newValue = `${before}\n${nextLine}${after}`;
      onInput(newValue);

      requestAnimationFrame(() => {
        const newPos = selectionStart + nextLine.length + 1;
        textarea.setSelectionRange(newPos, newPos);
      });
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
        onInput={(e) => onInput(e.currentTarget.value)}
        ref={textareaRef}
      ></textarea>
    </div>
  );
}
