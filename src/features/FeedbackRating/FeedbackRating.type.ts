import { AvailbleIconRating } from "@/components/rating/IconRating.type";

export type Feedback = {
  id: string | number;
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

export enum FeedbackEnum {
  SERVICE = 1,
  ORDER = 2,
  DECORATION = 3,
}

export type FeedbackTypeAvailable =
  | FeedbackEnum.SERVICE
  | FeedbackEnum.ORDER
  | FeedbackEnum.DECORATION;
