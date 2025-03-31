import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/navbar/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Daily Awaaz BD",
  description: "Unfiltered Voice of Bangladesh",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={``}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <section className="container mx-auto overflow-x-hidden ">
            <header>
              <Navbar />
            </header>
            <main>{children}</main>
            <footer>
              <Footer />
            </footer>
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
