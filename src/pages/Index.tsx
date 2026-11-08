import { useEffect, useRef } from "react";
import Sky, { type SkyHandle } from "@/components/Sky";

const LINE = "I want to do hard things.";
// Two lines, always: "I want to do" / "hard things."
const LINES = [["I", "want", "to", "do"], ["hard", "things"]];

const icon = (d: string, stroke = false) => (
  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"
    fill={stroke ? "none" : "currentColor"} stroke={stroke ? "currentColor" : undefined} strokeWidth={stroke ? 1.6 : undefined}>
    <path d={d} />
  </svg>
);

const links = [
  { label: "GitHub", href: "https://github.com/priyansh-x",
    svg: icon("M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z") },
  { label: "X", href: "https://x.com/otziiz",
    svg: icon("M18.244 2H21.5l-7.5 8.572L22.5 22h-6.844l-5.36-7.01L4.16 22H.9l8.02-9.166L.5 2h7.02l4.84 6.39L18.244 2zm-1.2 18h1.86L7.04 4H5.06l11.984 16z") },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/priyansh-joshi-206658273/",
    svg: icon("M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V9h3v10zM6.5 7.7a1.7 1.7 0 110-3.5 1.7 1.7 0 010 3.5zM19 19h-3v-5c0-1.2-.5-2-1.6-2-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8v5h-3V9h3v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4.1V19z") },
  { label: "Email", href: "mailto:f20250479@pilani.bits-pilani.ac.in",
    svg: icon("M3 5h18v14H3zM3 7l9 6 9-6", true) },
];

const Index = () => {
  const sky = useRef<SkyHandle>(null);
  const stop = useRef<HTMLSpanElement>(null);

  // The full stop is the launch pad. Once the line has landed, something
  // lifts off from it; every click after that sends up another.
  useEffect(() => {
    const fire = (power = 1) => {
      const el = stop.current;
      if (!el || !sky.current) return;
      const r = el.getBoundingClientRect();
      sky.current.launch({ x: r.left + r.width * 0.4, y: r.top + r.height * 0.74, power });
    };
    const id = window.setTimeout(() => fire(1), 1900);
    const onDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest("a")) fire(0.85);
    };
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <main className="page">
      <Sky ref={sky} />
      <div className="grain" aria-hidden="true" />

      <h1 className="line" aria-label={LINE}>
        {LINES.map((words, l) => (
          <span key={l}>
            {words.map((word, w) => (
              <span key={w} className="word" style={{ animationDelay: `${0.15 + (l * 4 + w) * 0.12}s` }} aria-hidden="true">
                {word}
                {word === "things" && <span ref={stop}>.</span>}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <nav className="links" aria-label="Elsewhere">
        {links.map((l) => (
          <a key={l.label} href={l.href} aria-label={l.label} title={l.label}
            target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            {l.svg}
          </a>
        ))}
      </nav>
    </main>
  );
};

export default Index;
