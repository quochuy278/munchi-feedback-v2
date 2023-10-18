import FeedbackHeader from "@/components/Header";
import FeedbackRating from "@/features/FeedbackRating/FeedbackRating";
import React from "react";

const Feedback = () => {
  return (
    <div className="w-screen md:max-w-sm">
      <FeedbackHeader />
      <div className="w-screen md:max-w-sm md:max-h-[50rem] h-[calc(100vh-32px)] sm:h-[calc(100vh-64px)] bg-white flex justify-center flex-col items-center overscroll-none touch-none">
        <FeedbackRating />
      </div>
    </div>
  );
};

export default Feedback;
