import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_DISTANCE = 400;

// Smooth ease-in-out so the pull-apart accelerates then settles.
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const HandsIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const startY = useRef<number | null>(null);
  const finished = useRef(false);

  const handleScroll = useCallback(() => {
    if (finished.current) return;
    if (startY.current === null) startY.current = window.scrollY;
    const delta = window.scrollY - startY.current;
    const p = Math.min(1, Math.max(0, delta / SCROLL_DISTANCE));
    setProgress(p);
    if (p >= 1) {
      finished.current = true;
      onComplete();
      // Let the overlay finish a gentle fade/zoom before it unmounts.
      setLeaving(true);
      window.setTimeout(() => setDone(true), 700);
    }
  }, [onComplete]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (done) return null;

  const eased = easeInOut(progress);
  const pull = eased * 55; // in vw, so the halves slide fully off-screen
  // Fade the whole overlay, easing out and completing the last stretch during `leaving`.
  const opacity = leaving ? 0 : 1 - eased;
  // Subtle zoom so the reveal feels like stepping into the page rather than a hard cut.
  const scale = 1 + eased * 0.08 + (leaving ? 0.06 : 0);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundColor: "#000",
        opacity,
        transition: leaving ? "opacity 700ms ease-out" : "none",
        pointerEvents: progress > 0.9 ? "none" : "auto",
      }}
    >
      <div
        className="absolute bottom-8 text-[11px] tracking-[0.2em] uppercase"
        style={{
          opacity: Math.max(0, 1 - progress * 4),
          color: "hsl(0 0% 45%)",
        }}
      >
        scroll
      </div>

      {/* Container spans the full viewport width, sized to the image's natural aspect ratio (740:416) */}
      <div
        className="relative w-screen aspect-[740/416]"
        style={{
          transform: `scale(${scale})`,
          transition: leaving ? "transform 700ms ease-out" : "none",
        }}
      >
        {/* Left half — Adam's hand, clips right edge at 50% */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
          style={{ transform: `translateX(${-pull}vw)` }}
        >
          <img
            src="/hands.webp"
            alt=""
            className="absolute top-0 left-0 w-[200%] h-full object-cover object-left"
            draggable={false}
          />
        </div>

        {/* Right half — God's hand, clips left edge at 50% */}
        <div
          className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
          style={{ transform: `translateX(${pull}vw)` }}
        >
          <img
            src="/hands.webp"
            alt=""
            className="absolute top-0 right-0 w-[200%] h-full object-cover object-right"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default HandsIntro;
