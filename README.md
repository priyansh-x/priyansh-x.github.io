# priyanshx.tech

One screen, black and white: *I want to do hard things.* Behind it, a long-exposure night sky: star trails that brighten under the cursor, and a launch trajectory that lifts off from the full stop (click for another).

Vite + React + TypeScript. The page is `src/pages/Index.tsx`, the styles are `src/index.css`. Fonts: Instrument Serif and JetBrains Mono (Google Fonts).

```bash
npm install
npm run dev      # http://localhost:8080
npm test
npm run build    # outputs to dist/
```

## Deploy (VPS)

Caddy serves `/home/priyansh/portfolio/dist` for priyanshx.tech.

```bash
ssh vps 'cd ~/portfolio && git pull && npm ci && npm run build'
```

## Previous site (archived)

The older site (bio, projects, LogX, Hindi toggle) is kept on the `archive/v1` branch and the `archive/v1-2026-11-08` tag. Its built `dist/` is also saved on the VPS at `~/portfolio-archive/v1-2026-11-08-dist`.

Restore it instantly on the VPS:

```bash
ssh vps 'rm -rf ~/portfolio/dist && cp -a ~/portfolio-archive/v1-2026-11-08-dist ~/portfolio/dist'
```
