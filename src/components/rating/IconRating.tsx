import React from "react";
import angryIcon from "../../assets/icons/terrible.svg";
import badIcon from "../../assets/icons/bad.svg";
import okIcon from "../../assets/icons/okay.svg";
import goodIcon from "../../assets/icons/good.svg";
import awesomeIcon from "../../assets/icons/awesome.svg";
import { AvailbleIconRating, Icon, IconRatingEnum } from "./IconRating.type";
import Image from "next/image";

const Icons: Icon[] = [
  {
    name: "Terrible",
    iconSource: angryIcon,
    value: IconRatingEnum.TERRBILE,
  },
  {
    name: "Bad",
    iconSource: badIcon,
    value: IconRatingEnum.BAD,
  },
  {
    name: "Okay",
    iconSource: okIcon,
    value: IconRatingEnum.OK,
  },
  {
    name: "Good",
    iconSource: goodIcon,
    value: IconRatingEnum.GOOD,
  },
  {
    name: "Awesome",
    iconSource: awesomeIcon,
    value: IconRatingEnum.AWESOME,
  },
];

interface IconRatingProps {
  rating: AvailbleIconRating | null;
  selectRating: (value: AvailbleIconRating) => void;
}

const IconRating = ({ rating, selectRating }: IconRatingProps) => {
  const handleRatingSelect = (value: AvailbleIconRating) => {
    selectRating(value);
  };

  return (
    <div className="flex flex-wrap justify-evenly w-full mt-2">
      {Icons.map((icon: Icon, index: number) => {
        return (
          <button
            onClick={() => handleRatingSelect(icon.value)}
            key={index}
            className={`flex flex-col normal-case place-items-center ${
              icon.value === rating && rating ? "opacity-100 " : "opacity-50"
            } ${!rating ? "opacity-100" : ""}`}
          >
            <div>
              <Image
                src={icon.iconSource}
                alt="rating-icon-btn"
                width={40}
                height={40}
              />
            </div>

            <div>
              <p className="text-black">{icon.name}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default IconRating;
