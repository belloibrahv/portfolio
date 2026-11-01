import type { MetadataRoute } from "next";
import { profile } from "@/content/resume";
import { getPosts } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts().filter((post) => !post.draft);
  return [
    { url: profile.site },
    { url: `${profile.site}/writing` },
    { url: `${profile.site}/writing/workshop` },
    { url: `${profile.site}/writing/market` },
    ...posts.map((post) => ({ url: `${profile.site}/writing/${post.slug}`, lastModified: post.updated ?? post.date })),
  ];
}
