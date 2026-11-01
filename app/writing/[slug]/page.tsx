import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeCopy, Contents, CopyLink } from "@/components/article-tools";
import { Cloth } from "@/components/cloth";
import { PostCard, PostMeta, ThreadLabel } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/resume";
import { getPost, getPosts, renderPost } from "@/lib/writing";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `/writing/${post.slug}`;
  return {
    title: `${post.title}, ${profile.name}`,
    description: post.summary,
    keywords: post.tags,
    authors: [{ name: profile.name, url: profile.site }],
    alternates: { canonical: url, types: { "application/rss+xml": "/writing/feed.xml" } },
    openGraph: { title: post.title, description: post.summary, url, type: "article", publishedTime: post.date, modifiedTime: post.updated, authors: [profile.name], tags: post.tags },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary },
    robots: post.draft ? { index: false } : undefined,
  };
}

export default async function ArticlePage({ params }: PageProps<"/writing/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { html, headings } = await renderPost(post);
  const others = getPosts().filter((other) => other.slug !== post.slug);
  const next = [...others.filter((other) => other.thread === post.thread), ...others.filter((other) => other.thread !== post.thread)].slice(0, 2);
  const url = `${profile.site}/writing/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url,
    author: { "@type": "Person", name: profile.name, url: profile.site },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="reading-thread" aria-hidden="true" />
      <SiteNav />
      <main id="top" data-thread={post.thread}>
        <header className="wrap grid items-end gap-[clamp(24px,4vw,56px)] pt-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div>
            <Link href="/writing" className="mb-6 inline-block py-1 text-sm font-medium text-muted">
              ← All writing
            </Link>
            <ThreadLabel post={post} />
            <h1 className="mt-5 font-display text-[clamp(42px,6vw,84px)] leading-[1.04] tracking-[-0.01em]">{post.title}</h1>
            <p className="mt-5 max-w-[34em] text-[clamp(18px,1.6vw,21px)] leading-[1.5] text-muted">{post.summary}</p>
            <PostMeta post={post} className="mt-5" />
          </div>
          <Cloth slug={post.slug} thread={post.thread} className="aspect-[16/10] overflow-hidden rounded-lg lg:aspect-square" />
        </header>

        <div className="wrap mt-[clamp(32px,5vw,64px)] grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="article min-w-0 max-w-[42rem] lg:ml-auto lg:w-full" dangerouslySetInnerHTML={{ __html: html }} />
          {headings.length >= 2 && (
            <aside className="hidden lg:block">
              <Contents headings={headings} />
            </aside>
          )}
        </div>
        <CodeCopy />

        <footer className="wrap mt-[clamp(40px,6vw,72px)]">
          <div className="mx-auto max-w-[42rem] lg:mr-[calc(240px+3rem)] lg:ml-auto">
            <div className="tied-off" aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-4 pt-8">
              <Image src="/images/ibrahim-at-work.jpg" alt="" width={72} height={72} className="size-[72px] rounded-full object-cover" />
              <div className="min-w-[14em] flex-1">
                <p className="font-bold">{profile.name}</p>
                <p className="text-sm leading-5 text-muted">{profile.title}, in {profile.location}.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href={`mailto:${profile.email}?subject=${encodeURIComponent(`On "${post.title}"`)}`}>Reply by email</a>
              </Button>
              <CopyLink />
            </div>
          </div>
          {next.length > 0 && (
            <section aria-labelledby="keep-reading" className="pt-[clamp(48px,6vw,80px)]">
              <h2 id="keep-reading" className="font-display text-[clamp(32px,3.4vw,44px)]">
                Keep reading
              </h2>
              <div className="mt-6 grid gap-[clamp(16px,2vw,24px)] sm:grid-cols-2">
                {next.map((other) => (
                  <PostCard key={other.slug} post={other} />
                ))}
              </div>
            </section>
          )}
        </footer>
      </main>
      <SiteFooter />
    </>
  );
}
