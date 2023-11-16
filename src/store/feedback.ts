import {
  Feedback,
  FeedbackEnum,
  FeedbackTemplate,
} from "@/features/FeedbackRating/FeedbackRating.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const feedbacksTemplates: FeedbackTemplate[] = [
  {
    type: FeedbackEnum.SERVICE,
    question: "How was your experience?",
  },
  {
    type: FeedbackEnum.ORDER,
    question: "How was your order?",
  },
  {
    type: FeedbackEnum.DECORATION,
    question: "How was our decoration?",
  },
];

interface InitialState {
  currentPage: number;
  feedbacksTemplates: FeedbackTemplate[];
  feedback: Feedback[];
  tip: boolean;
  addFeedback: (feedback: Feedback) => void;
  updateFeedback: (id: number | string, feedback: Feedback) => void;
  setCurrentPage: (value: number) => void;
  nextPage: (value: number) => void;
  prevPage: (value: number) => void;
  setTip: () => void;
  clearAll: () => void;
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
      tip: true,
      addFeedback: (feedback: Feedback) =>
        set((state) => ({
          feedback: addFeedback(state.feedback, feedback),
        })),
      updateFeedback: (id: string | number, updatedFeedback: Feedback) =>
        set((state) => ({
          feedback: state.feedback.map((fb) =>
            fb.id === id ? updatedFeedback : fb
          ),
        })),
      setCurrentPage: (value: number) =>
        set((state) => ({
          currentPage: value, // Enforce minimum 0
        })),
      nextPage: (value: number) =>
        set((state) => ({
          currentPage: Math.max(0, state.currentPage + value), // Enforce minimum 0
        })),
      prevPage: (value: number) =>
        set((state) => ({
          currentPage: Math.max(0, state.currentPage - value),
        })),
      setTip: () =>
        set((state) => ({
          tip: !state.tip,
        })),
      clearAll: () => {
        set({
          feedback: [], // Clear the feedback array
          currentPage: 0, // Reset currentPage to 0
          tip: true,
        });
      },
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
