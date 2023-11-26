import FeedbackHeader from "@/components/Header";
import React from "react";

interface MobileLayout {
  children: React.ReactNode;
}

const layout = ({ children }: MobileLayout) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-screen md:max-w-sm">
        <FeedbackHeader />
        <div className="w-screen md:max-w-sm md:max-h-[50rem] h-[calc(100vh-64px)]  bg-white flex justify-center flex-col items-center overscroll-none touch-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
