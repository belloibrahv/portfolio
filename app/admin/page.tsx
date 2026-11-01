import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";
import { Button } from "@/components/ui/button";
import { readAllFiles } from "@/lib/admin/github";
import { parsePiece, type Piece } from "@/lib/admin/pieces";
import { isSignedIn, missingSettings } from "@/lib/admin/session";

function Row({ piece }: { piece: Piece }) {
  return (
    <li className="border-b border-dashed border-rule last:border-b-0">
      <Link href={`/admin/edit/${piece.slug}`} className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 no-underline">
        <span className="min-w-0 flex-[1_1_16em]">
          <span className="block font-display text-[clamp(22px,2vw,28px)] leading-tight group-hover:text-indigo">{piece.title}</span>
          <span className="mt-1 block text-sm text-muted">{piece.thread === "workshop" ? "Technical" : "Non-technical"} · /writing/{piece.slug}</span>
        </span>
        <span className="text-sm font-medium text-indigo">Edit</span>
      </Link>
    </li>
  );
}

function Group({ title, pieces, empty }: { title: string; pieces: Piece[]; empty: string }) {
  return (
    <section className="rounded-lg border border-line bg-raised px-[clamp(16px,3vw,32px)] py-6">
      <h2 className="label text-indigo">
        {title} · {pieces.length}
      </h2>
      {pieces.length ? <ul className="mt-2">{pieces.map((piece) => <Row key={piece.slug} piece={piece} />)}</ul> : <p className="mt-4 text-muted">{empty}</p>}
    </section>
  );
}

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const missing = missingSettings();
  if (missing.length) {
    return (
      <main className="wrap max-w-[44rem] py-[clamp(40px,6vw,88px)]">
        <h1 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.05]">Almost ready.</h1>
        <p className="mt-4 text-muted">Add these in Vercel under Settings, Environment Variables, then redeploy:</p>
        <ul className="mt-4 list-disc pl-5">{missing.map((name) => <li key={name}>{name}</li>)}</ul>
      </main>
    );
  }
  if (!(await isSignedIn())) {
    return (
      <main className="wrap flex justify-center py-[clamp(48px,10vw,120px)]">
        <LoginForm />
      </main>
    );
  }

  let pieces: Piece[] | null = null;
  try {
    pieces = (await readAllFiles()).map(parsePiece).sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    // Shown below.
  }

  return (
    <main className="wrap max-w-[60rem] py-[clamp(32px,5vw,64px)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.05]">Your writing</h1>
        <Button asChild>
          <Link href="/admin/new">New piece</Link>
        </Button>
      </div>
      {pieces ? (
        <div className="mt-8 space-y-5">
          <Group title="Drafts" pieces={pieces.filter((piece) => piece.draft)} empty="No drafts." />
          <Group title="Published" pieces={pieces.filter((piece) => !piece.draft)} empty="Nothing published yet. Your first piece will appear here." />
        </div>
      ) : (
        <p role="alert" className="mt-8 rounded-md border border-terracotta p-4 text-terracotta">
          Couldn&apos;t load your writing from GitHub. Check that GITHUB_TOKEN is valid and can access this repository.
        </p>
      )}
    </main>
  );
}
