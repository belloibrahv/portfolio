import { tools } from "@/content/resume";

export function Tools() {
  return (
    <section id="tools" className="pb-[clamp(56px,8vw,112px)]">
      <div className="wrap">
        <div data-reveal>
          <p className="label text-indigo">Tools</p>
          <h2 className="section-title">What I work with.</h2>
        </div>
        <div data-reveal className="mt-[clamp(28px,3vw,48px)] border-t border-line">
          {tools.map(([group, list]) => (
            <div
              key={group}
              className="grid gap-x-10 gap-y-1 border-b border-line px-1 py-[15px] transition-[background-color,padding] duration-200 hover:bg-raised hover:px-3.5 lg:grid-cols-[190px_minmax(0,1fr)]"
            >
              <b className="text-xs leading-6 font-bold tracking-[0.14em] text-indigo uppercase">
                {group}
              </b>
              <span>{list}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
