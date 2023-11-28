import FeedbackHeader from "@/components/Header";
import React from "react";

interface MobileLayout {
  children: React.ReactNode;
}

const layout = ({ children }: MobileLayout) => {
  return (
    <div className="w-screen md:max-w-sm h-screen flex flex-col justify-center items-center">
      <FeedbackHeader />
      <div className="w-screen md:max-w-sm md:max-h-[50rem] h-[calc(100vh-64px)] xs:h-[calc(100dvh)] bg-white flex justify-center flex-col flex-wrap items-center overscroll-none">
        {children}
      </div>
    </div>
  );
};

export default layout;
