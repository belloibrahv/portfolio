import Image from "next/image";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/resume";

export function Hero() {
  return (
    <section className="grid items-center gap-[clamp(32px,5vw,72px)] pt-[clamp(40px,6vw,88px)] pb-[clamp(32px,4vw,56px)] lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]">
      <div>
        <p className="label text-indigo">
          {profile.name} · {profile.location}
        </p>
        <h1
          aria-label="I ship the whole thing."
          className="my-6 font-display text-[15.6vw] leading-[0.98] tracking-[-0.012em] sm:text-[13.5vw] lg:text-[clamp(60px,8.4vw,124px)]"
        >
          <span aria-hidden="true" className="headline-line">
            <span className="headline-word">I</span>{" "}
            <span className="headline-word [animation-delay:90ms]">ship</span>{" "}
            <span className="headline-word [animation-delay:180ms]">the</span>
          </span>
          <span aria-hidden="true" className="headline-line">
            <span className="headline-word [animation-delay:270ms]">
              <span className="stitched">whole</span> thing.
            </span>
          </span>
        </h1>
        <p className="fade-in max-w-[34em] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-muted [animation-delay:450ms]">
          {profile.lede}
        </p>
        <div className="fade-in mt-7 flex flex-wrap gap-3 [animation-delay:600ms]">
          <Button asChild className="group flex-[1_1_150px] sm:flex-none">
            <a href="#work">
              See the receipts
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-[3px]"
              >
                <path d="M2 8h11M9 4l4 4-4 4" />
              </svg>
            </a>
          </Button>
          <Button asChild variant="outline" className="flex-[1_1_150px] sm:flex-none">
            <a href={profile.resume} download>
              Download resume
            </a>
          </Button>
        </div>
      </div>

      <div className="stage fade-in relative aspect-square w-full max-w-[560px] justify-self-center overflow-hidden rounded-lg border border-line bg-raised [animation-delay:200ms] lg:max-w-none">
        <div className="adire" />
        <Image
          src="/images/ibrahim-at-work.jpg"
          alt="Ibrahim at a laptop, deep in focus at a coding event"
          width={800}
          height={800}
          priority
          sizes="(min-width: 900px) 30vw, (min-width: 800px) 392px, 70vw"
          className="portrait absolute top-1/2 left-1/2 aspect-square w-[70%] rounded-full object-cover"
        />
        <svg viewBox="0 0 100 100" aria-hidden="true" className="rings absolute inset-0 size-full">
          <g className="ring-spin-back">
            <circle className="beads-indigo" cx="50" cy="50" r="38.5" pathLength={120} />
          </g>
          <g className="ring-spin">
            <circle className="beads-gold" cx="50" cy="50" r="42.5" pathLength={72} />
            <circle cx="50" cy="7.5" r="2" fill="#A9461F" />
          </g>
        </svg>
      </div>
    </section>
  );
}
