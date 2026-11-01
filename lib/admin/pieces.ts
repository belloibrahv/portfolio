import matter from "gray-matter";
import type { StoredFile } from "./github";

export type Piece = {
  slug: string;
  sha: string;
  title: string;
  summary: string;
  thread: "workshop" | "market";
  tags: string[];
  date: string;
  updated?: string;
  draft: boolean;
  body: string;
};

// YAML reads an unquoted 2026-11-01 as a Date.
const dateText = (value: unknown) => (value instanceof Date ? value.toISOString().slice(0, 10) : value ? String(value) : undefined);

export function parsePiece({ slug, sha, source }: StoredFile): Piece {
  const { data, content } = matter(source, {});
  return {
    slug,
    sha,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    thread: data.thread === "market" ? "market" : "workshop",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    date: dateText(data.date) ?? new Date().toISOString().slice(0, 10),
    updated: dateText(data.updated),
    draft: data.draft === true,
    body: content.replace(/^\n+/, ""),
  };
}

export function serialisePiece(piece: Omit<Piece, "slug" | "sha">) {
  const { body, updated, ...rest } = piece;
  return matter.stringify(`\n${body.trim()}\n`, updated ? { ...rest, updated } : rest);
}
