import DynamicContent from "@src/components/home/elements/main/elements/DynamicContent";

export default function Main() {
  return (
    <main className="w-full grow h-auto max-w-[2000px]">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-1/2 h-[60vh] p-5 bg-dark/50 shadow-inner shadow-white/75 rounded-2xl flex flex-col gap-3 relative">
          <DynamicContent />
        </div>
      </div>
    </main>
  );
}
