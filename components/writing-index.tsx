import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import type { Thread } from "@/lib/adire";
import { formatDate, getPosts, THREADS } from "@/lib/writing";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/writing", label: "All", thread: undefined },
  { href: "/writing/workshop", label: THREADS.workshop.name, thread: "workshop" },
  { href: "/writing/market", label: THREADS.market.name, thread: "market" },
] as const;

/** Two threads weaving across the page, one for each kind of writing. */
function Loom() {
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true" className="loom mt-[clamp(28px,4vw,48px)] h-20 w-full sm:h-28">
      <path pathLength={1} className="loom-thread text-indigo" d="M0 30C200 30 200 90 400 90S600 30 800 30 1000 90 1200 90" />
      <path pathLength={1} className="loom-thread text-terracotta [animation-delay:200ms]" d="M0 90C200 90 200 30 400 30S600 90 800 90 1000 30 1200 30" />
    </svg>
  );
}

export function WritingIndex({ thread }: { thread?: Thread }) {
  const all = getPosts();
  const posts = thread ? all.filter((post) => post.thread === thread) : all;
  const [first, ...rest] = posts;

  return (
    <>
      <SiteNav />
      <main id="top" className="wrap">
        <header className="pt-[clamp(40px,6vw,88px)]">
          <p className={cn("label", thread === "market" ? "text-terracotta" : "text-indigo")}>{thread ? `${THREADS[thread].name} · ${THREADS[thread].short}` : "Writing"}</p>
          <h1 className="mt-5 max-w-[14em] font-display text-[clamp(48px,7.4vw,108px)] leading-[1.02] tracking-[-0.01em]">
            {thread === "workshop" ? "From the workshop." : thread === "market" ? "From the market." : "Notes from the workshop and the market."}
          </h1>
          <p className="mt-6 max-w-[36em] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-muted">
            {thread ? THREADS[thread].about : `Two threads. The workshop is how software gets built. The market is people, work, money and the place I come from.`}
          </p>
          <Loom />
          <nav aria-label="Writing threads" className="mt-[clamp(20px,3vw,32px)] flex flex-wrap items-center gap-2">
            {TABS.map((tab) => (
              <Link key={tab.href} href={tab.href} aria-current={tab.thread === thread ? "page" : undefined} className="thread-tab">
                {tab.label}
              </Link>
            ))}
            <a href="/writing/feed.xml" className="ml-auto py-2 text-sm font-medium text-muted">
              RSS feed
            </a>
          </nav>
        </header>

        {first ? (
          <div className="mt-[clamp(28px,4vw,48px)] space-y-[clamp(16px,2vw,24px)]">
            <PostCard post={first} featured />
            {rest.length > 0 && (
              <div className="grid gap-[clamp(16px,2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
                {rest.slice(0, 6).map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
            {rest.length > 6 && (
              <section aria-labelledby="ledger" className="pt-[clamp(32px,4vw,56px)]">
                <h2 id="ledger" className="font-display text-[clamp(32px,3.4vw,44px)]">
                  Everything else
                </h2>
                <ul className="mt-5">
                  {rest.slice(6).map((post) => (
                    <li key={post.slug} className="flex items-baseline gap-3 py-2.5">
                      <Link href={`/writing/${post.slug}`} className="font-medium no-underline hover:text-indigo">
                        {post.title}
                      </Link>
                      <span className="flex-1 border-b border-dotted border-rule" aria-hidden="true" />
                      <time dateTime={post.date} className="flex-none text-sm text-muted">
                        {formatDate(post.date)}
                      </time>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        ) : (
          <div className="relative mt-[clamp(28px,4vw,48px)] overflow-hidden rounded-lg border border-dashed border-rule bg-raised px-6 py-[clamp(48px,8vw,96px)] text-center">
            <div className="adire adire-indigo" />
            <p className="relative font-display text-[clamp(28px,3vw,40px)] leading-tight">The loom is threaded.</p>
            <p className="relative mx-auto mt-3 max-w-[30em] text-muted">Nothing is published on this thread yet. Follow the RSS feed and the first piece will come to you.</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
