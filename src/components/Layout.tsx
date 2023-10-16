import React from "react";
import Header from "./Header";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata ={
    title: 'Munchi feedback'
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
