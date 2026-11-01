import type { Metadata } from "next";
import { WritingIndex } from "@/components/writing-index";

const description = "Technical and non-technical writing by Bello Sheu Ibrahim, from the workshop and the market.";

export const metadata: Metadata = {
  title: "Writing, Bello Sheu Ibrahim",
  description,
  alternates: { canonical: "/writing", types: { "application/rss+xml": "/writing/feed.xml" } },
  openGraph: { title: "Writing, Bello Sheu Ibrahim", description, url: "/writing" },
};

export default function WritingPage() {
  return <WritingIndex />;
}
