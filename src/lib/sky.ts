// A long-exposure photograph of a night launch, drawn live.
//
//  - Star trails: every star sweeps the same angle around a pole above the
//    frame, as they would in one long exposure. They turn, very slowly.
//  - The pointer is a soft light: trails near it brighten, then settle.
//  - Launches: one thin luminous trajectory from the pad, pitching over as it
//    climbs, with the short dark gap where the first stage cuts off (MECO).
//    Old trajectories stay on the "film" and fade, so launches accumulate.

type Star = { r: number; a: number; width: number; alpha: number };

type Pt = { x: number; y: number };

type Streak = {
  p0: Pt; p1: Pt; p2: Pt; p3: Pt;
  born: number;      // ms
  climb: number;     // ms to reach the top of the frame
  gapAt: number;     // 0..1 where MECO happens
  power: number;     // brightness 0..1
};

export type LaunchOptions = { x: number; y: number; power?: number };

const TRAIL = 0.26;          // radians every star sweeps (the exposure)
const SPIN = 0.0035;         // radians per second the sky turns
const FADE_MS = 45_000;      // how long a trajectory stays on the film
const MAX_STREAKS = 6;
const LIGHT_R = 300;         // pointer light radius, px

const bez = (a: Pt, b: Pt, c: Pt, d: Pt, t: number): Pt => {
  const u = 1 - t;
  return {
    x: u * u * u * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t * t * t * d.x,
    y: u * u * u * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t * t * t * d.y,
  };
};

