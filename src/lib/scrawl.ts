// Finger-on-glass handwriting, generated.
//
// Every glyph is a few pen strokes in a box where the cap height is 10 units
// (top 0, x-height 4.3, baseline 10, descenders to 14). Text is laid out, then
// each letter gets its own small tilt, size and baseline drift, and every
// stroke a slow wobble, so nothing lines up the way a font would.

export type P = [number, number];
export type Stroke = { pts: P[]; sharp?: boolean };
type Glyph = { w: number; strokes: Stroke[] };

const arc = (cx: number, cy: number, rx: number, ry: number, a0: number, a1: number): P[] => {
  const n = Math.max(4, Math.ceil(Math.abs(a1 - a0) / 14));
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as P;
  });
};
const line = (...pts: P[]): Stroke => ({ pts, sharp: true });
const curve = (...pts: P[]): Stroke => ({ pts });
const dot = (x: number, y: number, r = 0.42): Stroke => curve(...arc(x, y, r, r, 0, 360));

const GLYPHS: Record<string, Glyph> = {
  a: { w: 5.3, strokes: [curve(...arc(2.6, 7.2, 2.5, 2.8, -50, -400)), line([5.1, 4.4], [5.1, 10])] },
  b: { w: 5.4, strokes: [line([0, 0], [0, 10]), curve(...arc(2.7, 7.3, 2.6, 2.7, 170, 530))] },
  d: { w: 5.3, strokes: [curve(...arc(2.6, 7.3, 2.6, 2.7, -20, -370)), line([5.2, 0], [5.2, 10])] },
  e: { w: 5.1, strokes: [curve([0.2, 7.3], [5, 7.2], ...arc(2.6, 7.3, 2.5, 2.7, 0, -315))] },
  g: { w: 5.3, strokes: [curve(...arc(2.6, 7, 2.5, 2.7, -50, -400)), curve([5.1, 4.4], [5.1, 12], ...arc(2.8, 12, 2.3, 2, 0, 170))] },
  h: { w: 5.1, strokes: [line([0, 0], [0, 10]), curve(...arc(2.5, 7, 2.5, 2.6, 180, 360), [5, 10])] },
  i: { w: 0.6, strokes: [line([0, 4.4], [0.1, 10]), dot(0.1, 2.2)] },
  n: { w: 5.1, strokes: [line([0, 4.3], [0, 10]), curve(...arc(2.5, 7.1, 2.5, 2.5, 180, 360), [5, 10])] },
  o: { w: 5.4, strokes: [curve(...arc(2.7, 7.2, 2.7, 2.8, -90, -445))] },
  r: { w: 3.7, strokes: [line([0, 4.3], [0, 10]), curve(...arc(2.6, 7, 2.6, 2.6, 180, 295))] },
  // the zig-zag s: a little 5 with its top flipped
  s: { w: 4.5, strokes: [curve([4.4, 4.5], [0.6, 4.5], [1.6, 5.9], [3.8, 7.6], [4.7, 8.8], [3.7, 9.8], [0, 9.9])] },
  t: { w: 3.7, strokes: [curve([1.6, 1.3], [1.6, 8.6], [2.2, 9.8], [3.8, 9.9]), line([0, 4.6], [3.8, 4.4])] },
  w: { w: 5.9, strokes: [line([0, 4.3], [1.4, 10], [2.9, 6.2], [4.4, 10], [5.9, 4.3])] },
  y: { w: 5.1, strokes: [line([0, 4.3], [2.6, 9.2]), line([5.1, 4.3], [1.3, 14])] },
  P: { w: 4.9, strokes: [line([0, 0.4], [0, 10]), curve([0, 0.5], [1.6, 0.4], ...arc(1.7, 2.9, 3.1, 2.4, -90, 90), [0, 5.4])] },
  W: { w: 8.7, strokes: [line([0, 0], [2.4, 10], [4.4, 1.2], [6.3, 10], [8.7, 0])] },
  X: { w: 4.8, strokes: [line([0, 0.5], [4.8, 10]), line([4.8, 0], [0.2, 10])] },
  L: { w: 4.4, strokes: [line([0, 0], [0, 10], [4.4, 9.7])] },
  "'": { w: 0.6, strokes: [line([0.6, -0.2], [0, 2.6])] },
  ".": { w: 0.7, strokes: [dot(0.3, 9.6, 0.35)] },
  "@": {
    w: 7.2,
    strokes: [
      curve(...arc(3.4, 6.4, 1.6, 1.8, -50, -400)),
      curve([5, 4.6], [5.1, 7.6], [6, 8.4], [7, 7.4], ...arc(3.6, 6.2, 3.6, 4, 5, -320)),
    ],
  },
  // a tiny rocket standing in for an i
  "^": {
    w: 3,
    strokes: [
      curve([1.5, -0.4], [2.6, 1.6], [2.9, 4], [2.9, 8.4], [0.1, 8.4], [0.1, 4], [0.4, 1.6], [1.5, -0.4]),
      line([0.1, 6.2], [-1.1, 9.2], [0.1, 8.4]),
      line([2.9, 6.2], [4.1, 9.2], [2.9, 8.4]),
      dot(1.5, 3.9, 0.6),
      line([0.7, 8.8], [1, 10.8], [1.5, 9.5], [2, 11], [2.3, 8.8]),
    ],
  },
};

