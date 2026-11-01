"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/writing";

/** Adds a copy button to each code block. The code stays readable without it. */
export function CodeCopy() {
  useEffect(() => {
    const added: HTMLButtonElement[] = [];
    document.querySelectorAll<HTMLPreElement>(".article pre").forEach((pre) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy";
      button.textContent = "Copy";
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(pre.querySelector("code")?.innerText ?? "");
          button.textContent = "Copied";
        } catch {
          button.textContent = "Could not copy";
        }
        setTimeout(() => (button.textContent = "Copy"), 1600);
      });
      pre.parentElement?.insertBefore(button, pre);
      added.push(button);
    });
    return () => added.forEach((button) => button.remove());
  }, []);
  return null;
}

/** The article's sections as beads on a thread. The one being read is filled in. */
export function Contents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label="In this piece" className="sticky top-28">
      <p className="label text-muted">In this piece</p>
      <ol className="contents-thread mt-4">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} aria-current={heading.id === active ? "location" : undefined}>
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CopyLink() {
  const [label, setLabel] = useState("Copy link");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0]);
      setLabel("Copied");
    } catch {
      setLabel("Could not copy");
    }
    setTimeout(() => setLabel("Copy link"), 1600);
  };
  return (
    <button type="button" onClick={copy} aria-live="polite" className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-indigo px-3.5 py-3 text-[15px] leading-5 font-bold text-indigo">
      {label}
    </button>
  );
}
