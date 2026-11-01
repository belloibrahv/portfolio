import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { toString } from "hast-util-to-string";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Thread } from "./adire";

/**
 * Writing lives in content/writing/<slug>.md. The file name is the URL. A piece with
 * `draft: true` shows only in development and on Vercel preview deployments.
 */

export const THREADS: Record<Thread, { name: string; short: string; about: string }> = {
  workshop: { name: "Workshop", short: "Technical", about: "How software gets built, tested and kept running." },
  market: { name: "Market", short: "Non-technical", about: "People, work, money and the place I come from." },
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  updated?: string;
  thread: Thread;
  tags: string[];
  draft: boolean;
  minutes: number;
  body: string;
};

const DIR = path.join(process.cwd(), "content", "writing");
export const RESERVED_SLUGS = new Set(["workshop", "market", "feed.xml"]);
export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const showDrafts = process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview" || process.env.PREVIEW_DRAFTS === "1";

const isoDate = (value: unknown, file: string, field: string) => {
  // YAML reads an unquoted 2026-11-01 as a Date.
  const text = value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || Number.isNaN(Date.parse(text))) throw new Error(`${file}: ${field} must look like 2026-11-01`);
  return text;
};

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  if (!SLUG_PATTERN.test(slug)) throw new Error(`${file}: use lowercase words and single hyphens in the file name`);
  if (RESERVED_SLUGS.has(slug)) throw new Error(`${file}: "${slug}" is already a page on the site, choose another name`);
  const { data, content } = matter(readFileSync(path.join(DIR, file), "utf8"));
  // A draft may be unfinished, so a missing summary only blocks publishing.
  const required = data.draft === true ? ["title", "date", "thread"] : ["title", "summary", "date", "thread"];
  for (const field of required) if (!data[field]) throw new Error(`${file}: add "${field}" to the front matter`);
  if (!(data.thread in THREADS)) throw new Error(`${file}: thread must be workshop or market`);
  return {
    slug,
    title: String(data.title),
    summary: String(data.summary),
    date: isoDate(data.date, file, "date"),
    updated: data.updated ? isoDate(data.updated, file, "updated") : undefined,
    thread: data.thread,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    minutes: Math.max(1, Math.round(content.trim().split(/\s+/).length / 220)),
    body: content,
  };
}

/** Published pieces, newest first. */
export const getPosts = cache((): Post[] =>
  readdirSync(DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date)),
);

export const getPost = (slug: string) => getPosts().find((post) => post.slug === slug);

export type Heading = { id: string; text: string };

export async function renderMarkdown(body: string): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(() => (tree) => {
      visit(tree, "element", (node: Parameters<typeof toString>[0] & { tagName?: string; properties?: { id?: unknown } }) => {
        if (node.tagName === "h2") headings.push({ id: String(node.properties?.id), text: toString(node) });
      });
    })
    .use(rehypePrettyCode, { theme: "vitesse-dark", keepBackground: false })
    .use(rehypeStringify)
    .process(body);
  return { html: String(file), headings };
}

export const renderPost = cache((post: Post) => renderMarkdown(post.body));

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const formatDate = (date: string) => longDate.format(new Date(date));
