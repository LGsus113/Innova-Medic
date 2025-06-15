export default function LoadingComponent() {
  return (
    <div className="size-full flex flex-col gap-2 justify-center items-center">
      <div
        className="size-[60px] rounded-sm shadow-inner shadow-white/75 bg-pink-600 drop-shadow-[0_0_3px_rgba(0,0,0,0.5)] z-20"
        style={{ animation: "girar 0.5s linear infinite" }}
      ></div>
      <div
        className="w-[60px] h-[10px] bg-black/30 rounded-[50%] shadow-inner shadow-black/70 drop-shadow-[0_1px_1px_rgba(255,255,255,0.75)]"
        style={{ animation: "sombra-animada 0.5s linear infinite" }}
      ></div>
      <h1 className="text-white/60 font-signika text-[22px] mt-5">
        Listando tus citas
      </h1>
    </div>
  );
}
