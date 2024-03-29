import React, { useEffect } from "react";
import Navbar from "./foundations/navbar";
import { Toaster } from "./ui/toaster";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { useTranslation } from "react-i18next";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

function Layout({ children, className, ...props }: LayoutProps) {
  setTimeout(() => {}, 2000);
  useAuthenticated();

  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <Toaster />
      <Navbar />

      <main
        className={`flex w-full justify-center px-4 md:px-6 ${className}`}
        {...props}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
