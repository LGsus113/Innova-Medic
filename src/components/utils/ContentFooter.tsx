export default function ContentFooter() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center font-signika">
      <h1 className="text-white">
        © 2025
        <a href="#" className="hover:text-pink-200 hover:underline">
          {" "}
          Innova Medic{" "}
        </a>
        . Todos los derechos reservados.
      </h1>
      <hr className="w-3xl my-2 border border-white/20" />
      <h1 className="text-white">
        Poject by <span className="text-pink-800 font-bold">LGsus</span>
      </h1>
    </div>
  );
}
