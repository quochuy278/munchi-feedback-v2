"use client";
import React, { useEffect, useState } from "react";
import checkIcon from "../../assets/icons/checkIcon.svg";
import heartIcon from "../../assets/icons/heart.svg";
import Image from "next/image";
import PaymentTip from "@/components/rating/PaymentTip";
import { createStripeSession } from "@/service/api";
import { redirect } from "next/navigation";
import { useBusinessStore, useFeedbackStore } from "@/store";
import { useRouter } from "next/router";
import { useQueryClient, useMutation } from "react-query";
const Thankyou = ({ tipSuccess }: { tipSuccess?: boolean }) => {
  const [tipAmount, setTipAmount] = useState<number>(0);
  const { slug, logo, name } = useBusinessStore();
  const { feedback, clearAll } = useFeedbackStore();

  useEffect(() => {
    if (!feedback || feedback.length === 0) {
      redirect(`../feedback/${slug}`);
    }
  }, [feedback, slug]);

  const handleSelectTip = (tipValue: number) => {
    setTipAmount(tipValue);
  };

  const mutation = useMutation({
    mutationFn: createStripeSession,
    onSuccess(data) {
      window.location.href = data.url;
    },
  });

  const handlePayment = async () => {
    mutation.mutate({
      businessSlug: slug,
      tipValue: tipAmount * 100,
      productName: `${slug} tips`,
      productDescription: `Tipping for ${slug}`,
    });
  };

  const handleSubmitNewFeedback = () => {
    clearAll();
    redirect(`../feedback/${slug}`);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center h-3/4 gap-4">
        <Image
          src={tipSuccess ? heartIcon : checkIcon}
          alt={"check icon"}
          width={60}
          height={60}
          priority
        />
        <div className="text-black justify-center items-center flex  flex-col px-4 text-center gap-2">
          <h3 className="text-2xl font-bold">Thank you!</h3>
          <p className="text-xl font-medium">
            Your feedback helps us improve our service.
          </p>
        </div>

        {!tipSuccess && (
          <div className="mt-6 text-black justify-center items-center flex  flex-col px-4 text-center gap-2">
            <h3 className="text-2xl font-bold">Do you want to support us!</h3>
            <p className="text-xl font-medium">
              Leave a tip for our hard working team!
            </p>
            <PaymentTip tipAmount={tipAmount} selectTip={handleSelectTip} />
          </div>
        )}
      </div>

      <div className="w-full mb-2 px-2">
        {!tipSuccess && (
          <button
            className={`w-full btn btn-primary ${
              tipSuccess && "btn-outline"
            } normal-case border-none mb-2`}
          >
            <a href="../thankyou">No! Thanks</a>
          </button>
        )}

        <button
          className={`w-full btn btn-primary ${
            tipSuccess && "btn-outline"
          } normal-case border-none disabled:bg-gray-300 disabled:text-white`}
          disabled={(tipAmount === 0 && !tipSuccess) || mutation.isLoading}
          onClick={tipSuccess ? handleSubmitNewFeedback : handlePayment}
        >
          {mutation.isLoading
            ? "Loading"
            : tipSuccess
            ? "Submit another feedback"
            : "Pay"}
        </button>
      </div>
    </div>
  );
};

export default Thankyou;
