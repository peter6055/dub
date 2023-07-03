import { notFound } from "next/navigation";
import { getLinkViaEdge } from "#/lib/planetscale";
import Stats from "#/ui/stats";
import { Suspense } from "react";
import { Metadata } from "next";
import { constructMetadata } from "#/lib/utils";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { key: string };
}): Promise<Metadata | undefined> {
  const data = await getLinkViaEdge("internal-short.shopmy.com.au", params.key);

  if (!data || !data.publicStats) {
    return;
  }

  return constructMetadata({
    title: `Stats for internal-short.shopmy.com.au/${params.key} - Dub`,
    description: `Stats page for internal-short.shopmy.com.au/${params.key}, which redirects to ${data.url}.`,
    image: `https://internal-short.shopmy.com.au/api/og/stats?domain=internal-short.shopmy.com.au&key=${params.key}`,
  });
}

export async function generateStaticParams() {
  return [
    {
      key: "github",
    },
  ];
}

export default async function StatsPage({
  params,
}: {
  params: { key: string };
}) {
  const data = await getLinkViaEdge("internal-short.shopmy.com.au", params.key);

  if (!data || !data.publicStats) {
    notFound();
  }

  return (
    <div className="bg-gray-50">
      <Suspense fallback={<div className="h-screen w-full bg-gray-50" />}>
        <Stats staticDomain="internal-short.shopmy.com.au" />
      </Suspense>
    </div>
  );
}
