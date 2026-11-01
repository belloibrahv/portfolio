import Image from "next/image";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#work", label: "Work" },
  { href: "#path", label: "Path" },
  { href: "#tools", label: "Tools" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface">
      <div className="wrap flex min-h-16 items-center justify-between gap-4 sm:min-h-19">
        <a href="#top" aria-label="IBGlobals Tech, back to top" className="block w-[158px] py-1.5">
          <Image
            src="/brand/ibglobals-tech-lockup.svg"
            alt="IBGlobals Tech"
            width={460}
            height={128}
            priority
            className="h-auto w-full"
          />
        </a>
        <nav aria-label="Main" className="flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative hidden py-3 text-[15px] font-medium no-underline after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-indigo after:transition-transform hover:after:scale-x-100 sm:block"
            >
              {link.label}
            </a>
          ))}
          <Button asChild>
            <a href="#contact">Contact</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
