import type { Metadata } from "next";
import { WritingIndex } from "@/components/writing-index";
import { THREADS } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Workshop, writing by Bello Sheu Ibrahim",
  description: THREADS.workshop.about,
  alternates: { canonical: "/writing/workshop", types: { "application/rss+xml": "/writing/feed.xml" } },
};

export default function WorkshopPage() {
  return <WritingIndex thread="workshop" />;
}
