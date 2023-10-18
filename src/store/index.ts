import {
  Feedback,
  FeedbackTemplate,
} from "@/features/FeedbackRating/FeedbackRating.type";
import { create } from "zustand";
import { persist,createJSONStorage } from "zustand/middleware";

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
  nextPage: (value: number) => void;
  prevPage: (value: number) => void;
}

const useFeedbackStore = create<InitialState>()(
  persist(
    (set) => ({
      currentPage: 0,
      feedbacksTemplates: feedbacksTemplates,
      feedback: [],
      addFeedback: (feedback: Feedback) =>
        set((state) => ({ feedback: [...state.feedback, feedback] })),
      nextPage: (value: number) =>
        set((state) => ({ currentPage: state.currentPage + value })),
      prevPage: (value: number) =>
        set((state) => ({ currentPage: state.currentPage - value })),
    }),
    {
      name:'feedback',
      partialize: (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([key]) => !['feedbacksTemplates'].includes(key))
      ),
    }
  )
 );


export { useFeedbackStore };
