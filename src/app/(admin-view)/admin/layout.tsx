import type React from "react";
import "../../globals.css";
import { ThemeProvider } from "@/components/navbar/ThemeProvider";
import Providers from "@/app/providers";
import AdminDashboard from "@/components/AdminDashboard";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <AdminDashboard>{children}</AdminDashboard>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default AdminLayout;
