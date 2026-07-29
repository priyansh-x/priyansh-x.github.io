# priyanshx.tech

My personal site — bio, projects, and LogX (writing). Bilingual (English / हिंदी), pure black-and-white, no framework chrome.

**Live:** [priyanshx.tech](https://priyanshx.tech)

## Stack

- [Vite](https://vitejs.dev) + React 18 + TypeScript
- Tailwind CSS for styling; design tokens live in `src/index.css`
- `react-router-dom` for routing, with a `404.html` shim so deep links survive static hosting

## Develop

```bash
npm install
npm run dev      # http://localhost:8080
npm run lint
npm test
npm run build    # outputs to dist/
```

## Layout

```
src/
  lib/content.ts     all copy, posts, projects and translations — edit here first
  pages/             route components (Index, Projects, LogXPost, Resume, NotFound)
  components/        site-specific components
  components/ui/     shadcn primitives, trimmed to the four actually in use
  contexts/          language provider
```

Adding a post means adding an entry to `posts` and its paragraphs to `postContent`, both in `src/lib/content.ts`. Everything else is derived — the homepage list, the reading time, and the `/logx/:slug` route.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages.

`BASE_PATH` is unset because this is a user page served from the domain root. For a project-page deploy, set it to `/<repo-name>/` in the workflow and bump `pathSegmentsToKeep` to `1` in `public/404.html`.
