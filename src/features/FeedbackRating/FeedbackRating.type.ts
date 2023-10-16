import { AvailbleIconRating } from "@/components/rating/IconRating.type";

export type Feedback = {
  type: FeedbackTypeAvailable;
  data: FeedbackData;
};

export type FeedbackData = {
  iconRating: AvailbleIconRating;
  tagsRating: string[];
  comment: string;
};

export type FeedbackTemplate = {
  type: FeedbackTypeAvailable;
  question: string;
};

export type FeedbackTypeAvailable = "service" | "order" | "decoration";
