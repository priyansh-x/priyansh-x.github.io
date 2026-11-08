// A long-exposure night sky with a gravitational lens on the cursor.
//
//  - Star trails: every star sweeps the same angle around a pole above the
//    frame, as in one long exposure. The sky turns, very slowly.
//  - The pointer is a point mass. Light passing near it bends: each trail
//    point is moved to where a point-mass lens would show it, so trails
//    part around the cursor, and their faint inner images wrap into an
//    Einstein ring. Lensed light is also magnified, so it brightens.

type Star = { r: number; a: number; width: number; alpha: number };
type Pt = { x: number; y: number };

const TRAIL = 0.26;     // radians every star sweeps (the exposure)
const SPIN = 0.0035;    // radians per second the sky turns
const BREAK = 46;       // px; longer mapped segments are skipped (image flips)

export function createSky(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  let w = 0, h = 0, dpr = 1, ring = 70;
  let pole: Pt = { x: 0, y: 0 };
  let stars: Star[] = [];
  const lens = { x: 0, y: 0, tx: 0, ty: 0, k: 0, on: false, seen: false };
  let raf = 0;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ring = Math.max(58, Math.min(110, Math.min(w, h) * 0.12));
    pole = { x: w * 0.86, y: -h * 0.22 };
    const reach = Math.hypot(Math.max(pole.x, w - pole.x), h - pole.y) * 1.05;
    const n = Math.round(Math.min(1100, (w * h) / 1000));
    stars = Array.from({ length: n }, () => {
      const bright = Math.random() ** 4; // a few bright, many faint
      return {
        r: reach * Math.sqrt(0.02 + Math.random() * 0.98),
        a: Math.random() * Math.PI * 2,
        width: 0.45 + bright * 1.1,
        alpha: (0.12 + bright * 0.8) * 0.55,
      };
    });
  };

  // where a point-mass lens shows a source at p (primary, or the inner image)
  const image = (px: number, py: number, inner: boolean, E: number): Pt => {
    const dx = px - lens.x, dy = py - lens.y;
    const b = Math.hypot(dx, dy) || 0.001;
    const root = Math.sqrt(b * b + 4 * E * E);
    const t = inner ? (b - root) / 2 : (b + root) / 2;
    return { x: lens.x + (dx / b) * t, y: lens.y + (dy / b) * t };
  };

  const strokeMapped = (pts: Pt[]) => {
    ctx.beginPath();
    let pen = false;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (pen && Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y) > BREAK) pen = false;
      if (pen) ctx.lineTo(p.x, p.y);
      else { ctx.moveTo(p.x, p.y); pen = true; }
    }
    ctx.stroke();
  };

  const frame = (now: number) => {
    lens.x += (lens.tx - lens.x) * 0.16;
    lens.y += (lens.ty - lens.y) * 0.16;
    lens.k += ((lens.on ? 1 : 0) - lens.k) * (lens.on ? 0.07 : 0.05);
    const E = ring * lens.k;
    const active = E > 0.5;
    const reach = ring * 7;
    const lensFromPole = Math.hypot(lens.x - pole.x, lens.y - pole.y);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const spin = reduced ? 0 : (now / 1000) * SPIN;
    for (const s of stars) {
      const start = s.a + spin;
      const near = active && Math.abs(s.r - lensFromPole) < reach;

      if (!near) {
        ctx.strokeStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.arc(pole.x, pole.y, s.r, start, start + TRAIL);
        ctx.stroke();
        continue;
      }

      const segs = Math.max(8, Math.min(90, Math.ceil((s.r * TRAIL) / 5)));
      const src: Pt[] = [];
      let closest = Infinity;
      for (let i = 0; i <= segs; i++) {
        const a = start + (TRAIL * i) / segs;
        const x = pole.x + Math.cos(a) * s.r, y = pole.y + Math.sin(a) * s.r;
        src.push({ x, y });
        closest = Math.min(closest, Math.hypot(x - lens.x, y - lens.y));
      }

      // lensed light is magnified: brighter the closer it passes
      const boost = 1 + 2.2 * Math.exp(-((closest / (E * 2.2)) ** 2));
      ctx.lineWidth = s.width;
      ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, s.alpha * boost)})`;
      strokeMapped(src.map((p) => image(p.x, p.y, false, E)));

      // the faint inner image only matters close in, where it forms the ring
      if (closest < E * 3) {
        ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, s.alpha * boost * 0.55)})`;
        strokeMapped(src.map((p) => image(p.x, p.y, true, E)));
      }
    }

    // the mass itself: a disc darker than anything behind it
    if (active) {
      const g = ctx.createRadialGradient(lens.x, lens.y, 0, lens.x, lens.y, E * 0.62);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.8, "rgba(0,0,0,0.95)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(lens.x, lens.y, E * 0.62, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(frame);
  };

  const place = (e: PointerEvent) => {
    lens.tx = e.clientX;
    lens.ty = e.clientY;
    if (!lens.seen) { lens.x = lens.tx; lens.y = lens.ty; lens.seen = true; }
  };
  const onMove = (e: PointerEvent) => {
    place(e);
    // a mouse lenses while it hovers; a finger only while it touches
    if (e.pointerType === "mouse" || e.buttons) lens.on = true;
  };
  const onDown = (e: PointerEvent) => { place(e); lens.on = true; };
  const onUp = (e: PointerEvent) => { if (e.pointerType !== "mouse") lens.on = false; };
  const onLeave = () => { lens.on = false; };

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerdown", onDown);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
  window.addEventListener("blur", onLeave);
  document.documentElement.addEventListener("pointerleave", onLeave);
  raf = requestAnimationFrame(frame);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    },
  };
}
