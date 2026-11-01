"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { deletePiece, previewMarkdown, savePiece, type SaveInput } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import type { Piece } from "@/lib/admin/pieces";
import { cn } from "@/lib/utils";

type Fields = { title: string; summary: string; thread: Piece["thread"]; tags: string; body: string };
type Notice = { kind: "ok" | "error"; text: string; link?: string };

const toSlug = (title: string) => title.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80).replace(/-$/, "");

const TOOLS: { label: string; title: string; before: string; after: string; line?: boolean }[] = [
  { label: "H", title: "Heading", before: "## ", after: "", line: true },
  { label: "B", title: "Bold", before: "**", after: "**" },
  { label: "I", title: "Italic", before: "*", after: "*" },
  { label: "Link", title: "Link", before: "[", after: "](https://)" },
  { label: "List", title: "Bulleted list", before: "- ", after: "", line: true },
  { label: "Quote", title: "Quote", before: "> ", after: "", line: true },
  { label: "Code", title: "Code block", before: "```ts\n", after: "\n```", line: true },
];

function readBackup(key: string): Fields | null {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as Fields) : null;
  } catch {
    return null;
  }
}
function writeBackup(key: string, fields: Fields | null) {
  try {
    if (fields) localStorage.setItem(key, JSON.stringify(fields));
    else localStorage.removeItem(key);
  } catch {
    // The backup is a convenience. Saving doesn't depend on it.
  }
}

