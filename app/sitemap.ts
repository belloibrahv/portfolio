import type { MetadataRoute } from "next";
import { profile } from "@/content/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: profile.site }];
}
