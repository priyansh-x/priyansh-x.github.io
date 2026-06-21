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

  const pull = progress * 80;
  const opacity = 1 - progress;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      style={{
        opacity,
        pointerEvents: progress > 0.9 ? "none" : "auto",
      }}
    >
      {/* Scroll hint */}
      <div
        className="absolute bottom-8 text-faint text-[11px] tracking-widest uppercase"
        style={{ opacity: Math.max(0, 1 - progress * 4) }}
      >
        scroll
      </div>

      <div className="relative w-full max-w-[700px] h-[300px] mx-8">
        {/* Left hand */}
        <svg
          viewBox="0 0 400 300"
          className="absolute top-0 h-full"
          style={{
            right: "50%",
            width: "50%",
            transform: `translateX(${12 - pull}px)`,
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="hsl(0 0% 25%)" strokeWidth="0.8" fill="none">
            <polygon points="20,180 20,130 80,115 120,110 120,175" />
            <polygon points="120,110 160,105 160,165 120,175" />
            <polygon points="160,105 210,95 240,100 250,120 245,155 210,165 160,165" />
            <polygon points="210,95 240,100 230,95 210,88" />
            <polygon points="170,165 185,185 200,190 210,180 210,165" />
            <polygon points="200,190 215,195 220,188 210,180" />
            <polygon points="250,120 280,108 310,100 340,97 355,100 355,110 340,112 310,115 280,120 250,130" />
            <polygon points="355,100 375,98 385,102 385,112 375,114 355,110" />
            <polygon points="248,130 278,125 310,122 342,122 355,128 355,138 342,138 310,137 278,140 248,145" />
            <polygon points="355,128 372,127 382,132 382,142 372,143 355,138" />
            <polygon points="245,145 270,143 300,142 325,145 338,150 338,160 325,160 300,158 270,158 245,155" />
            <polygon points="240,155 258,156 280,158 298,162 308,168 308,176 298,176 280,173 258,170 240,165" />
            <line x1="180" y1="115" x2="200" y2="150" opacity="0.4" />
            <line x1="200" y1="108" x2="220" y2="145" opacity="0.4" />
            <line x1="160" y1="135" x2="245" y2="135" opacity="0.2" />
            <line x1="80" y1="145" x2="160" y2="135" opacity="0.2" />
            <circle cx="100" cy="100" r="1.2" fill="hsl(0 0% 20%)" stroke="none" />
            <circle cx="140" cy="90" r="1" fill="hsl(0 0% 20%)" stroke="none" />
            <circle cx="60" cy="105" r="1" fill="hsl(0 0% 18%)" stroke="none" />
            <line x1="100" y1="100" x2="140" y2="90" stroke="hsl(0 0% 15%)" strokeWidth="0.4" />
            <line x1="60" y1="105" x2="100" y2="100" stroke="hsl(0 0% 15%)" strokeWidth="0.4" />
            <line x1="140" y1="90" x2="160" y2="105" stroke="hsl(0 0% 15%)" strokeWidth="0.4" />
            <polygon points="30,120 60,105 80,115" stroke="hsl(0 0% 15%)" strokeWidth="0.4" fill="none" />
            <polygon points="130,95 160,105 140,90" stroke="hsl(0 0% 15%)" strokeWidth="0.4" fill="none" />
          </g>
        </svg>

        {/* Right hand */}
        <svg
          viewBox="0 0 400 300"
          className="absolute top-0 h-full"
          style={{
            left: "50%",
            width: "50%",
            transform: `translateX(${-12 + pull}px) scaleX(-1)`,
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="hsl(0 0% 25%)" strokeWidth="0.8" fill="none">
            <polygon points="20,170 20,125 80,115 120,112 120,165" />
            <polygon points="120,112 160,108 160,158 120,165" />
            <polygon points="160,108 210,100 240,108 252,125 248,155 210,162 160,158" />
            <polygon points="210,100 235,102 228,96 210,92" />
            <polygon points="175,158 188,178 202,182 212,172 210,162" />
            <polygon points="252,118 282,108 315,102 348,100 368,104 368,114 348,115 315,117 282,122 252,130" />
            <polygon points="368,104 388,103 398,108 398,118 388,118 368,114" />
            <polygon points="250,132 275,130 300,132 318,138 328,145 325,155 318,155 300,148 275,145 250,145" />
            <polygon points="246,148 268,150 288,155 302,162 305,172 298,175 288,170 268,164 246,158" />
            <polygon points="238,158 255,162 272,168 282,176 282,184 275,186 265,180 255,174 238,168" />
            <line x1="185" y1="118" x2="205" y2="148" opacity="0.4" />
            <line x1="205" y1="112" x2="225" y2="142" opacity="0.4" />
            <line x1="160" y1="133" x2="248" y2="133" opacity="0.2" />
            <line x1="80" y1="140" x2="160" y2="133" opacity="0.2" />
            <circle cx="95" cy="102" r="1.2" fill="hsl(0 0% 20%)" stroke="none" />
            <circle cx="135" cy="95" r="1" fill="hsl(0 0% 20%)" stroke="none" />
            <circle cx="55" cy="108" r="1" fill="hsl(0 0% 18%)" stroke="none" />
            <line x1="95" y1="102" x2="135" y2="95" stroke="hsl(0 0% 15%)" strokeWidth="0.4" />
            <line x1="55" y1="108" x2="95" y2="102" stroke="hsl(0 0% 15%)" strokeWidth="0.4" />
            <line x1="135" y1="95" x2="160" y2="108" stroke="hsl(0 0% 15%)" strokeWidth="0.4" />
            <polygon points="30,118 55,108 80,115" stroke="hsl(0 0% 15%)" strokeWidth="0.4" fill="none" />
            <polygon points="125,98 160,108 135,95" stroke="hsl(0 0% 15%)" strokeWidth="0.4" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default HandsIntro;
