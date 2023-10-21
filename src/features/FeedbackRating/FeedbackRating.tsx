"use client";

import IconRating from "@/components/rating/IconRating";
import TagRating from "@/components/rating/TagRating";
import { Metadata } from "next";
import React, { useState, useEffect } from "react";
import { Feedback, FeedbackTemplate } from "./FeedbackRating.type";
import { AvailbleIconRating } from "@/components/rating/IconRating.type";
import { useFeedbackStore } from "@/store";
import { v4 as uuidv4 } from "uuid";

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
    updateFeedback,
  } = useFeedbackStore();
  const [ratingSelected, setRatingSelected] =
    useState<AvailbleIconRating | null>(null);
  const [comment, setComment] = useState<string>("");
  const [tag, setTag] = useState<string[]>([]);

  useEffect(() => {
    if (feedback[currentPage]) {
      setComment(feedback[currentPage].data.comment);
      setTag(feedback[currentPage].data.tagsRating);
      setRatingSelected(feedback[currentPage].data.iconRating);
    } else {
      setComment("");
      setTag([]);
      setRatingSelected(null);
    }
  }, [currentPage]);

  const handleSelectRating = (value: AvailbleIconRating) => {
    setRatingSelected(value);
    console.log(tag.length);
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
  console.log(currentPage);
  // This function will handle page redirect and submit information if possible
  const handlePageRedirectAndSubmit = () => {
    const dynamicFeedbackData: Feedback = {
      id: uuidv4(),
      type: feedbacksTemplates[currentPage].type,
      data: {
        iconRating: ratingSelected as AvailbleIconRating,
        tagsRating: tag,
        comment: comment,
      },
    };

    const existedFeedback = feedback.filter(
      (feedbackType: Feedback) =>
        feedbackType.type === feedbacksTemplates[currentPage].type
    );

    if (!existedFeedback || existedFeedback.length === 0) {
      addFeedback(dynamicFeedbackData);
    } else {
      updateFeedback(existedFeedback[0].id, dynamicFeedbackData);
    }

    if (currentPage === feedbacksTemplates.length - 1) {
      console.log("no page left to next");
      return;
    }
    nextPage(1);
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
        <div className="w-full p-4 flex flex-col flex-wrap place-items-center text-center">
          <h5 className="text-black text-xl font-medium">
            What could we improve?
          </h5>
          <p className="text-black mt-1">
            Your feedback helps us improve our products.
          </p>
        </div>
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

      <div
        className="w-full px-2 mb-2 flex gap-1
      "
      >
        {feedback.length > 0 && currentPage > 0 && (
          <button
            className="btn btn-primary w-1/2 normal-case rounded-xl"
            onClick={handleBackHandler}
          >
            Back
          </button>
        )}

        <button
          className={` ${
            feedback.length > 0 && currentPage !== 0 ? "w-1/2" : "w-full"
          } btn disabled:bg-gray-300 disabled:text-white  btn-primary`}
          onClick={handlePageRedirectAndSubmit}
          {...(tag.length === 0 ? { disabled: true } : { disabled: false })}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FeedbackRating;
