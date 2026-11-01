"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { GitHubError, readFile, removeFile, writeFile } from "@/lib/admin/github";
import { parsePiece, serialisePiece } from "@/lib/admin/pieces";
import { endSession, isSignedIn, passwordMatches, startSession } from "@/lib/admin/session";
import { renderMarkdown, RESERVED_SLUGS, SLUG_PATTERN } from "@/lib/writing";

// Slows guessing. Each server instance keeps its own count, so a long password remains the real protection.
const failures = new Map<string, { count: number; until: number }>();
const MAX_FAILURES = 5;
const LOCK_MS = 15 * 60 * 1000;

export async function signIn(_: string | null, form: FormData): Promise<string | null> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const record = failures.get(ip);
  if (record && record.count >= MAX_FAILURES && record.until > Date.now()) return "Too many attempts. Try again in 15 minutes.";

  if (!passwordMatches(String(form.get("password") ?? ""))) {
    const count = record && record.until > Date.now() ? record.count + 1 : 1;
    failures.set(ip, { count, until: Date.now() + LOCK_MS });
    await new Promise((resolve) => setTimeout(resolve, 500));
    return "That password isn't right.";
  }
  failures.delete(ip);
  await startSession();
  redirect("/admin");
}

export async function signOut() {
  await endSession();
  redirect("/admin");
}

export type SaveInput = {
  slug: string;
  sha?: string;
  title: string;
  summary: string;
  thread: "workshop" | "market";
  tags: string;
  body: string;
  intent: "save" | "publish" | "unpublish";
};

export type SaveResult =
  | { ok: true; slug: string; sha: string; draft: boolean; firstPublish: boolean }
  | { ok: false; error: string };

function explain(error: unknown, creating: boolean) {
  if (error instanceof GitHubError) {
    if (error.status === 401 || error.status === 403) return "GitHub refused the save. Check that GITHUB_TOKEN is valid and can write to this repository's contents.";
    if (error.status === 409 || (error.status === 422 && !creating)) return "This piece changed somewhere else. Copy your text, reload the page and try again.";
    if (error.status === 422) return "A piece already uses that URL. Choose a different one.";
    return `GitHub couldn't save this (error ${error.status}). Your text is still here, so try again.`;
  }
  return "Couldn't reach GitHub. Your text is still here, so try again.";
}

export async function savePiece(input: SaveInput): Promise<SaveResult> {
  if (!(await isSignedIn())) return { ok: false, error: "You've been signed out. Copy your text, then sign in again." };

  const title = input.title.replace(/\s+/g, " ").trim();
  const summary = input.summary.replace(/\s+/g, " ").trim();
  const body = input.body.trim();
  const { slug, sha, intent } = input;
  const creating = !sha;

  if (!title) return { ok: false, error: "Give the piece a title." };
  if (!SLUG_PATTERN.test(slug) || RESERVED_SLUGS.has(slug)) return { ok: false, error: "The URL can only use lowercase words joined by single hyphens, and can't be workshop or market." };
  if (input.thread !== "workshop" && input.thread !== "market") return { ok: false, error: "Choose technical or non-technical." };

  try {
    const existing = sha ? await readFile(slug) : null;
    if (sha && !existing) return { ok: false, error: "This piece no longer exists. Copy your text and start a new piece." };
    const previous = existing ? parsePiece(existing) : null;
    const wasDraft = previous ? previous.draft : true;
    const draft = intent === "publish" ? false : intent === "unpublish" ? true : wasDraft;

    if (!draft && !summary) return { ok: false, error: "Add a summary before publishing. It appears on the writing page and when the link is shared." };
    if (!draft && !body) return { ok: false, error: "Write something before publishing." };

    const today = new Date().toISOString().slice(0, 10);
    const firstPublish = wasDraft && !draft;
    const newSha = await writeFile(
      slug,
      serialisePiece({
        title,
        summary,
        thread: input.thread,
        tags: input.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        // A piece is dated the day it goes out, and marked updated if it changes after that.
        date: firstPublish || !previous ? today : previous.date,
        updated: !firstPublish && !wasDraft && !draft ? today : firstPublish ? undefined : previous?.updated,
        draft,
        body,
      }),
      sha,
      `${firstPublish ? "Publish" : intent === "unpublish" ? "Unpublish" : "Update"} writing: ${title}`,
    );
    return { ok: true, slug, sha: newSha, draft, firstPublish };
  } catch (error) {
    return { ok: false, error: explain(error, creating) };
  }
}

export async function deletePiece(slug: string, sha: string): Promise<string | null> {
  if (!(await isSignedIn())) return "You've been signed out. Sign in again.";
  try {
    await removeFile(slug, sha, `Delete writing: ${slug}`);
  } catch (error) {
    return explain(error, false);
  }
  return null;
}

export async function previewMarkdown(body: string): Promise<string | null> {
  if (!(await isSignedIn())) return null;
  return (await renderMarkdown(body)).html;
}
