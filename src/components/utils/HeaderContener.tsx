export default function HeaderContener({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header id="header-home" className="w-full h-auto max-w-[2000px]">
      {children}
    </header>
  );
}
