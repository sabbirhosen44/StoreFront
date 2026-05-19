import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-furniro-gold/10">
      <Header />

      <main className="flex-1 w-full relative z-0">{children}</main>

      <Footer />
    </div>
  );
}
