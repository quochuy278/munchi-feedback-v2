import { fetchDataWithSlug, saveBusiness } from "@/service/api";
import { Metadata, NextPage } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

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
  } else {
    await saveBusiness({
      logo: data.logo ? data.logo : "",
      orderingId: data.id,
      slug: data.slug,
      name: data.name,
    });
  }

  return <NoSSRFeedBackRating business={data} />;
};

export default handler;
