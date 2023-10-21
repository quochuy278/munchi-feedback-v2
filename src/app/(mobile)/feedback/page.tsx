import dynamic from "next/dynamic";

const NoSSRFeedBackRating = dynamic(
  () => import("@/features/FeedbackRating/FeedbackRating"),
  { ssr: false }
);

const Feedback = () => {
  return <NoSSRFeedBackRating />;
};

export default Feedback;
