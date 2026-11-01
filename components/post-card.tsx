import Link from "next/link";
import { Cloth } from "@/components/cloth";
import { formatDate, THREADS, type Post } from "@/lib/writing";
import { cn } from "@/lib/utils";

export function PostMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <p className={cn("text-sm leading-5 text-muted", className)}>
      <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min read
      {post.draft && <span className="ml-2 rounded-sm border border-terracotta px-1.5 py-0.5 text-xs font-bold text-terracotta">Draft</span>}
    </p>
  );
}

export function ThreadLabel({ post }: { post: Post }) {
  return (
    <p className={cn("label", post.thread === "market" ? "text-terracotta" : "text-indigo")}>
      {THREADS[post.thread].name} · {THREADS[post.thread].short}
    </p>
  );
}

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className={cn("swatch group relative overflow-hidden rounded-lg border border-line bg-raised", featured && "lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]")}>
      <Cloth slug={post.slug} thread={post.thread} className={featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[420px]" : "aspect-[16/10]"} />
      <div className={cn("flex flex-col gap-3 p-5", featured && "justify-center lg:p-[clamp(28px,4vw,56px)]")}>
        <ThreadLabel post={post} />
        <h3 className={cn("font-display", featured ? "text-[clamp(32px,3.6vw,52px)] leading-[1.1]" : "text-[clamp(26px,2.2vw,30px)] leading-[1.15]")}>
          <Link href={`/writing/${post.slug}`} className="no-underline after:absolute after:inset-0 hover:text-indigo">
            {post.title}
          </Link>
        </h3>
        <p className={cn("text-muted", featured && "text-lg leading-7")}>{post.summary}</p>
        <PostMeta post={post} className="mt-auto pt-2" />
      </div>
    </article>
  );
}
