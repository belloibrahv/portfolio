"use client";

import { Fragment, useState } from "react";
import { strengths } from "@/content/resume";

function Set() {
  // Doubled so each half is wider than any screen and the loop has no gap.
  return (
    <div className="flex flex-none items-center font-display text-[clamp(28px,3.4vw,48px)] leading-[1.1] whitespace-nowrap">
      {[...strengths, ...strengths].map((item, i) => (
        <Fragment key={i}>
          <span>{item}</span>
          <i className={i % 4 === 3 ? "marquee-sep bg-terracotta" : "marquee-sep"} />
        </Fragment>
      ))}
    </div>
  );
}

export function Marquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label={`Strongest in ${strengths.join(", ")}`}
      data-paused={paused}
      className="marquee relative overflow-hidden border-b border-line py-[clamp(24px,3vw,40px)]"
    >
      <div className="marquee-track" aria-hidden="true">
        <Set />
        <Set />
      </div>
      <button
        type="button"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Play the scrolling text" : "Pause the scrolling text"}
        className="marquee-toggle absolute top-1/2 right-[clamp(16px,4vw,56px)] flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-raised text-indigo"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4">
          {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />}
        </svg>
      </button>
    </section>
  );
}
