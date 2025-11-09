'use client';
import { ToasterProvider } from "react-toastella";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RouterGuard } from "../routerGuard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToasterProvider>
        <RouterGuard>
        {children}
        </RouterGuard>
      </ToasterProvider>
    </>
  );
};

export default Layout;
