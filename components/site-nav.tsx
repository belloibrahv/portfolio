import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/writing";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#path", label: "Path" },
  { href: "/#tools", label: "Tools" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface">
      <div className="wrap flex min-h-16 items-center justify-between gap-4 sm:min-h-19">
        <Link href="/" aria-label="IBGlobals Tech, home" className="block w-[158px] py-1.5">
          <Image
            src="/brand/ibglobals-tech-lockup.svg"
            alt="IBGlobals Tech"
            width={460}
            height={128}
            priority
            className="h-auto w-full"
          />
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 sm:gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative hidden py-3 text-[15px] font-medium no-underline after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-indigo after:transition-transform hover:after:scale-x-100 sm:block"
            >
              {link.label}
            </Link>
          ))}
          {getPosts().length > 0 && (
            <Link href="/writing" className="relative py-3 text-[15px] font-medium no-underline after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-indigo after:transition-transform hover:after:scale-x-100">
              Writing
            </Link>
          )}
          <Button asChild>
            <Link href="/#contact">Contact</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
