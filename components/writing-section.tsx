import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/writing";

/** The latest writing on the home page. Appears once something is published. */
export function WritingSection() {
  const posts = getPosts().slice(0, 3);
  if (!posts.length) return null;
  return (
    <section id="writing" className="pb-[clamp(56px,8vw,112px)]">
      <div className="wrap">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-indigo">Writing</p>
            <h2 className="section-title">What I am thinking about.</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/writing">All writing</Link>
          </Button>
        </div>
        <div data-reveal className="mt-[clamp(32px,4vw,56px)] grid gap-[clamp(16px,2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
