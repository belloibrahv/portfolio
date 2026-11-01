"use client";

import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [error, action, pending] = useActionState(signIn, null);
  return (
    <form action={action} className="w-full max-w-[26rem] rounded-lg border border-line bg-raised p-[clamp(20px,4vw,32px)]">
      <h1 className="font-display text-[40px] leading-[1.05]">Sign in to write</h1>
      <label htmlFor="password" className="mt-6 block font-medium">
        Password
      </label>
      <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" className="field mt-2" />
      {error && (
        <p role="alert" className="mt-3 text-sm text-terracotta">
          {error}
        </p>
      )}
      <Button type="submit" disabled={pending} className="mt-5 w-full">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
