import Thankyou from "@/features/Thankyou/Thankyou";
import { fetchDataWithSlug } from "@/service/api";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import React from "react";

const page: NextPage<{
  params: { slug: string };
}> = async ({ params }) => {
  const businessSlug = params.slug;
  const data = await fetchDataWithSlug(businessSlug);

  if (!data || data.error) {
    return redirect("/error");
  }

  return <Thankyou />;
};

export default page;
