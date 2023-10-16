import { StaticImageData } from "next/image";

export type IconSurveryProps = {
  selectRating: React.Dispatch<React.SetStateAction<number | null>>;
};

export type Icon = {
  name: string;
  iconSource: StaticImageData;
  value: number;
};

export enum IconRatingEnum {
  TERRBILE = 1,
  BAD = 2,
  OK = 3,
  GOOD = 4,
  AWESOME = 5,
}

export type AvailbleIconRating =
  | IconRatingEnum.TERRBILE
  | IconRatingEnum.BAD
  | IconRatingEnum.OK
  | IconRatingEnum.GOOD
  | IconRatingEnum.AWESOME;
