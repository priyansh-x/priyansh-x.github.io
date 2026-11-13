import type { CSSProperties } from "react";
import type { Ink as InkData } from "@/lib/scrawl";

// seconds of pen time per unit of stroke (cap height is 10 units)
const SPEED = 0.0055;

export const timeline = (ink: InkData, rate = 1) => {
  let t = 0;
  const steps = ink.strokes.map((s) => {
    t += s.pause / rate;
    const start = t;
    const dur = (0.04 + s.length * SPEED) / rate;
    t += dur;
    return { start, dur };
  });
  return { steps, total: t };
};

type Props = {
  ink: InkData;
  /** seconds before the pen starts */
  delay?: number;
  /** how fast the pen moves, 1 = normal */
  rate?: number;
  /** fixed drawing box, for doodles that swap parts */
  viewBox?: { x: number; y: number; w: number; h: number };
  className?: string;
  style?: CSSProperties;
};

/** Draws strokes as if written by hand, one after another. 10 units = 1em. */
const Ink = ({ ink, delay = 0, rate = 1, viewBox, className, style }: Props) => {
  const box = viewBox ?? ink.box;
  const { steps } = timeline(ink, rate);
  return (
    <svg
      className={`ink${className ? ` ${className}` : ""}`}
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      style={{ width: `${box.w / 10}em`, height: `${box.h / 10}em`, ...style }}
      aria-hidden="true"
      focusable="false"
    >
      {ink.strokes.map((s, i) => (
        <path
          key={i}
          d={s.d}
          pathLength={1}
          style={{ animationDelay: `${delay + steps[i].start}s`, animationDuration: `${steps[i].dur}s` }}
        />
      ))}
    </svg>
  );
};

export default Ink;
