import { useEffect, useRef } from "react";
import type { PDFDialogProps } from "@src/types/type";
import Close from "@src/assets/svg/close.svg?react";

export default function PDFDialog({
  url,
  open,
  onClose,
  title = "Receta detallada",
}: PDFDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed size-full bg-black/0 z-50 flex items-center justify-center p-4 m-auto rounded-2xl dialog-info-medic"
    >
      <div className="w-[90%] max-w-4xl h-[90vh] border-2 border-black/90 bg-dark rounded-xl p-4 flex flex-col gap-4 bg-util shadow-inner shadow-black drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-pink-600">{title}</h2>
          <form method="dialog">
            <button
              onClick={onClose}
              className="text-pink-600 hover:text-pink-700 font-bold text-xl cursor-pointer border-none outline-none transition-all duration-150"
            >
              <Close className="size-10" />
            </button>
          </form>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            src={url}
            className="w-full h-full rounded border"
            title={title}
          />
        </div>
      </div>
    </dialog>
  );
}
