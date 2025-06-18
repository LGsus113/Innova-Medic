import type { PropsContainer } from "@src/types/type";

export default function ContainerHeader({
  children,
  superposition,
  positionContener,
}: PropsContainer) {
  return (
    <div
      className={`${positionContener} top-0 w-full h-auto flex justify-center ${superposition}`}
    >
      {children}
    </div>
  );
}
