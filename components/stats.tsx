import { CountUp } from "@/components/count-up";
import { stats } from "@/content/resume";

export function Stats() {
  return (
    <section
      aria-label="At a glance"
      className="grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          data-reveal
          className="grid grid-cols-[104px_minmax(0,1fr)] items-center gap-3 py-3.5 sm:block sm:px-[clamp(16px,3vw,40px)] sm:py-5.5 sm:first:pl-0"
        >
          <b className="block font-display text-[clamp(40px,4.6vw,64px)] leading-[1.05] font-normal tabular-nums">
            <CountUp value={stat.value} suffix={stat.suffix} />
          </b>
          <span className="block text-sm leading-5 text-muted sm:mt-1">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
