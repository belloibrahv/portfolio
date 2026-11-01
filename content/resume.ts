/**
 * All site copy lives here. Update this file when the resume changes.
 * Source of truth: Ibrahim_Bello_Resume.pdf
 */

export const profile = {
  name: "Bello Sheu Ibrahim",
  title: "Full-Stack Software Engineer and Technical Lead",
  location: "Lagos",
  email: "sheuibrahimb@gmail.com",
  phone: "+234 707 234 6284",
  phoneHref: "tel:+2347072346284",
  github: "https://github.com/belloibrahv",
  linkedin: "https://www.linkedin.com/in/ibrahim-bello-8951ba187",
  site: "https://belloibrahim.vercel.app",
  resume: "/Ibrahim_Bello_Resume.pdf",
  lede: "Full-stack engineer and Technical Lead. In 2026 I took three platforms from first commit to live production: bus booking, retail POS and cooperative finance.",
  tagline: "Rooted in art and culture. Built with knowledge. Traded with honesty.",
} as const;

export const stats = [
  { value: 6, suffix: "+", label: "years shipping production systems" },
  { value: 3, suffix: "", label: "platforms taken live in 2026" },
  { value: 2100, suffix: "+", label: "tests in JekaGo's pre-push gate" },
] as const;

export const strengths = [
  "Payments",
  "Multi-tenant security",
  "Financial correctness",
  "Fast client delivery",
] as const;

export type Receipt = {
  id: string;
  name: string;
  kind: string;
  when: string;
  desc: string;
  lines: readonly (readonly [label: string, value: string])[];
  hard: string;
  total: readonly [label: string, value: string];
  stack: string;
  stamp: "Live" | "In work";
  /** The slug of the piece telling this build's story. The link shows once it is published. */
  story?: string;
};

export const receipts: readonly Receipt[] = [
  {
    id: "jekago",
    story: "four-checks-before-a-payout",
    name: "JekaGo",
    kind: "Intercity bus booking and private rides",
    when: "Jun – Oct 2026",
    desc: "Booking, wallets, operator payouts and live trip tracking for Nigerian road travel.",
    lines: [
      ["Web app pages", "130+"],
      ["API endpoints", "480+"],
      ["Data models", "71"],
      ["Commits", "970+"],
      ["Tests before each push", "2,100+"],
    ],
    hard: "Instant Paystack payouts to operators on every booking, all behind approval controls.",
    total: ["First commit to launch", "About 3 months"],
    stack: "Next.js 15, NestJS 11, Prisma, PostgreSQL, Redis, Docker, Caddy",
    stamp: "Live",
  },
  {
    id: "stockvaults",
    story: "when-the-network-drops-the-shop-keeps-selling",
    name: "StockVaults",
    kind: "Multi-branch inventory, POS and accounting",
    when: "Sep 2026 – Present",
    desc: "Live at a multi-shop electronics retailer. Now sold as white-label SaaS.",
    lines: [
      ["Lines of TypeScript", "73,000"],
      ["Data models", "44"],
      ["Access roles", "10"],
      ["Integrity checks on live data", "8"],
    ],
    hard: "A point of sale that queues sales offline and syncs on reconnect, so shops keep selling through network outages.",
    total: ["Built and deployed", "7 weeks"],
    stack: "TypeScript, Serwist, IndexedDB",
    stamp: "Live",
  },
  {
    id: "cooperative-vaults",
    name: "Cooperative Vaults",
    kind: "Multi-tenant SaaS for cooperative societies",
    when: "Oct 2026 – Present",
    desc: "Loans, payroll deductions, statements, year-end close and a member portal.",
    lines: [
      ["Database guardrail migrations", "24"],
      ["Unit tests", "98"],
      ["End-to-end checks", "73"],
    ],
    hard: "A double-entry ledger in integer kobo, append-only, with a tamper-evident audit chain.",
    total: ["Officers who can move money alone", "None"],
    stack: "PostgreSQL row-level security, Playwright",
    stamp: "Live",
  },
  {
    id: "nutrition",
    name: "National Nutrition Budget Tracker",
    kind: "Federal budget tracking platform",
    when: "Nov 2025 – Present",
    desc: "Tracks nutrition budget allocation and spending across Nigeria.",
    lines: [
      ["Frontend engineers", "1, me"],
      ["User roles", "3"],
      ["Validated API integrations", "15+"],
      ["Lighthouse accessibility", "90+"],
    ],
    hard: "Role-based access enforced in both the UI and the API, over dashboards of 1,000+ rows.",
    total: ["Page load", "Under 2 seconds"],
    stack: "Next.js 16, TypeScript, NextAuth v5, Zod",
    stamp: "In work",
  },
];

export const roles = [
  {
    when: "Jun – Oct 2026",
    title: "Full-Stack Engineer, Contract",
    org: "JekaGo Technologies · Lagos",
    body: "Took an intercity bus and private-ride platform from first commit to launch in about 3 months, then ran it in production on a VPS with Docker and Caddy.",
    current: false,
  },
  {
    when: "Nov 2025 – Present",
    title: "Frontend Engineer, Contract",
    org: "National Nutrition Budget Tracking System · Remote",
    body: "Sole frontend engineer on a federal platform that tracks nutrition budgets across Nigeria. Page loads under 2 seconds and a 90+ Lighthouse accessibility score.",
    current: true,
  },
  {
    when: "2023 – 2024",
    title: "Frontend Engineer",
    org: "Varuna Inc. · Remote, Texas",
    body: "Co-led the rebuild of a legacy frontend for real-time water monitoring, and improved rendering performance by 50%.",
    current: false,
  },
  {
    when: "2019 – Present",
    title: "Technical Lead & Full-Stack Engineer",
    org: "TechVaults Limited · Lagos",
    body: "Longest-serving engineer. I lead the team and own delivery for healthcare, finance and education clients, including Custodian PLC, and for StockVaults and Cooperative Vaults. I run OWASP-based penetration tests before release. Performance work lifted client online transactions by up to 30%.",
    current: true,
  },
] as const;

export const also = [
  {
    title: "Open source",
    body: "Pull requests to Hedera JSON RPC Relay, Hiero Ledger and OpenElements. Contributor to CocoIndex.",
  },
  {
    title: "Community",
    body: "Organiser and technical support lead at Google Developer Group Lagos, events of 2,000+ attendees.",
  },
  {
    title: "Education",
    body: "B.Sc. Computer Science, Edexcel University, Benin. Google Africa Developer Scholarship, 2018.",
  },
] as const;

export const tools = [
  ["Languages", "TypeScript, JavaScript, Python, PHP, SQL"],
  ["Frontend", "React 19, Next.js 15/16, TanStack Query, Zustand, Tailwind CSS, PWA"],
  ["Backend", "Node.js, NestJS, Fastify, Express, Laravel, Django, BullMQ"],
  ["Data", "PostgreSQL with row-level security, Prisma, Drizzle, MySQL, Redis"],
  ["Security", "2FA, role-based access control, Better Auth, NextAuth, OWASP testing"],
  ["Payments & APIs", "Paystack, Google Maps Platform, Termii, Africa's Talking, Prembly, Resend"],
  ["DevOps & Testing", "Docker, Caddy, VPS, Railway, Vercel, Turborepo, Vitest, Playwright"],
] as const;
