# Bello Sheu Ibrahim Portfolio

Personal portfolio, built with Next.js 16, TypeScript and Tailwind CSS on the IBGlobals brand.

## Run locally

```bash
npm install
npm run dev
```

## Update the content

All copy lives in `content/resume.ts`. When the resume changes, edit that file and replace `public/Ibrahim_Bello_Resume.pdf`.

## Write something

```bash
npm run new -- "My title" market    # or workshop, for technical pieces
```

This creates `content/writing/my-title.md`, a Markdown file. The file name is the URL: `/writing/my-title`. Fill in the summary, write, and preview with `npm run dev`. To publish, set `draft: false`, then push to `main`.

Each piece gets its own adire cloth and share image, made from its URL, so changing a file name changes both. It also joins the home page, `/writing`, the RSS feed and the sitemap by itself. The Writing link appears in the navigation once the first piece is published.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```
