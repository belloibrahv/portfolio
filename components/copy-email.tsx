"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy email");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    let next = "Copied. Speak soon.";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = "Could not copy";
    }
    setLabel(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLabel("Copy email"), 1800);
  };

  return (
    <Button
      type="button"
      variant="paper"
      onClick={copy}
      aria-live="polite"
      className="flex-[1_1_140px] sm:flex-none"
    >
      {label}
    </Button>
  );
}
