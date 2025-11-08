'use client';

import { ToasterProvider } from "react-toastella";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToasterProvider>
        {children}
      </ToasterProvider>
    </>
  );
};

export default Layout;
