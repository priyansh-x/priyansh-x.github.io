import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_DISTANCE = 400;

const HandsIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const startY = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (startY.current === null) startY.current = window.scrollY;
    const delta = window.scrollY - startY.current;
    const p = Math.min(1, Math.max(0, delta / SCROLL_DISTANCE));
    setProgress(p);
    if (p >= 1 && !done) {
      setDone(true);
      onComplete();
    }
  }, [done, onComplete]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (done) return null;

  const pull = progress * 250;
  const opacity = 1 - progress;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      style={{
        opacity,
        pointerEvents: progress > 0.9 ? "none" : "auto",
      }}
    >
      <div
        className="absolute bottom-8 text-[11px] tracking-[0.2em] uppercase"
        style={{
          opacity: Math.max(0, 1 - progress * 4),
          color: "hsl(0 0% 25%)",
        }}
      >
        scroll
      </div>

      {/* Container sized to the image's natural aspect ratio (605:201 ≈ 3:1) */}
      <div className="relative w-[80vw] max-w-[700px] aspect-[605/201]">
        {/* Left half — Adam's hand, clips right edge at 50% */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
          style={{ transform: `translateX(${-pull}px)` }}
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
          style={{ transform: `translateX(${pull}px)` }}
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
