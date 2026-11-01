import { also, roles } from "@/content/resume";

export function CareerPath() {
  return (
    <section id="path" className="pb-[clamp(56px,8vw,112px)]">
      <div className="wrap">
        <div data-reveal>
          <p className="label text-indigo">Path</p>
          <h2 className="section-title">Where I have worked.</h2>
        </div>
        <div className="mt-[clamp(32px,4vw,56px)]">
          {roles.map((role) => (
            <article
              key={role.org}
              data-reveal
              data-current={role.current}
              className="path-row relative grid gap-x-10 gap-y-2 pb-[clamp(32px,3.4vw,44px)] pl-[34px] lg:grid-cols-[190px_minmax(0,1fr)]"
            >
              <span className="path-bead" />
              <div className="text-sm leading-6 font-medium text-muted">{role.when}</div>
              <div>
                <h3 className="font-display text-[clamp(26px,2.4vw,34px)] leading-[1.15]">
                  {role.title}
                  <span className="mt-0.5 block font-sans text-[15px] leading-[22px] font-medium text-indigo">
                    {role.org}
                  </span>
                </h3>
                <p className="mt-2 max-w-[44em] text-muted">{role.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div
          data-reveal
          className="grid gap-x-[clamp(24px,3vw,48px)] gap-y-6 border-t border-line pt-8 lg:grid-cols-3"
        >
          {also.map((item) => (
            <div key={item.title}>
              <b className="block leading-6 font-medium">{item.title}</b>
              <span className="mt-1 block text-sm leading-[21px] text-muted">{item.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
