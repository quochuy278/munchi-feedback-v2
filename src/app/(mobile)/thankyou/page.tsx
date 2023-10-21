"use client";
import React, { useState } from "react";
import checkIcon from "../../../assets/icons/checkIcon.svg";
import Image from "next/image";
import PaymentTip from "@/components/rating/PaymentTip";
const ThankYouPage = () => {
  const [tipAmount, setTipAmount] = useState<number>(0);

  const handleSelectTip = (tipValue: number) => {
    setTipAmount(tipValue);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center h-3/4 gap-4">
        <Image src={checkIcon} alt={"check icon"} width={60} height={60} />
        <div className="text-black justify-center items-center flex  flex-col px-4 text-center gap-2">
          <h3 className="text-2xl font-bold">Thank you!</h3>
          <p className="text-xl font-medium">
            Your feedback helps us improve our service.
          </p>
        </div>
        <div className="mt-6 text-black justify-center items-center flex  flex-col px-4 text-center gap-2">
          <h3 className="text-2xl font-bold">Do you want to support us!</h3>
          <p className="text-xl font-medium">
            Leave a tip for our hard working team!
          </p>
          <PaymentTip tipAmount={tipAmount} selectTip={handleSelectTip} />
        </div>
      </div>

      <div className="w-full mb-2 px-2">
        <button className="w-full btn btn-primary btn-outline normal-case border-none">
          {" "}
          Submit another feedback
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
