import FeedbackHeader from "@/components/Header";
import React from "react";

interface MobileLayout {
  children: React.ReactNode;
}

const layout = ({ children }: MobileLayout) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <FeedbackHeader />
      <div className="flex-1 w-full bg-white flex justify-center flex-col items-center overscroll-none touch-none">
        {children}
      </div>

    </div>
  );
};

export default layout;
