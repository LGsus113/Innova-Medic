import type { PTextProps } from "@src/types/type";

export default function PText({title, content}: PTextProps) {
  return (
    <p>
      <span className="text-white/60 text-lg">{title}:</span> {content}
    </p>
  );
}
