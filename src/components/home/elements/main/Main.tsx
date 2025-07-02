import DynamicContent from "@src/components/home/elements/main/elements/DynamicContent";

export default function Main() {
  return (
    <main className="w-full h-auto max-w-[2000px] grow flex justify-center items-center">
      <div className="w-2/3 h-[65vh] p-5 bg-dark/50 shadow-inner shadow-white/75 rounded-2xl flex flex-col gap-3 relative">
        <DynamicContent />
      </div>
    </main>
  );
}
