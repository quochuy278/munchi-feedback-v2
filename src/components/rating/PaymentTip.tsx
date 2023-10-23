"use client";

import React from "react";

import { v4 as uuidv4 } from "uuid";
import loveSvg from "../../assets/icons/love.svg";
import startSvg from "../../assets/icons/star.svg";
import niceVsg from "../../assets/icons/nice.svg";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type PaymentOption = {
  id: string | number;
  amount: number;
  icon: string | StaticImport;
};

const paymentOptions: PaymentOption[] = [
  {
    id: uuidv4(),
    amount: 1,
    icon: niceVsg,
  },
  {
    id: uuidv4(),
    amount: 3,
    icon: niceVsg,
  },
  {
    id: uuidv4(),
    amount: 5,
    icon: loveSvg,
  },
  {
    id: uuidv4(),
    amount: 10,
    icon: startSvg,
  },
];

type PaymenTipProps = {
  tipAmount: number;
  selectTip: (tipValue: number) => void;
};

const PaymentTip = ({ tipAmount, selectTip }: PaymenTipProps) => {
  const handleSelectTipp = (tipValue: number) => {
    selectTip(tipValue);
  };

  return (
    <div className="flex justify-evenly w-full mt-4 flex-wrap">
      {paymentOptions.map((option: PaymentOption, index: number) => {
        return (
          <button
            key={index}
            className={` flex items-center gap-1 p-2 border-solid border rounded-xl border-gray-400 ${
              tipAmount === option.amount && "btn-primary"
            }`}
            onClick={() => handleSelectTipp(option.amount)}
          >
            <Image src={option.icon} alt={"icon"} width={30} height={30} />
            <p className="font-medium"> {option.amount} €</p>
          </button>
        );
      })}
    </div>
  );
};

export default PaymentTip;
