import { clothSvg, type Thread } from "@/lib/adire";
import { cn } from "@/lib/utils";

/** The article's own adire cloth. Decoration, so it stays out of the reading order. */
export function Cloth({ slug, thread, className }: { slug: string; thread: Thread; className?: string }) {
  return <div className={cn("cloth", className)} dangerouslySetInnerHTML={{ __html: clothSvg(slug, thread) }} />;
}
