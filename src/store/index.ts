import {
  Feedback,
  FeedbackTemplate,
} from "@/features/FeedbackRating/FeedbackRating.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

interface InitialState {
  currentPage: number;
  feedbacksTemplates: FeedbackTemplate[];
  feedback: Feedback[];
  addFeedback: (feedback: Feedback) => void;
  updateFeedback: (id: number | string, feedback: Feedback) => void;
  nextPage: (value: number) => void;
  prevPage: (value: number) => void;
}

const addFeedback = (feedback: Feedback[], newFeedback: Feedback) => [
  ...feedback,
  newFeedback,
];

const useFeedbackStore = create<InitialState>()(
  persist(
    (set) => ({
      currentPage: 0,
      feedbacksTemplates: feedbacksTemplates,
      feedback: [],
      addFeedback: (feedback: Feedback) =>
        set((state) => ({
          ...state.feedback,
          feedback: addFeedback(state.feedback, feedback),
        })),
      updateFeedback: (id: string | number, updatedFeedback: Feedback) =>
        set((state) => ({
          feedback: state.feedback.map((fb) =>
            fb.id === id ? updatedFeedback : fb
          ),
        })),
      nextPage: (value: number) =>
        set((state) => ({
          currentPage: Math.max(0, state.currentPage + value), // Enforce minimum 0
        })),
      prevPage: (value: number) =>
        set((state) => ({
          currentPage: Math.max(0, state.currentPage - value),
        })),
    }),
    {
      name: "feedback",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["feedbacksTemplates"].includes(key)
          )
        ),
    }
  )
);

export { useFeedbackStore };
