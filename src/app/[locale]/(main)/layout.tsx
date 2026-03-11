import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCart from "@/components/layout/FloatingCart";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FloatingCart />
    </>
  );
}
