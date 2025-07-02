import type { ParrafoInfoProps } from "@src/types/type";

export default function ParrafoInfo({
  title = "",
  description = "",
  classNames = "",
}: ParrafoInfoProps) {
  const finalColor = classNames || "text-white";

  return (
    <p className={`text-xl font-playwrite italic ${finalColor}`}>
      <strong className="font-signika not-italic text-green-200 text-lg">
        {title}
      </strong>
      <br />
      {description}
    </p>
  );
}
