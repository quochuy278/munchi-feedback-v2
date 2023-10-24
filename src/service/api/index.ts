import axios from "axios";
import { Business, StripeSessionData } from "./index.type";
import { Feedback } from "@/features/FeedbackRating/FeedbackRating.type";

const fetchDataWithSlug = async (slug: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}business/${slug}?params=logo,slug,name`
    );

    return response.data.result;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to fetch: ${error.message}`);
  }
};

const createStripeSession = async ({
  businessSlug,
  productDescription,
  productName,
  tipValue,
}: StripeSessionData) => {
  try {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_PRIVATE_DOMAIN}payment/session`,
      {
        method: "post",
        data: {
          businessSlug: businessSlug,
          productDescription: productDescription,
          productName: productName,
          tipValue: tipValue,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to create payment session: ${error.message}`);
  }
};

const submitFeedback = async (feedback: Feedback[]) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_PRIVATE_DOMAIN}feedback/submit`,
      feedback
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to submit feedback session: ${error.message}`);
  }
};

const saveBusiness = async (business: Business) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_PRIVATE_DOMAIN}business/create`,
      business
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to submit feedback session: ${error.message}`);
  }
};

export { fetchDataWithSlug, createStripeSession, submitFeedback, saveBusiness };
