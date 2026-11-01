import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isSignedIn } from "@/lib/admin/session";
import { signOut } from "./actions";

// Never prerender: the answer depends on the session and on settings read at request time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const signedIn = await isSignedIn();
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-surface">
        <div className="wrap flex min-h-16 items-center justify-between gap-4">
          <Link href="/admin" aria-label="Writing admin" className="block w-[104px] flex-none py-1.5 sm:w-[132px]">
            <Image src="/brand/ibglobals-tech-lockup.svg" alt="IBGlobals Tech" width={460} height={128} priority className="h-auto w-full" />
          </Link>
          <nav aria-label="Admin" className="flex items-center gap-1 text-[15px] font-medium whitespace-nowrap">
            <Link href="/writing" className="px-2 py-3 no-underline hover:text-indigo sm:px-3">
              Writing page
            </Link>
            {signedIn && (
              <form action={signOut}>
                <button className="cursor-pointer px-2 py-3 font-medium hover:text-indigo sm:px-3">Sign out</button>
              </form>
            )}
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}
