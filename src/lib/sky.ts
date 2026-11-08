// A night sky over a launch site, drawn on one canvas.
//  - stars that drift a little against the pointer (parallax)
//  - the pointer burns like an engine: sparks that cool into smoke
//  - rockets: a bright point that ignites, climbs, and leaves a plume

type Particle = {
  x: number; y: number; vx: number; vy: number;
  age: number; life: number; size: number; smoke: boolean; dim: number;
};

type Star = { x: number; y: number; depth: number; alpha: number; phase: number };

export type LaunchOptions = {
  x: number;
  y: number;
  /** radius of the bright head, px */
  r?: number;
  /** seconds of ground smoke before lift-off */
  ignite?: number;
  /** 0..1 brightness */
  dim?: number;
  onDone?: () => void;
};

type Rocket = Required<Omit<LaunchOptions, "onDone">> & {
  vy: number; t: number; done: boolean; onDone?: () => void;
};

const MAX_PARTICLES = 1600;

export function createSky(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // soft round sprite for smoke: drawn once, stamped many times
  const puff = document.createElement("canvas");
  puff.width = puff.height = 64;
  const pctx = puff.getContext("2d");
  if (pctx) {
    const g = pctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.45)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    pctx.fillStyle = g;
    pctx.fillRect(0, 0, 64, 64);
  }

  let w = 0, h = 0, dpr = 1;
  let stars: Star[] = [];
  const parts: Particle[] = [];
  const rockets: Rocket[] = [];
  const pointer = { x: 0.5, y: 0.5, sx: 0.5, sy: 0.5 };
  let raf = 0, lastT = performance.now();

  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const n = Math.round((w * h) / 5200);
    stars = Array.from({ length: n }, () => ({
      x: Math.random(),
      y: Math.random(),
      depth: 0.15 + Math.random() ** 2 * 0.85,
      alpha: 0.12 + Math.random() ** 3 * 0.7,
      phase: Math.random() * Math.PI * 2,
    }));
  };

  const emit = (p: Omit<Particle, "age">) => {
    if (parts.length >= MAX_PARTICLES) parts.shift();
    parts.push({ ...p, age: 0 });
  };

  const rand = (a: number, b: number) => a + Math.random() * (b - a);

  /** engine burn along a segment, thrust pointing (dx, dy) */
  const burn = (x: number, y: number, dx: number, dy: number, power: number, dim = 1) => {
    const n = Math.min(10, Math.ceil(power));
    for (let i = 0; i < n; i++) {
      const spread = rand(-0.35, 0.35);
      const cos = Math.cos(spread), sin = Math.sin(spread);
      const ex = -(dx * cos - dy * sin), ey = -(dx * sin + dy * cos);
      const speed = rand(60, 220);
      emit({ x, y, vx: ex * speed, vy: ey * speed, life: rand(0.25, 0.6), size: rand(0.8, 1.8), smoke: false, dim });
      if (Math.random() < 0.5)
        emit({ x, y, vx: ex * speed * 0.35 + rand(-15, 15), vy: ey * speed * 0.35 + rand(-15, 15),
          life: rand(1.2, 2.6), size: rand(3, 7), smoke: true, dim });
    }
  };

  const launch = (o: LaunchOptions) => {
    rockets.push({ x: o.x, y: o.y, r: o.r ?? 2, ignite: o.ignite ?? 0.35, dim: o.dim ?? 1,
      vy: 0, t: 0, done: false, onDone: o.onDone });
  };

  const step = (dt: number) => {
    // pointer parallax eases toward the real pointer
    pointer.sx += (pointer.x - pointer.sx) * Math.min(1, dt * 3);
    pointer.sy += (pointer.y - pointer.sy) * Math.min(1, dt * 3);

    for (const r of rockets) {
      r.t += dt;
      const base = r.y + r.r;
      if (r.t < r.ignite) {
        // ignition: smoke rolling out sideways from the pad
        for (let i = 0; i < 3; i++) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          emit({ x: r.x + rand(-r.r, r.r), y: base, vx: dir * rand(20, 140) * (r.r / 2), vy: rand(-25, 5),
            life: rand(1.2, 2.4), size: rand(2, 5) * Math.max(1, r.r / 3), smoke: true, dim: r.dim });
        }
        emit({ x: r.x, y: base, vx: rand(-10, 10), vy: rand(20, 80), life: rand(0.1, 0.25), size: rand(1, 2) * Math.max(1, r.r / 3), smoke: false, dim: r.dim });
      } else {
        r.vy -= 520 * Math.max(1, r.r / 4) * dt;
        r.y += r.vy * dt;
        burn(r.x, r.y + r.r, 0, -1, 3 + Math.min(5, -r.vy / 120), r.dim);
        if (r.y < -60 && !r.done) {
          r.done = true;
          r.onDone?.();
        }
      }
    }
    for (let i = rockets.length - 1; i >= 0; i--) if (rockets[i].done) rockets.splice(i, 1);

    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.age += dt / p.life;
      if (p.age >= 1) { parts.splice(i, 1); continue; }
      const drag = p.smoke ? 0.965 : 0.94;
      p.vx *= drag; p.vy *= drag;
      if (p.smoke) p.vy -= 6 * dt; // smoke lifts a little
      p.x += p.vx * dt; p.y += p.vy * dt;
    }
  };

  const draw = (now: number) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = "lighter";
    const ox = (pointer.sx - 0.5) * -40, oy = (pointer.sy - 0.5) * -28;
    for (const s of stars) {
      const tw = 0.65 + 0.35 * Math.sin(now / 900 + s.phase);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha * tw})`;
      const x = ((s.x * w + ox * s.depth) % w + w) % w;
      const y = ((s.y * h + oy * s.depth) % h + h) % h;
      const size = 0.6 + s.depth * 1.1;
      ctx.fillRect(x, y, size, size);
    }

    for (const p of parts) {
      const k = 1 - p.age;
      if (p.smoke) {
        const rad = p.size * (1.6 + p.age * 4);
        ctx.globalAlpha = 0.09 * k * p.dim;
        ctx.drawImage(puff, p.x - rad, p.y - rad, rad * 2, rad * 2);
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle = `rgba(255,255,255,${k * k * 0.9 * p.dim})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (0.5 + k * 0.5), 0, Math.PI * 2); ctx.fill();
      }
    }

    for (const r of rockets) {
      // glow, then the hot point itself
      const g = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.r * 6);
      g.addColorStop(0, `rgba(255,255,255,${0.35 * r.dim})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(r.x, r.y, r.r * 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${r.dim})`;
      ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); ctx.fill();
    }
  };

  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    step(dt);
    draw(now);
    raf = requestAnimationFrame(frame);
  };

  let last: { x: number; y: number } | null = null;
  const onMove = (e: PointerEvent) => {
    pointer.x = e.clientX / w;
    pointer.y = e.clientY / h;
    const p = { x: e.clientX, y: e.clientY };
    if (last) {
      const dx = p.x - last.x, dy = p.y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.5) {
        const steps = Math.min(6, Math.ceil(dist / 10));
        for (let k = 1; k <= steps; k++)
          burn(last.x + (dx * k) / steps, last.y + (dy * k) / steps, dx / dist, dy / dist, Math.min(3, dist / 8 / steps + 0.5));
      }
    }
    last = p;
  };
  const onLeave = () => { last = null; };
  const onDown = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest("a")) return;
    launch({ x: e.clientX, y: h + 4, r: 2.2, ignite: 0.25 });
  };

  const ambient = window.setInterval(() => {
    if (!document.hidden) launch({ x: rand(0.1, 0.9) * w, y: h + 4, r: 1.2, ignite: 0.4, dim: 0.45 });
  }, 9000);

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerdown", onDown);
  document.addEventListener("pointerleave", onLeave);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) draw(0);
  else raf = requestAnimationFrame(frame);

  return {
    launch: (o: LaunchOptions) => (reduced ? o.onDone?.() : launch(o)),
    destroy() {
      cancelAnimationFrame(raf);
      window.clearInterval(ambient);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    },
  };
}

export type Sky = NonNullable<ReturnType<typeof createSky>>;
