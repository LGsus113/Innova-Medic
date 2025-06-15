import { useAuthContext } from "@src/context/AuthContext";
import User from "@src/assets/user.svg?react";
import { useEffect, useRef, useState } from "react";

export default function Informacion() {
  const { logout } = useAuthContext();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const classButton =
    "w-auto bg-transparent border-none outline-none hover:cursor-pointer hover:underline hover:decoration-pink-300 decoration-2 underline-offset-[3px] text-end";

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex gap-2 justify-center items-center cursor-pointer"
      >
        <User className="size-10 text-pink-600 rounded-full bg-white p-1 shadow-inner shadow-black/90" />
        <div
          className={`pointer-events-none w-0 h-0 border-y-4 border-l-6 border-y-transparent border-l-white transition-transform duration-200 ${
            open ? "rotate-90" : "rotate-180"
          }`}
        ></div>
      </div>
      {open && (
        <div className="w-36 flex flex-col font-signika absolute top-full right-0 mt-5 bg-pink-600 text-white text-lg rounded-b-sm px-4 py-2 z-40 shadow-inner shadow-pink-300">
          <button className={classButton}>Perfil</button>
          <button onClick={logout} className={classButton}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
