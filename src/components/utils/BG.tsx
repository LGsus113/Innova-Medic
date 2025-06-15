import AnimateDoctors from "@public/animated-medic.webp";

export default function BG() {
  return (
    <>
      <div className="fixed inset-0 bg-slate-50 bg-[size:20px_20px] opacity-60 blur-[160px] pointer-events-none -z-20"></div>
      <div className="fixed bottom-0 w-screen h-screen flex justify-center items-center p-5 overflow-hidden opacity-15 blur-lg -z-10 rotate-animation">
        <div className="overflow-hidden size-[140vh]">
          <img
            src={AnimateDoctors}
            alt="imagen de doctores animados"
            className="image-bg size-full object-center object-cover"
          />
        </div>
      </div>
    </>
  );
}