export function Editor({ piece }: { piece?: Piece }) {
  const router = useRouter();
  const [fields, setFields] = useState<Fields>({
    title: piece?.title ?? "",
    summary: piece?.summary ?? "",
    thread: piece?.thread ?? "workshop",
    tags: piece?.tags.join(", ") ?? "",
    body: piece?.body ?? "",
  });
  const [saved, setSaved] = useState(fields);
  const [sha, setSha] = useState(piece?.sha);
  const [slug, setSlug] = useState(piece?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(false);
  const [draft, setDraft] = useState(piece?.draft ?? true);
  const [busy, setBusy] = useState<SaveInput["intent"] | "delete" | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<"unpublish" | "delete" | null>(null);
  const [backup, setBackup] = useState<Fields | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const backupKey = `writing-backup:${piece?.slug ?? "new"}`;
  const dirty = JSON.stringify(fields) !== JSON.stringify(saved);
  const words = fields.body.trim() ? fields.body.trim().split(/\s+/).length : 0;
  const url = slug || toSlug(fields.title);

  // Offer back anything left unsaved from an earlier visit.
  useEffect(() => {
    const found = readBackup(backupKey);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage only exists after hydration
    if (found && JSON.stringify(found) !== JSON.stringify(saved)) setBackup(found);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backupKey]);

  useEffect(() => {
    if (!dirty) return;
    const timer = setTimeout(() => writeBackup(backupKey, fields), 800);
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", warn);
    };
  }, [backupKey, dirty, fields]);

  useEffect(() => () => clearInterval(pollRef.current), []);

  const update = (patch: Partial<Fields>) => {
    setFields((current) => ({ ...current, ...patch }));
    setNotice(null);
  };

  const watchUntilLive = (live: string) => {
    let tries = 0;
    clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      tries += 1;
      const response = await fetch(live, { method: "HEAD", cache: "no-store" }).catch(() => null);
      if (response?.ok) {
        clearInterval(pollRef.current);
        setNotice({ kind: "ok", text: "It's live, and on your writing page.", link: live });
      } else if (tries >= 30) {
        clearInterval(pollRef.current);
        setNotice({ kind: "error", text: "Saved, but it isn't live after 5 minutes. Check the deployment on Vercel." });
      }
    }, 10_000);
  };

  const save = useCallback(
    async (intent: SaveInput["intent"]) => {
      setBusy(intent);
      setNotice(null);
      setConfirming(null);
      const result = await savePiece({ ...fields, slug: url, sha, intent });
      setBusy(null);
      if (!result.ok) {
        setNotice({ kind: "error", text: result.error });
        return;
      }
      const live = `/writing/${result.slug}`;
      if (!sha) {
        writeBackup(backupKey, null);
        window.history.replaceState(null, "", `/admin/edit/${result.slug}`);
      }
      writeBackup(`writing-backup:${result.slug}`, null);
      setBackup(null);
      setSha(result.sha);
      setSlug(result.slug);
      setDraft(result.draft);
      setSaved(fields);
      if (result.firstPublish) {
        setNotice({ kind: "ok", text: "Published. It will be live in about a minute. This message updates when it is." });
        watchUntilLive(live);
      } else if (intent === "unpublish") {
        setNotice({ kind: "ok", text: "Moved back to drafts. It leaves the site in about a minute." });
      } else if (result.draft) {
        setNotice({ kind: "ok", text: "Draft saved. It isn't on your site." });
      } else {
        setNotice({ kind: "ok", text: "Saved. Your changes will be live in about a minute.", link: live });
      }
    },
    [backupKey, fields, sha, url],
  );

  // Cmd or Ctrl + S saves without publishing.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        if (!busy) void save("save");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, save]);

  const applyTool = (tool: (typeof TOOLS)[number]) => {
    const area = bodyRef.current;
    if (!area) return;
    const { selectionStart: start, selectionEnd: end, value } = area;
    const needsBreak = tool.line && start > 0 && value[start - 1] !== "\n";
    const before = `${needsBreak ? "\n" : ""}${tool.before}`;
    const selected = value.slice(start, end);
    update({ body: `${value.slice(0, start)}${before}${selected}${tool.after}${value.slice(end)}` });
    requestAnimationFrame(() => {
      area.focus();
      area.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const showPreview = async () => {
    setPreview("");
    const html = await previewMarkdown(fields.body).catch(() => undefined);
    if (html === undefined) {
      setPreview(null);
      setNotice({ kind: "error", text: "Couldn't load the preview. Your text is still here, so try again." });
    } else if (html === null) {
      setPreview(null);
      setNotice({ kind: "error", text: "You've been signed out. Copy your text, then sign in again." });
    } else setPreview(html);
  };

  const remove = async () => {
    if (!sha) return;
    setBusy("delete");
    const error = await deletePiece(slug, sha);
    setBusy(null);
    setConfirming(null);
    if (error) {
      setNotice({ kind: "error", text: error });
      return;
    }
    writeBackup(backupKey, null);
    setSaved(fields);
    router.push("/admin");
  };

  return (
    <main data-thread={fields.thread} className="wrap max-w-[60rem] pt-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin" className="py-2 text-sm font-medium text-muted no-underline hover:text-ink">
          ← Your writing
        </Link>
        <span className={cn("rounded-md border px-2.5 py-1 text-xs font-bold", draft ? "border-terracotta text-terracotta" : "border-palm text-palm")}>{draft ? "Draft" : "Published"}</span>
      </div>

      {backup && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-md border border-gold bg-raised p-3 text-sm">
          <span>You have unsaved changes from an earlier visit.</span>
          <span className="flex gap-4 font-medium">
            <button className="cursor-pointer text-indigo" onClick={() => { setFields(backup); setBackup(null); }}>Restore them</button>
            <button className="cursor-pointer text-muted" onClick={() => { writeBackup(backupKey, null); setBackup(null); }}>Discard</button>
          </span>
        </div>
      )}

      <label className="sr-only" htmlFor="title">Title</label>
      <textarea
        id="title"
        rows={1}
        value={fields.title}
        onChange={(event) => update({ title: event.target.value.replace(/\n/g, " ") })}
        onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); bodyRef.current?.focus(); } }}
        placeholder="Title"
        maxLength={160}
        className="mt-4 w-full resize-none bg-transparent font-display text-[clamp(38px,5.4vw,68px)] leading-[1.08] outline-none [field-sizing:content] placeholder:text-rule"
      />

      <div className="mt-2 flex flex-wrap items-center gap-1 text-sm text-muted">
        <label htmlFor="slug">belloibrahim.vercel.app/writing/</label>
        {sha ? (
          <span className="font-medium text-ink">{slug}</span>
        ) : (
          <input
            id="slug"
            value={slugEdited ? slug : toSlug(fields.title)}
            onChange={(event) => { setSlugEdited(true); setSlug(event.target.value.toLowerCase()); }}
            placeholder="your-url"
            className="min-w-[10em] flex-1 border-b border-dashed border-rule bg-transparent py-1 font-medium text-ink outline-none focus:border-indigo"
          />
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[auto_1fr]">
        <fieldset>
          <legend className="font-medium">Kind</legend>
          <div className="mt-2 flex gap-2">
            {(["workshop", "market"] as const).map((thread) => (
              <button key={thread} type="button" aria-pressed={fields.thread === thread} onClick={() => update({ thread })} className={cn("thread-tab cursor-pointer", fields.thread === thread && "border-indigo bg-indigo text-raised")}>
                {thread === "workshop" ? "Technical" : "Non-technical"}
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="tags" className="font-medium">Tags <span className="font-normal text-muted">(optional, separated by commas)</span></label>
          <input id="tags" value={fields.tags} onChange={(event) => update({ tags: event.target.value })} className="field mt-2" />
        </div>
      </div>

      <label htmlFor="summary" className="mt-5 block font-medium">Summary <span className="font-normal text-muted">(shown on the writing page and when the link is shared)</span></label>
      <textarea id="summary" rows={2} value={fields.summary} onChange={(event) => update({ summary: event.target.value })} className="field mt-2 resize-y" />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-b border-line">
        <div role="tablist" aria-label="Editor view" className="flex">
          {[{ label: "Write", active: preview === null, go: () => setPreview(null) }, { label: "Preview", active: preview !== null, go: showPreview }].map((tab) => (
            <button key={tab.label} role="tab" aria-selected={tab.active} onClick={tab.go} className={cn("min-h-11 cursor-pointer border-b-2 px-4 font-medium", tab.active ? "border-indigo text-indigo" : "border-transparent text-muted")}>
              {tab.label}
            </button>
          ))}
        </div>
        {preview === null && (
          <div className="flex flex-wrap">
            {TOOLS.map((tool) => (
              <button key={tool.title} type="button" title={tool.title} aria-label={tool.title} onClick={() => applyTool(tool)} className="min-h-11 min-w-10 cursor-pointer rounded px-2 text-sm font-bold text-muted hover:bg-raised hover:text-indigo">
                {tool.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {preview === null ? (
        <textarea
          ref={bodyRef}
          aria-label="Your writing"
          value={fields.body}
          onChange={(event) => update({ body: event.target.value })}
          placeholder="Start writing…"
          className="field mt-3 min-h-[50vh] resize-y !text-[17px] !leading-[1.7]"
        />
      ) : preview === "" ? (
        <p className="mt-6 min-h-[50vh] text-muted">Getting the preview ready…</p>
      ) : (
        <div className="article mt-6 min-h-[50vh]" dangerouslySetInnerHTML={{ __html: preview }} />
      )}

      <div className="sticky bottom-0 z-10 -mx-1 mt-4 border-t border-line bg-surface px-1 py-3">
        {notice && (
          <p role={notice.kind === "error" ? "alert" : "status"} className={cn("mb-3 text-sm font-medium", notice.kind === "error" ? "text-terracotta" : "text-palm")}>
            {notice.text}{" "}
            {notice.link && <a href={notice.link} target="_blank" rel="noreferrer" className="underline">View it</a>}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => save(draft ? "publish" : "save")} disabled={!!busy || (!draft && !dirty)} className="flex-[1_1_130px] sm:flex-none">
            {busy === "publish" ? "Publishing…" : busy === "save" && !draft ? "Saving…" : draft ? "Publish" : "Update"}
          </Button>
          {draft && (
            <Button variant="outline" onClick={() => save("save")} disabled={!!busy || (!!sha && !dirty)} className="flex-[1_1_130px] sm:flex-none">
              {busy === "save" ? "Saving…" : "Save draft"}
            </Button>
          )}
          <span className="px-2 text-sm text-muted">{words} {words === 1 ? "word" : "words"}{dirty ? " · unsaved" : ""}</span>
          {sha && (
            <span className="ml-auto flex items-center gap-1 text-sm font-medium">
              {confirming ? (
                <>
                  <span className="text-muted">{confirming === "delete" ? "Delete this piece?" : "Take it off the site?"}</span>
                  <button disabled={!!busy} onClick={() => (confirming === "delete" ? remove() : save("unpublish"))} className="min-h-11 cursor-pointer px-2 text-terracotta">Yes</button>
                  <button onClick={() => setConfirming(null)} className="min-h-11 cursor-pointer px-2 text-muted">No</button>
                </>
              ) : (
                <>
                  {!draft && <button onClick={() => setConfirming("unpublish")} className="min-h-11 cursor-pointer px-2 text-muted hover:text-ink">Unpublish</button>}
                  <button onClick={() => setConfirming("delete")} className="min-h-11 cursor-pointer px-2 text-terracotta">Delete</button>
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
