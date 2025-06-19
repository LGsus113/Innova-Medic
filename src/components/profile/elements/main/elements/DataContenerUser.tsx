import type { WrapProps } from "@src/types/type";

export default function DataContenerUser({ title, children }: WrapProps) {
  return (
    <article className="grow h-full flex flex-col gap-2 items-center justify-center font-signika card-front customer-bg-2 p-5 rounded-4xl">
      <h2 className="text-white text-4xl font-bold">{title}</h2>
      <div className="flex flex-col justify-center items-start text-white text-xl">
        {children}
      </div>
    </article>
  );
}
