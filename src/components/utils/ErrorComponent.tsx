import Alert from "@src/assets/svg/alert.svg?react";

export default function ErrorComponent({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) {
  return (
    <div
      className="size-full flex flex-col justify-center items-center gap-4 p-4 rounded-xl backdrop-blur-sm bg-red-200/15 shadow-inner shadow-red-200"
      style={{ animation: "fade-in 0.3s ease-out;" }}
    >
      <div>
        <Alert className="text-white size-14" />
      </div>
      <div className="text-center">
        <p className="font-bold text-3xl font-signika text-quaternary">
          ¡Ups! Algo salió mal.
        </p>
        <p className="text-md text-white/60 font-bold">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-pink-600 font-bold font-signika shadow-inner shadow-white px-3 py-2 rounded-lg button-citas mt-5 text-md transition"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}
