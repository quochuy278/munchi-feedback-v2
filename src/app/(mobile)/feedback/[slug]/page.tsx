import { fetchDataWithSlug } from "@/service/api";
import { useBusinessStore } from "@/store";
import { Metadata, NextPage } from "next";
import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: {
    absolute: "Munchi Feedback",
  },
};

const NoSSRFeedBackRating = dynamic(
  () => import("@/features/FeedbackRating/FeedbackRating"),
  { ssr: false }
);

const handler: NextPage<{
  params: { slug: string };
}> = async ({ params }) => {
  const businessSlug = params.slug;
  const data = await fetchDataWithSlug(businessSlug);

  if (!data || data.error) {
    return redirect("/error");
  }

  return <NoSSRFeedBackRating business={data} />;
};

export default handler;
