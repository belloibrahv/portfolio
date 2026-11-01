import Image from "next/image";
import { profile } from "@/content/resume";

export function SiteFooter() {
  return (
    <>
      <div aria-hidden="true" className="relative mt-[clamp(40px,5vw,64px)] h-24 overflow-hidden">
        <div className="adire adire-indigo" />
      </div>
      <footer className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-6 pb-8 text-sm leading-5 text-muted">
          <div className="flex items-center gap-3.5">
            <Image
              src="/brand/ibglobals-mark-colour.svg"
              alt="IBGlobals mark"
              width={44}
              height={44}
              className="size-11 flex-none"
            />
            <span>{profile.tagline}</span>
          </div>
          <span>© 2026 {profile.name}</span>
        </div>
      </footer>
    </>
  );
}
