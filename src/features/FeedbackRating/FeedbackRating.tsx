"use client";

import IconRating from "@/components/rating/IconRating";
import TagRating from "@/components/rating/TagRating";
import { Metadata } from "next";
import React, { useState, useEffect } from "react";
import { Feedback } from "./FeedbackRating.type";
import { AvailbleIconRating } from "@/components/rating/IconRating.type";
import { useBusinessStore, useFeedbackStore } from "@/store";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { redirect, useParams, useRouter } from "next/navigation";
import { submitFeedback } from "@/service/api";
import { useQueryClient, useMutation } from "react-query";
const FeedbackRating = ({ business }: { business: any }) => {
  const {
    currentPage,
    feedbacksTemplates,
    nextPage,
    prevPage,
    feedback,
    addFeedback,
    updateFeedback,
  } = useFeedbackStore();
  const { setBusiness } = useBusinessStore();
  const router = useRouter();
  const { slug } = useParams();
  const [ratingSelected, setRatingSelected] =
    useState<AvailbleIconRating | null>(null);
  const [comment, setComment] = useState<string>("");
  const [tag, setTag] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      // Invalidate and refetch
      router.push(`../thankyou/${slug}`);
    },
  });

  useEffect(() => {
    setBusiness(business.slug, business.name, business.logo);
  }, [business]);

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
  }, [currentPage, feedback]);

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
  const handlePageRedirectAndSubmit = async () => {
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
      let feedbackToSubmit = [...feedback, dynamicFeedbackData];
      if (feedbacksTemplates.length === feedback.length) {
        feedbackToSubmit = feedback;
      }
      try {
        return mutation.mutate(feedbackToSubmit);
      } catch (error) {
        return error;
      }
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
            <Image
              src={business?.logo}
              alt="business logo"
              width={50}
              height={50}
              priority
            />
          </div>
        </div>
        <h2 className="text-black text-2xl">{business?.name}</h2>
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

      <div className="w-full px-2 mb-2 flex gap-1">
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
          } btn disabled:bg-gray-300 disabled:text-white  btn-primary rounded-xl`}
          onClick={handlePageRedirectAndSubmit}
          {...(tag.length === 0 || mutation.isLoading
            ? { disabled: true }
            : { disabled: false })}
        >
          {mutation.isLoading ? "Loading" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default FeedbackRating;
