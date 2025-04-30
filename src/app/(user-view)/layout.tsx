import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/navbar/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "../providers";

export const metadata: Metadata = {
  title: "Daily Gen-G",
  description: "Unfiltered Voice of Bangladesh",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <section className="flex flex-col min-h-screen items-center justify-start bg-gray-200 dark:bg-gray-900">
                <div className="container mx-auto md:w-[80%] md:border-x-2 border-black dark:border-white bg-white dark:bg-black">
                  <header className="sticky top-0 z-50 ">
                    <Navbar />
                  </header>
                  <main className="flex-1 overflow-x-hidden relative ">
                    {children}
                  </main>
                  <footer className="overflow-x-hidden">
                    <Footer />
                  </footer>
                </div>
              </section>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
