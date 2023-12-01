"use client";
import PaymentTip from "@/components/rating/PaymentTip";
import { createStripeSession } from "@/service/api";
import { useBusinessStore, useFeedbackStore } from "@/store";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import checkIcon from "../../assets/icons/checkIcon.svg";
import heartIcon from "../../assets/icons/heart.svg";

const Thankyou = ({ tipSuccess }: { tipSuccess?: boolean }) => {
  const router = useRouter();
  const [tipAmount, setTipAmount] = useState<number>(0);
  const { slug, orderingId } = useBusinessStore();

  const { feedback, clearAll } = useFeedbackStore();

  const baseUrl =
    typeof window !== "undefined" && window.location.host
      ? window.location.host
      : "";
  const protocol =
    typeof window !== "undefined" && window.location.protocol
      ? window.location.protocol
      : "";

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
    const successUrl = `${protocol}//${baseUrl}/thankyou`;
    mutation.mutate({
      businessSlug: slug,
      tipValue: tipAmount * 100,
      productName: `${slug} tips`,
      productDescription: `Tipping for ${slug}`,
      successUrl: successUrl,
      businessOrderingId: orderingId,
    });
  };

  const redicrectHandler = () => {
    router.replace("../thankyou");
  };

  const handleSubmitNewFeedback = () => {
    clearAll();
    router.push(`../feedback/${slug}`);
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
            onClick={redicrectHandler}
          >
            No! Thanks
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
