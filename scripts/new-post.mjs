// Starts a new draft: npm run new -- "My title" market
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";

const [title, thread = "workshop"] = process.argv.slice(2);
if (!title || !["workshop", "market"].includes(thread)) {
  console.error('Usage: npm run new -- "My title" [workshop|market]');
  process.exit(1);
}
const slug = title.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const file = path.join("content", "writing", `${slug}.md`);
if (existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}
const date = new Date().toISOString().slice(0, 10);
writeFileSync(file, `---\ntitle: ${JSON.stringify(title)}\nsummary: ""\ndate: ${date}\nthread: ${thread}\ntags: []\ndraft: true\n---\n\nStart here.\n`);
console.log(`Created ${file}\nIt will live at /writing/${slug} once you set draft: false and push.`);
