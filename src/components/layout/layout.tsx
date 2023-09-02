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
      <div className="mt-20">{children}</div>
      <Footer />
    </ThemeProvider>
  );
};
