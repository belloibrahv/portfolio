/**
 * Every piece of writing gets its own cloth, tied from its URL slug, so the same
 * piece always has the same cloth. The field stays within the brand's 20% pattern
 * strength; the seal in gold beads is the ornament. Colours follow the brand:
 * indigo for the workshop, terracotta for the market.
 */

export type Thread = "workshop" | "market";

const GROUND: Record<Thread, string> = { workshop: "#1F3266", market: "#A9461F" };
const GOLD = "#B8873B";
const PAPER = "#F6F0E6";

const WIDTH = 640;
const HEIGHT = 400;
const CELL = 80;

/** A small seeded generator (mulberry32), seeded from an FNV-1a hash of the slug. */
function randomFrom(slug: string) {
  let seed = 2166136261;
  for (const char of slug) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619);
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (value: number) => Number(value.toFixed(2));

/** Round dashes that read as beads. Works out the gap directly, so any SVG renderer draws it the same. */
function beads(cx: number, cy: number, r: number, count: number, size: number, stroke: string, className = "") {
  const gap = (2 * Math.PI * r) / count;
  return `<circle class="${className}" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${size}" stroke-linecap="round" stroke-dasharray="0 ${n(gap)}"/>`;
}

function ring(cx: number, cy: number, r: number, width: number, stroke: string) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${width}"/>`;
}

const MOTIFS = [
  (x: number, y: number) => ring(x, y, 26, 3, GOLD) + ring(x, y, 14, 3, GOLD) + `<circle cx="${x}" cy="${y}" r="4" fill="${GOLD}"/>`,
  (x: number, y: number) => beads(x, y, 28, 16, 5, GOLD) + `<circle cx="${x}" cy="${y}" r="11" fill="${GOLD}"/>`,
  (x: number, y: number) => beads(x, y, 28, 18, 4, GOLD) + beads(x, y, 16, 10, 4, GOLD),
  (x: number, y: number) =>
    [-20, -10, 0, 10, 20].map((d) => `<path d="M${x - 28} ${y + d}h56" stroke="${GOLD}" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>`).join(""),
  (x: number, y: number) =>
    `<path d="M${x - 30} ${y + 24}a30 30 0 0 1 60 0M${x - 19} ${y + 24}a19 19 0 0 1 38 0M${x - 8} ${y + 24}a8 8 0 0 1 16 0" fill="none" stroke="${GOLD}" stroke-width="3"/>`,
  (x: number, y: number) =>
    Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI) / 4;
      return `<path d="M${n(x + 11 * Math.cos(a))} ${n(y + 11 * Math.sin(a))}L${n(x + 29 * Math.cos(a))} ${n(y + 29 * Math.sin(a))}" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/>`;
    }).join("") + `<circle cx="${x}" cy="${y}" r="5" fill="${GOLD}"/>`,
];

/** The inner parts of the cloth, without the outer <svg>, for inline use and for images. */
function clothParts(slug: string, thread: Thread) {
  const random = randomFrom(slug);
  // Each cloth ties two or three motifs, repeated by hand, so it holds together as one pattern.
  const palette = Array.from({ length: 2 + Math.floor(random() * 2) }, () => MOTIFS[Math.floor(random() * MOTIFS.length)]);
  const pick = random();

  let field = "";
  for (let row = 0; row < HEIGHT / CELL; row++) {
    for (let col = 0; col < WIDTH / CELL; col++) {
      const x = col * CELL + CELL / 2;
      const y = row * CELL + CELL / 2;
      const motif = pick < 0.5 ? palette[(row + col) % palette.length] : palette[Math.floor(random() * palette.length)];
      field += motif(x, y);
    }
  }

  // Near the middle, so the seal stays whole when the cloth is cropped to a square.
  const cx = 270 + Math.round(random() * 100);
  const cy = 170 + Math.round(random() * 60);
  const radius = 92 + Math.round(random() * 36);
  const rings = 2 + Math.floor(random() * 3);
  let seal = `<circle cx="${cx}" cy="${cy}" r="${radius + 14}" fill="${GROUND[thread]}"/>`;
  for (let i = 0; i < rings; i++) {
    const r = radius - i * (radius / (rings + 1));
    const count = Math.round((2 * Math.PI * r) / (10 + Math.round(random() * 8)));
    seal += i % 2 ? ring(cx, cy, n(r), 2, GOLD) : beads(cx, cy, n(r), count, 6 - i, GOLD, "cloth-ring");
  }
  seal += `<circle cx="${cx}" cy="${cy}" r="${10 + Math.round(random() * 8)}" fill="${thread === "market" ? PAPER : GOLD}"/>`;

  return `<rect width="${WIDTH}" height="${HEIGHT}" fill="${GROUND[thread]}"/><g opacity="0.2">${field}</g>${seal}`;
}

export function clothSvg(slug: string, thread: Thread) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${clothParts(slug, thread)}</svg>`;
}
