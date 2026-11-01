import { clothSvg } from "@/lib/adire";
import { SHARE_SIZE, shareImage } from "@/lib/share-image";
import { getPost, getPosts, THREADS } from "@/lib/writing";

export const size = SHARE_SIZE;
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)!;
  return shareImage({
    kicker: `${THREADS[post.thread].name} · ${THREADS[post.thread].short}`,
    title: post.title,
    cloth: clothSvg(post.slug, post.thread),
    accent: post.thread === "market" ? "#A9461F" : "#1F3266",
  });
}
