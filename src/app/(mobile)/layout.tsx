import Layout from "@/components/Layout";
import React from "react";
import Feedback from "./feedback/page";
import FeedbackHeader from "@/components/Header";

interface MobileLayout {
  children: React.ReactNode;
}

const layout = ({ children }: MobileLayout) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default layout;
