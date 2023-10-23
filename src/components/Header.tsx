import React from "react";

interface HeaderProps {
  styles?: string;
}

const FeedbackHeader = ({ styles }: HeaderProps) => {
  return (
    <div className="h-16 w-full flex justify-center items-center bg-white text-black border-b-0">
      <div className="text-xl font-bold">Feedback</div>
    </div>
  );
};

export default FeedbackHeader;
