import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Episodes" };

export default function EpisodesPage() {
  return (
    <main id="main" className="page page-wide">
      <PageHeader title="Episodes" subtitle="Coming soon." />
    </main>
  );
}
