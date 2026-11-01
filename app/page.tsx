import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { CareerPath } from "@/components/career-path";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Stats } from "@/components/stats";
import { Tools } from "@/components/tools";
import { Work } from "@/components/work";
import { WritingSection } from "@/components/writing-section";
import { profile } from "@/content/resume";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: profile.site,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github, profile.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Reveal />
      <SiteNav />
      <main id="top">
        <div className="wrap">
          <Hero />
          <Stats />
        </div>
        <Marquee />
        <Work />
        <CareerPath />
        <Tools />
        <WritingSection />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
