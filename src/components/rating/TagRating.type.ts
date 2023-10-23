import { AvailbleIconRating } from "./IconRating.type";

export interface TagRatingProps {
  rating: AvailbleIconRating;
  selectedTag: string[];
  comment: string;
  submitComment: (event: any) => void;
  selectTag: (tagValue: string) => void;
}
