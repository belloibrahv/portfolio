/** The admin stores writing as Markdown files in the repository, through GitHub's contents API. */

const REPO = "belloibrahv/portfolio";
const DIR = "content/writing";
const branch = () => process.env.WRITING_BRANCH || "main";

export class GitHubError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function request(path: string, init?: RequestInit) {
  const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (response.ok) return response.json();
  throw new GitHubError(`GitHub answered ${response.status}`, response.status);
}

export type StoredFile = { slug: string; sha: string; source: string };

const slugOf = (name: string) => name.replace(/\.md$/, "");

export async function readFile(slug: string): Promise<StoredFile | null> {
  try {
    const file = await request(`${DIR}/${slug}.md?ref=${encodeURIComponent(branch())}`);
    return { slug, sha: file.sha, source: Buffer.from(file.content, "base64").toString("utf8") };
  } catch (error) {
    if (error instanceof GitHubError && error.status === 404) return null;
    throw error;
  }
}

export async function readAllFiles(): Promise<StoredFile[]> {
  const entries: { name: string; type: string }[] = await request(`${DIR}?ref=${encodeURIComponent(branch())}`);
  const files = await Promise.all(entries.filter((entry) => entry.type === "file" && entry.name.endsWith(".md")).map((entry) => readFile(slugOf(entry.name))));
  return files.filter((file) => file !== null);
}

export async function writeFile(slug: string, source: string, sha: string | undefined, message: string): Promise<string> {
  const result = await request(`${DIR}/${slug}.md`, {
    method: "PUT",
    body: JSON.stringify({ message, content: Buffer.from(source).toString("base64"), branch: branch(), ...(sha ? { sha } : {}) }),
  });
  return result.content.sha;
}

export async function removeFile(slug: string, sha: string, message: string) {
  await request(`${DIR}/${slug}.md`, { method: "DELETE", body: JSON.stringify({ message, sha, branch: branch() }) });
}
