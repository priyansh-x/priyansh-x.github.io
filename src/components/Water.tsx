import { useEffect, useRef } from "react";

// Dark water: a small height-field wave simulation, drawn as faint light
// glinting off ripples. The pointer stirs it; it sleeps when the surface is still.
const CELL = 5; // screen px per simulation cell
const DAMPING = 0.985;

const Water = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0, h = 0;
    let cur = new Float32Array(0), prev = new Float32Array(0);
    let img: ImageData;
    let raf = 0, still = 0, running = false;
    let last: { x: number; y: number } | null = null;

    const resize = () => {
      w = Math.ceil(window.innerWidth / CELL) + 2;
      h = Math.ceil(window.innerHeight / CELL) + 2;
      canvas.width = w;
      canvas.height = h;
      cur = new Float32Array(w * h);
      prev = new Float32Array(w * h);
      img = ctx.createImageData(w, h);
      for (let i = 3; i < img.data.length; i += 4) img.data[i] = 255;
    };

    const drop = (sx: number, sy: number, strength: number, r = 2) => {
      const cx = Math.round(sx / CELL) + 1, cy = Math.round(sy / CELL) + 1;
      for (let y = -r; y <= r; y++)
        for (let x = -r; x <= r; x++) {
          const px = cx + x, py = cy + y;
          if (px < 1 || py < 1 || px >= w - 1 || py >= h - 1) continue;
          const d = Math.sqrt(x * x + y * y);
          if (d <= r) cur[py * w + px] += strength * Math.cos((d / r) * Math.PI * 0.5);
        }
      wake();
    };

    const step = () => {
      let energy = 0;
      for (let y = 1; y < h - 1; y++)
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          const v = ((cur[i - 1] + cur[i + 1] + cur[i - w] + cur[i + w]) / 2 - prev[i]) * DAMPING;
          prev[i] = v;
          energy += v < 0 ? -v : v;
        }
      [cur, prev] = [prev, cur];

      const d = img.data;
      for (let y = 1; y < h - 1; y++)
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          const slope = (cur[i - 1] - cur[i + 1]) + (cur[i - w] - cur[i + w]);
          const v = slope > 0 ? Math.min(90, slope * 0.9) : 0;
          const o = i * 4;
          d[o] = d[o + 1] = d[o + 2] = v;
        }
      ctx.putImageData(img, 0, 0);
      return energy / (w * h);
    };

    const loop = () => {
      still = step() < 0.02 ? still + 1 : 0;
      if (still > 30) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const wake = () => {
      if (running) return;
      running = true;
      still = 0;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const p = { x: e.clientX, y: e.clientY };
      if (last) {
        const dist = Math.hypot(p.x - last.x, p.y - last.y);
        const n = Math.min(8, Math.ceil(dist / (CELL * 3)));
        for (let k = 1; k <= n; k++)
          drop(last.x + ((p.x - last.x) * k) / n, last.y + ((p.y - last.y) * k) / n, 60);
      }
      last = p;
    };
    const onLeave = () => { last = null; };
    const onDown = (e: PointerEvent) => drop(e.clientX, e.clientY, 500, 4);

    // A slow drip now and then, so the surface hints that it's alive.
    const drip = window.setInterval(() => {
      if (!document.hidden) drop(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 260, 3);
    }, 3500);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(drip);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="water" aria-hidden="true" />;
};

export default Water;
