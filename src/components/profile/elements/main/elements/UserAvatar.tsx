import type { UserAvatarProps } from "@src/types/type";
import Man from "@src/assets/png/man.png";
import Woman from "@src/assets/png/woman.png";
import Male from "@src/assets/png/male.png";
import Female from "@src/assets/png/female.png";

export default function UserAvatar({ title, content, sexo }: UserAvatarProps) {
  return (
    <div className="w-full grow flex flex-col items-center justify-center gap-10 rounded-4xl card-front customer-bg-2">
      <div className="relative size-64 border-8 border-white rounded-full">
        <div className="size-full overflow-hidden rounded-full">
          <img
            src={sexo === "Masculino" ? Man : Woman}
            alt="Avatar principal"
            className="size-full object-cover"
          />
        </div>
        <h1 className="absolute left-1/2 -translate-x-1/2 bottom-0 mb-10 z-10 w-full text-center text-white font-bold text-4xl font-signika">
          {content}
        </h1>
        <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 translate-y-1/2 size-16 rounded-3xl bg-white z-10 flex items-center justify-center p-[10px]">
          <img
            src={sexo === "Masculino" ? Male : Female}
            alt="Icono de género"
            className="size-full aspect-square object-contain"
          />
        </div>
      </div>
      <h1 className="m-0 p-0 text-center text-4xl font-signika text-white font-bold">
        {title}
      </h1>
    </div>
  );
}
