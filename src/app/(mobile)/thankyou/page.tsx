"use client";
import Thankyou from "@/features/Thankyou/Thankyou";
import { redirect } from "next/navigation";
const ThankYouPage = () => {
  return <Thankyou tipSuccess={true} />;
};

export default ThankYouPage;
