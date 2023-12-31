import React from "react";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Navbar />
      <main className="flex justify-center p-10">
        <div className="layout-container">{children}</div>
      </main>
      <Footer />
    </ThemeProvider>
  );
};
