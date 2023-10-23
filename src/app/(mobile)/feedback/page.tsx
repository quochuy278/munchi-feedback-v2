import dynamic from "next/dynamic";
import { RedirectType, redirect } from "next/navigation";

const NoSSRFeedBackRating = dynamic(
  () => import("@/features/FeedbackRating/FeedbackRating"),
  { ssr: false }
);

const Feedback = () => {
  redirect("error");
};

export default Feedback;
