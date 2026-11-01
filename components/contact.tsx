import { CopyEmail } from "@/components/copy-email";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/resume";

export function Contact() {
  return (
    <section id="contact" className="wrap">
      <div
        data-reveal
        className="on-indigo relative overflow-hidden rounded-lg bg-indigo px-[clamp(20px,5vw,72px)] py-[clamp(32px,6vw,88px)] text-raised"
      >
        <div className="adire" />
        <div className="relative">
          <p className="label">Contact</p>
          <h2 className="mt-5 max-w-[10em] font-display text-[clamp(48px,7.4vw,108px)] leading-none">
            Got something to build?
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 inline-block py-2 font-display text-[clamp(24px,3.2vw,44px)] leading-[1.2] [overflow-wrap:anywhere] underline decoration-gold decoration-2 underline-offset-[6px]"
          >
            {profile.email}
          </a>
          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2.5">
            <CopyEmail email={profile.email} />
            <Button asChild variant="onIndigo" className="flex-[1_1_140px] sm:flex-none">
              <a href={profile.phoneHref}>{profile.phone}</a>
            </Button>
            <Button asChild variant="onIndigo" className="flex-[1_1_140px] sm:flex-none">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
            <Button asChild variant="onIndigo" className="flex-[1_1_140px] sm:flex-none">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
