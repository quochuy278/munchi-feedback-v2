"use client";

import React, { useState, Fragment, useRef } from "react";
import { IconRatingEnum } from "./IconRating.type";
import { TagRatingProps } from "./TagRating.type";
import { Transition, Dialog } from "@headlessui/react";

const tagCollection = [
  {
    type: IconRatingEnum.TERRBILE,
    collection: [
      "Terrible",
      "Waiting time",
      "Professionalism",
      "Positiveness",
      "Atmosphere",
    ],
  },
  {
    type: IconRatingEnum.BAD,
    collection: [
      "Bad",
      "Waiting time",
      "Professionalism",
      "Positiveness",
      "Atmosphere",
    ],
  },
  {
    type: IconRatingEnum.OK,
    collection: [
      "OK",
      "Waiting time",
      "Professionalism",
      "Positiveness",
      "Atmosphere",
    ],
  },
  {
    type: IconRatingEnum.GOOD,
    collection: [
      "Good",
      "Waiting time",
      "Professionalism",
      "Positiveness",
      "Atmosphere",
    ],
  },
  {
    type: IconRatingEnum.AWESOME,
    collection: [
      "Awesome",
      "Waiting time",
      "Professionalism",
      "Positiveness",
      "Atmosphere",
    ],
  },
];

const TagRating = ({
  comment,
  rating,
  selectTag,
  submitComment,
  selectedTag,
}: TagRatingProps) => {
  //Dialog state
  const [open, setOpen] = useState<boolean>(false);
  const commentInputRef = useRef<HTMLInputElement | null>(null);
  const { collection } = tagCollection[rating - 1];

  const handlerSelectTag = (tagValue: string) => {
    selectTag(tagValue);
  };
  //Handler open dialog and close dialog
  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitComment = () => {
    const comment = commentInputRef.current!.value;
    submitComment(comment);
    setOpen(false);
  };
  // TODO: The comment will be overflow if it is too long
  return (
    <div className="w-full h-[auto] p-0.5 round-md flex justify-center flex-wrap animate-fadeIn gap-2 mt-2">
      {collection.map((tagLabel: string, index: number) => {
        return (
          <button
            className={`badge badge-primary font-medium border-none p-3 ${
              selectedTag.includes(tagLabel) ? "" : "badge-outline bg-[#ffeded]"
            }`}
            onClick={() => handlerSelectTag(tagLabel)}
            key={index}
          >
            {tagLabel}
          </button>
        );
      })}

      <button
        className={` ${
          !comment && "badge-outline bg-[#ffeded]"
        } badge badge-primary  font-medium p-3 `}
        onClick={handleDialogOpen}
      >
        {comment ? (
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            {comment}
          </div>
        ) : (
          "+ Add a comment for the restaurant"
        )}
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900 bg-[#F7F7F7] p-4"
                  >
                    Add a comment for the restaurant
                  </Dialog.Title>
                  <div className="relative p-4 mt-4">
                    <input
                      type="text"
                      id="feedback"
                      defaultValue={comment}
                      className="block pb-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-300 peer"
                      placeholder=""
                      ref={commentInputRef}
                    />
                    <label
                      htmlFor={"feedback"}
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Write your feedback
                    </label>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleSubmitComment}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default TagRating;
