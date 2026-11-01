import type { Metadata } from "next";
import { WritingIndex } from "@/components/writing-index";
import { THREADS } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Market, writing by Bello Sheu Ibrahim",
  description: THREADS.market.about,
  alternates: { canonical: "/writing/market", types: { "application/rss+xml": "/writing/feed.xml" } },
};

export default function MarketPage() {
  return <WritingIndex thread="market" />;
}
