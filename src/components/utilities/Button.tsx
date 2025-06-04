export default function Button({ title }: { title: string }) {
  return (
    <a
      href="#"
      className="btn font-extrabold mt-5 rounded-sm h-11 uppercase p-[0_20px] items-center justify-center text-center bg-white text-pink-600"
    >
      {title}
    </a>
  );
}
