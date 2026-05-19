import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { StoreProvider } from "@/components/providers/StoreProvider";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "StoreFront | Modern E-commerce",
  description: "High quality e-commerce platform for clothing and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased transition-colors duration-300">
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <AuthProvider>
              <div className="flex min-h-screen flex-col bg-background text-foreground">
                <Header />
                <main className="flex-1 bg-background">{children}</main>
                <Footer />
              </div>
            </AuthProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