export function createSky(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // trails are drawn once per frame into this layer, then composited twice:
  // dim everywhere, and bright inside the pointer's light
  const layer = document.createElement("canvas");
  const lctx = layer.getContext("2d")!;
  const lit = document.createElement("canvas");
  const litx = lit.getContext("2d")!;

  let w = 0, h = 0, dpr = 1;
  let pole: Pt = { x: 0, y: 0 };
  let stars: Star[] = [];
  const streaks: Streak[] = [];
  const light = { x: -9999, y: -9999, tx: -9999, ty: -9999, k: 0, lastMove: 0 };
  let raf = 0;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = window.innerWidth;
    h = window.innerHeight;
    for (const c of [canvas, layer, lit]) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    pole = { x: w * 0.86, y: -h * 0.22 };
    const reach = Math.hypot(Math.max(pole.x, w - pole.x), h - pole.y) * 1.05;
    const n = Math.round(Math.min(1000, (w * h) / 1100));
    stars = Array.from({ length: n }, () => {
      const bright = Math.random() ** 4; // a few bright, many faint
      return {
        r: reach * Math.sqrt(0.02 + Math.random() * 0.98),
        a: Math.random() * Math.PI * 2,
        width: 0.45 + bright * 1.1,
        alpha: 0.12 + bright * 0.8,
      };
    });
  };

  const drawTrails = (now: number) => {
    lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lctx.clearRect(0, 0, w, h);
    lctx.lineCap = "round";
    const spin = reduced ? 0 : (now / 1000) * SPIN;
    for (const s of stars) {
      const start = s.a + spin;
      lctx.strokeStyle = `rgba(255,255,255,${s.alpha})`;
      lctx.lineWidth = s.width;
      lctx.beginPath();
      lctx.arc(pole.x, pole.y, s.r, start, start + TRAIL);
      lctx.stroke();
    }
  };

  const drawStreak = (s: Streak, now: number) => {
    const age = now - s.born;
    const grow = Math.min(1, age / s.climb);
    const fade = age <= s.climb ? 1 : Math.max(0, 1 - (age - s.climb) / FADE_MS);
    if (fade <= 0) return false;

    // the rocket accelerates: progress along the path eases in
    const head = reduced ? 1 : grow ** 1.8;
    const N = 260;
    const pts: Pt[] = [];
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * head;
      pts.push(bez(s.p0, s.p1, s.p2, s.p3, t));
    }

    ctx.lineCap = "round";
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 1; i < pts.length; i++) {
        const t = (i / N) * head;
        if (t > s.gapAt && t < s.gapAt + 0.022) continue; // MECO
        const second = t >= s.gapAt;
        const along = 1 - t * 0.6;
        const width = (second ? 0.8 : 1.5) * along + 0.3;
        const a = (second ? 0.7 : 1) * along * s.power * fade;
        if (pass === 0) {
          ctx.strokeStyle = `rgba(255,255,255,${a * 0.05})`;
          ctx.lineWidth = width * 6;
        } else {
          ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, a * 0.95)})`;
          ctx.lineWidth = width;
        }
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }
    }

    // the burning head, while it climbs
    if (grow < 1 && !reduced) {
      const p = pts[pts.length - 1];
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 22);
      g.addColorStop(0, `rgba(255,255,255,${0.9 * s.power})`);
      g.addColorStop(0.15, `rgba(255,255,255,${0.35 * s.power})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    // a low glow on the pad that cools after lift-off
    const pad = Math.max(0, 1 - age / 3500) * s.power;
    if (pad > 0 && !reduced) {
      const g = ctx.createRadialGradient(s.p0.x, s.p0.y, 0, s.p0.x, s.p0.y, 120);
      g.addColorStop(0, `rgba(255,255,255,${0.16 * pad})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(s.p0.x - 120, s.p0.y - 120, 240, 240);
    }
    return true;
  };

  const frame = (now: number) => {
    drawTrails(now);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // dim sky everywhere
    ctx.globalAlpha = 0.32;
    ctx.drawImage(layer, 0, 0);
    ctx.globalAlpha = 1;

    // the pointer's light: eases toward the pointer, fades when it rests
    light.x += (light.tx - light.x) * 0.12;
    light.y += (light.ty - light.y) * 0.12;
    const idle = now - light.lastMove;
    const target = idle < 120 ? 1 : 0;
    light.k += (target - light.k) * (target ? 0.08 : 0.015);
    if (light.k > 0.01) {
      litx.setTransform(1, 0, 0, 1, 0, 0);
      litx.globalCompositeOperation = "source-over";
      litx.clearRect(0, 0, lit.width, lit.height);
      litx.drawImage(layer, 0, 0);
      litx.globalCompositeOperation = "destination-in";
      const R = LIGHT_R * dpr;
      const g = litx.createRadialGradient(light.x * dpr, light.y * dpr, 0, light.x * dpr, light.y * dpr, R);
      g.addColorStop(0, `rgba(0,0,0,${light.k})`);
      g.addColorStop(0.5, `rgba(0,0,0,${light.k * 0.4})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      litx.fillStyle = g;
      litx.fillRect(0, 0, lit.width, lit.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(lit, 0, 0);
      ctx.drawImage(lit, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "lighter";
    for (let i = streaks.length - 1; i >= 0; i--) if (!drawStreak(streaks[i], now)) streaks.splice(i, 1);
    ctx.globalCompositeOperation = "source-over";

    if (!reduced) raf = requestAnimationFrame(frame);
  };

  const launch = ({ x, y, power = 1 }: LaunchOptions) => {
    // the headline sits to the left, so every flight leans east, away from it
    const room = Math.max(w - x, w * 0.45); // on phones it arcs out past the edge
    const j = Math.random();
    const s: Streak = {
      p0: { x, y },
      p1: { x: x + room * (0.14 + j * 0.06), y: y * 0.55 },
      p2: { x: x + room * (0.32 + j * 0.12), y: y * (0.1 + j * 0.06) },
      p3: { x: x + room * (0.7 + j * 0.25), y: -h * 0.12 },
      born: performance.now(),
      climb: 4200 + j * 1200,
      gapAt: 0.6 + j * 0.06,
      power,
    };
    streaks.push(s);
    if (streaks.length > MAX_STREAKS) streaks.shift();
    if (reduced) frame(performance.now());
  };

  const onMove = (e: PointerEvent) => {
    if (light.tx < -999) { light.x = e.clientX; light.y = e.clientY; }
    light.tx = e.clientX;
    light.ty = e.clientY;
    light.lastMove = performance.now();
  };

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onMove);
  if (reduced) frame(performance.now());
  else raf = requestAnimationFrame(frame);

  return {
    launch,
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    },
  };
}

export type Sky = NonNullable<ReturnType<typeof createSky>>;
