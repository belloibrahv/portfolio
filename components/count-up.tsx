"use client";

import { useEffect, useRef } from "react";

const format = (n: number) => n.toLocaleString("en-US");

/** Renders the final number on the server, then counts up to it once it is seen. */
export function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1100);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = format(Math.round(value * eased)) + (progress === 1 ? suffix : "");
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.12 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = format(value) + suffix;
    };
  }, [value, suffix]);

  return (
    <span ref={ref}>
      {format(value)}
      {suffix}
    </span>
  );
}
