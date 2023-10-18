import React from "react";

interface HeaderProps {
  styles?: string;
}

const FeedbackHeader = ({ styles }: HeaderProps) => {
  return (
    <div
      className="h-8 sm:h-16 w-full flex justify-center items-center bg-white text-black border-none border-solid border-2 border-sky-500"
    >
      <div className={styles}>Feedback</div>
    </div>
  );
};

export default FeedbackHeader;
