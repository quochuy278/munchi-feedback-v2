"use client";

import IconRating from "@/components/rating/IconRating";
import TagRating from "@/components/rating/TagRating";
import { Metadata } from "next";
import React, { useState } from "react";
import { FeedbackTemplate } from "./FeedbackRating.type";
import { AvailbleIconRating } from "@/components/rating/IconRating.type";

export const metadata: Metadata = {
  title: {
    absolute: "Munchi Feedback",
  },
};

const feedbacksTemplates: FeedbackTemplate[] = [
  {
    type: "service",
    question: "How was your experience?",
  },
  {
    type: "order",
    question: "How was your order?",
  },
  {
    type: "decoration",
    question: "How was our decoration?",
  },
];

const FeedbackRating = () => {
  const [ratingSelected, setRatingSelected] =
    useState<AvailbleIconRating | null>(null);
  const [comment, setComment] = useState<string>("");
  const [tag, setTag] = useState<string[]>([]);

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


  
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex flex-col gap-1 place-items-center h-1/2 p-4">
        <div className="avatar  mt-6">
          <div className="w-24 rounded-full">
            <img src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" />
          </div>
        </div>
        <h2 className="text-black text-2xl">Juicy Burger</h2>
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
        <button className="btn btn-primary w-full normal-case">Next</button>
      </div>
    </div>
  );
};

export default FeedbackRating;
