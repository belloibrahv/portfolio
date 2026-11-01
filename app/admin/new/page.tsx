import { redirect } from "next/navigation";
import { Editor } from "@/components/admin/editor";
import { isSignedIn } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export default async function NewPiecePage() {
  if (!(await isSignedIn())) redirect("/admin");
  return <Editor />;
}
