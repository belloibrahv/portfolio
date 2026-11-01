import { notFound, redirect } from "next/navigation";
import { Editor } from "@/components/admin/editor";
import { readFile } from "@/lib/admin/github";
import { parsePiece } from "@/lib/admin/pieces";
import { isSignedIn } from "@/lib/admin/session";
import { SLUG_PATTERN } from "@/lib/writing";

export default async function EditPiecePage({ params }: PageProps<"/admin/edit/[slug]">) {
  if (!(await isSignedIn())) redirect("/admin");
  const { slug } = await params;
  if (!SLUG_PATTERN.test(slug)) notFound();
  const file = await readFile(slug);
  if (!file) notFound();
  return <Editor piece={parsePiece(file)} />;
}
