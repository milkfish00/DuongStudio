import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_DETAIL_QUERY } from "@/sanity/lib/queries";
import IndustrialProjectDetail, {
  type IndustrialProjectDetailData,
} from "./IndustrialProjectDetail";

export default async function IndustrialDesignProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: project } = await sanityFetch<IndustrialProjectDetailData>({
    query: PROJECT_DETAIL_QUERY,
    params: { slug },
  });

  if (!project) {
    notFound();
  }

  return <IndustrialProjectDetail project={project} />;
}