const SPACE = 2.8;
const GAP = 1.9;

// small seeded RNG so the scrawl is the same on every visit
export const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const len = (pts: P[]) => pts.reduce((s, p, i) => (i ? s + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);

/** a slow, hand-like wobble along the stroke */
export const wobble = (s: Stroke, rand: () => number, amp = 0.17): Stroke => {
  const f1 = 0.35 + rand() * 0.5, f2 = 0.35 + rand() * 0.5;
  const p1 = rand() * 6.28, p2 = rand() * 6.28;
  let acc = 0;
  return {
    sharp: s.sharp,
    pts: s.pts.map((p, i) => {
      if (i) acc += Math.hypot(p[0] - s.pts[i - 1][0], p[1] - s.pts[i - 1][1]);
      return [p[0] + amp * Math.sin(acc * f1 + p1), p[1] + amp * Math.sin(acc * f2 + p2)];
    }),
  };
};

const toPath = (s: Stroke) => {
  const p = s.pts;
  const f = (n: number) => n.toFixed(2);
  if (s.sharp || p.length < 3) return `M${p.map((q) => `${f(q[0])} ${f(q[1])}`).join("L")}`;
  // Catmull-Rom through every point, as cubic beziers
  let d = `M${f(p[0][0])} ${f(p[0][1])}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i], b = p[i], c = p[i + 1], e = p[i + 2] ?? c;
    d += `C${f(b[0] + (c[0] - a[0]) / 6)} ${f(b[1] + (c[1] - a[1]) / 6)} ${f(c[0] - (e[0] - b[0]) / 6)} ${f(c[1] - (e[1] - b[1]) / 6)} ${f(c[0])} ${f(c[1])}`;
  }
  return d;
};

export type Ink = {
  /** one entry per pen stroke, in writing order */
  strokes: { d: string; length: number; pause: number }[];
  box: { x: number; y: number; w: number; h: number };
};

export type ScrawlOptions = { seed?: number; tilt?: number; jitter?: number };

/** turn text into pen strokes */
export function scrawl(text: string, { seed = 1, tilt = 4, jitter = 1 }: ScrawlOptions = {}): Ink {
  const rand = rng(seed);
  const out: Ink["strokes"] = [];
  const pts: P[] = [];
  let x = 0;
  for (const ch of text) {
    if (ch === " ") { x += SPACE + rand() * 0.8; continue; }
    const g = GLYPHS[ch];
    if (!g) continue;
    const cap = ch >= "A" && ch <= "Z";
    // a capital at the start gets written big, the way people do
    const scale = (cap ? (x === 0 ? 1.22 : 1.08) : 0.95) + (rand() - 0.5) * 0.24 * jitter;
    const rot = ((rand() - 0.5) * 2 * tilt * Math.PI) / 180;
    const dy = (rand() - 0.5) * 1.3 * jitter;
    const cx = g.w / 2, cy = 7;
    const cos = Math.cos(rot), sin = Math.sin(rot);
    g.strokes.forEach((s, k) => {
      const placed: Stroke = {
        sharp: s.sharp,
        pts: s.pts.map(([px, py]) => {
          const ux = (px - cx) * scale, uy = (py - cy) * scale;
          return [x + cx + ux * cos - uy * sin, cy + dy + ux * sin + uy * cos] as P;
        }),
      };
      const w = wobble(placed, rand, 0.24 * jitter);
      out.push({ d: toPath(w), length: len(w.pts), pause: k === 0 ? 0.05 : 0.02 });
      pts.push(...w.pts);
    });
    x += g.w * scale + GAP + (rand() - 0.35) * 0.9 * jitter;
  }
  return { strokes: out, box: boxOf(pts) };
}

export const boxOf = (pts: P[], pad = 1) => {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of pts) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  return { x: x0 - pad, y: y0 - pad, w: x1 - x0 + pad * 2, h: y1 - y0 + pad * 2 };
};

/** hand-placed strokes (a doodle) through the same pen */
export function doodle(strokes: Stroke[], seed = 1, amp = 0.5): Ink {
  const rand = rng(seed);
  const pts: P[] = [];
  const out = strokes.map((s, k) => {
    const w = wobble(s, rand, amp);
    pts.push(...w.pts);
    return { d: toPath(w), length: len(w.pts), pause: k === 0 ? 0 : 0.03 };
  });
  return { strokes: out, box: boxOf(pts, 2) };
}

export { arc, line, curve, dot };
