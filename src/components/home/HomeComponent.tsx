import Header from "@src/components/home/elements/header/Header";
import Main from "@src/components/home/elements/main/Main";
import Footer from "@src/components/home/elements/footer/Footer";
import { SectionProvider } from "@src/context/SectionContext";

export default function Home() {
  return (
    <SectionProvider>
      <Header />
      <Main />
      <Footer />
    </SectionProvider>
  );
}
