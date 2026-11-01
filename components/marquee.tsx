import { Fragment } from "react";
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
  return (
    <section
      aria-label={`Strongest in ${strengths.join(", ")}`}
      className="marquee overflow-hidden border-b border-line py-[clamp(24px,3vw,40px)]"
    >
      <div className="marquee-track" aria-hidden="true">
        <Set />
        <Set />
      </div>
    </section>
  );
}
