"use client";

import IconRating from "@/components/rating/IconRating";
import TagRating from "@/components/rating/TagRating";
import { Metadata } from "next";
import React, { useState, useEffect } from "react";
import { Feedback, FeedbackTemplate } from "./FeedbackRating.type";
import { AvailbleIconRating } from "@/components/rating/IconRating.type";
import { useFeedbackStore } from "@/store";

export const metadata: Metadata = {
  title: {
    absolute: "Munchi Feedback",
  },
};

const FeedbackRating = () => {
  const {
    currentPage,
    feedbacksTemplates,
    nextPage,
    prevPage,
    feedback,
    addFeedback,
  } = useFeedbackStore();
  const [ratingSelected, setRatingSelected] =
    useState<AvailbleIconRating | null>(null);
  const [comment, setComment] = useState<string>("");
  const [tag, setTag] = useState<string[]>([]);
  console.log(currentPage);
  console.log(feedback);

  useEffect(() => {
    setComment("");
    setTag([]);
    setRatingSelected(null);
  }, [feedback]);

  const handleSelectRating = (value: AvailbleIconRating) => {
    setRatingSelected(value);
  };

  const handleTagSelect = (tagValue: string) => {
    // Check if the chip is already selected
    const isSelected = tag.includes(tagValue);

    // Update the selectedChips state based on the current selection
    setTag((prevTag) =>
      isSelected
        ? prevTag.filter((value) => value !== tagValue)
        : [...prevTag, tagValue]
    );
  };

  const handleSubmitComment = (comment: string) => {
    setComment(comment);
  };

  // This function will handle page redirect and submit information if possible
  const handlePageRedirectAndSubmit = () => {
    const feedback2: Feedback = {
      type: feedbacksTemplates[currentPage].type,
      data: {
        iconRating: ratingSelected as AvailbleIconRating,
        tagsRating: tag,
        comment: comment,
      },
    };
    console.log(feedback2);

    const existedFeedback = feedback.filter(
      (feedbackType: Feedback) =>
        feedbackType.type === feedbacksTemplates[currentPage].type
    );

    if (!existedFeedback || existedFeedback.length === 0) {
      addFeedback(feedback2);
      nextPage(1);
    }
  };

  const handleBackHandler = () => {
    prevPage(1);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex flex-col gap-1 place-items-center h-1/2 p-4">
        <div className="avatar  mt-6">
          <div className="w-24 rounded-full">
            <img src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" />
          </div>
        </div>
        <h2 className="text-black text-2xl">Juicy Burger</h2>
        <div className="w-full p-4 flex flex-col flex-wrap place-items-center text-center">
          <h5 className="text-black text-xl font-medium">
            {feedbacksTemplates[currentPage].question}
          </h5>
          <p className="text-black mt-1">
            Your feedback helps us improve our service.
          </p>
        </div>
        <IconRating rating={ratingSelected} selectRating={handleSelectRating} />
        {ratingSelected && (
          <TagRating
            comment={comment}
            rating={ratingSelected}
            submitComment={handleSubmitComment}
            selectTag={handleTagSelect}
            selectedTag={tag}
          />
        )}
      </div>
      <div className="w-full">
        <button 
          className="btn btn-primary w-full normal-case"
          onClick={handlePageRedirectAndSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FeedbackRating;
