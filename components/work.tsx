"use client";

import { useRef, useState } from "react";
import { receipts, type Receipt } from "@/content/resume";
import { cn } from "@/lib/utils";

export function Work() {
  const [picked, setPicked] = useState(receipts[0].id);
  const counter = useRef<HTMLDivElement>(null);
  const active = receipts.find((r) => r.id === picked) ?? receipts[0];

  const pick = (id: string) => {
    setPicked(id);
    // Keep the top of the receipt in view: it sits below the list on a phone,
    // and can be under the sticky nav on a short laptop screen.
    const el = counter.current;
    if (!el) return;
    const { top } = el.getBoundingClientRect();
    if (top > window.innerHeight * 0.6 || top < 76) {
      el.scrollIntoView({ block: "start" });
    }
  };

  return (
    <section id="work" className="py-[clamp(56px,8vw,112px)]">
      <div className="wrap grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div data-reveal>
          <p className="label text-indigo">Work</p>
          <h2 className="section-title">The receipts.</h2>
          <p className="mt-4 max-w-[30em] text-[clamp(16px,1.35vw,18px)] leading-[1.6] text-muted">
            A trader shows you what you paid for. Here is what each build came to, in real numbers.
            Pick one and it prints.
          </p>
          <div className="mt-8 grid border-t border-line">
            {receipts.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-pressed={r.id === picked}
                onClick={() => pick(r.id)}
                className="project-tab flex min-h-19 w-full cursor-pointer items-center justify-between gap-4 border-b border-line px-1 py-3 text-left transition-[padding,color] duration-200 hover:pl-3"
              >
                <span>
                  <b className="block font-display text-[clamp(24px,2.1vw,30px)] leading-[1.15] font-normal">
                    {r.name}
                  </b>
                  <small className="mt-0.5 block text-sm leading-5 text-muted">{r.kind}</small>
                </span>
                <span className="project-dot size-3.5 flex-none rounded-full border-2 border-line transition-all duration-200" />
              </button>
            ))}
          </div>
        </div>

        <div
          ref={counter}
          data-reveal
          className="relative -mx-[clamp(16px,4vw,56px)] overflow-hidden bg-indigo px-4 pb-[clamp(32px,4vw,56px)] sm:mx-0 sm:rounded-lg sm:px-[clamp(16px,5vw,72px)] lg:min-h-[760px]"
        >
          <div className="adire adire-strong" />
          <div className="relative -mx-1 h-3.5 rounded-b-md bg-slot sm:-mx-3.5" />
          {/* The key remounts the receipt, so it prints again on each pick. */}
          <div aria-live="polite" aria-atomic="true" className="relative">
            <ReceiptPaper key={active.id} receipt={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReceiptPaper({ receipt }: { receipt: Receipt }) {
  return (
    <article className="receipt relative mx-auto max-w-[480px] text-ink">
      <div className="relative bg-raised px-[clamp(18px,2.4vw,32px)] pt-7 pb-5.5">
        <div className="receipt-kicker flex justify-between gap-3">
          <span>IBGlobals Tech</span>
          <span>{receipt.when}</span>
        </div>
        {/* Right padding keeps the title and description clear of the stamp. */}
        <h3 className="mt-3.5 pr-[92px] font-display text-[clamp(30px,2.8vw,36px)] leading-[1.1]">
          {receipt.name}
        </h3>
        <p className="mt-2 pr-[92px] text-[15px] leading-[22px] text-muted">{receipt.desc}</p>
        <hr className="receipt-rule" />
        {receipt.lines.map(([label, value], i) => (
          <div
            key={label}
            className="receipt-line flex items-baseline gap-2 text-[15px] leading-[30px]"
            style={{ animationDelay: `${0.25 + i * 0.1}s` }}
          >
            <span>{label}</span>
            <span className="receipt-leader" />
            <b className="font-bold whitespace-nowrap text-bronze tabular-nums">{value}</b>
          </div>
        ))}
        <hr className="receipt-rule" />
        <p className="text-sm leading-[21px]">
          <strong className="receipt-kicker mb-0.5 block">The hard part</strong>
          {receipt.hard}
        </p>
        <hr className="receipt-rule" />
        <div className="flex items-baseline justify-between gap-3 text-[15px] font-bold">
          <span>{receipt.total[0]}</span>
          <b className="text-right font-display text-3xl leading-[1.1] font-normal">
            {receipt.total[1]}
          </b>
        </div>
        <hr className="receipt-rule" />
        <p className="text-[13px] leading-[19px] text-muted">{receipt.stack}</p>
        <p className="mt-3 text-center text-[13px] leading-[18px] text-muted">
          Thank you. Come again.
        </p>
        <div
          aria-label={`Status: ${receipt.stamp}`}
          role="img"
          className={cn("stamp", receipt.stamp === "Live" ? "text-palm" : "text-indigo")}
        >
          {receipt.stamp}
        </div>
      </div>
    </article>
  );
}
