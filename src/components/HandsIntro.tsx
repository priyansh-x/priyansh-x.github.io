import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_DISTANCE = 400;

const LeftHand = () => (
  <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <g stroke="hsl(0 0% 30%)" strokeWidth="0.6" strokeLinejoin="round">
      {/* Wrist / forearm */}
      <polygon points="10,220 10,160 45,148 80,140 80,210" fill="hsl(0 0% 4%)" />
      <polygon points="80,140 130,132 130,200 80,210" fill="hsl(0 0% 5%)" />
      <polygon points="130,132 175,125 175,190 130,200" fill="hsl(0 0% 4%)" />
      {/* Wrist detail triangles */}
      <polygon points="10,160 45,148 30,155" fill="hsl(0 0% 6%)" />
      <polygon points="45,148 80,140 65,150" fill="hsl(0 0% 5%)" />
      <polygon points="80,210 130,200 105,208" fill="hsl(0 0% 6%)" />

      {/* Palm - main mass */}
      <polygon points="175,125 220,115 260,112 260,140 220,135 175,130" fill="hsl(0 0% 6%)" />
      <polygon points="175,130 220,135 260,140 290,148 290,180 260,185 220,188 175,190" fill="hsl(0 0% 5%)" />
      <polygon points="260,112 290,115 310,125 290,148 260,140" fill="hsl(0 0% 7%)" />
      <polygon points="290,148 310,125 320,140 315,165 290,180" fill="hsl(0 0% 6%)" />
      {/* Palm inner triangulation */}
      <polygon points="175,130 220,135 200,160" fill="hsl(0 0% 5%)" />
      <polygon points="200,160 220,135 260,140" fill="hsl(0 0% 6%)" />
      <polygon points="200,160 260,140 250,170" fill="hsl(0 0% 5%)" />
      <polygon points="250,170 260,140 290,148" fill="hsl(0 0% 7%)" />
      <polygon points="250,170 290,148 290,180" fill="hsl(0 0% 6%)" />
      <polygon points="200,160 250,170 220,188" fill="hsl(0 0% 5%)" />
      <polygon points="175,190 200,160 220,188" fill="hsl(0 0% 6%)" />

      {/* Thumb - drooping down from palm */}
      <polygon points="185,190 200,210 215,225 225,220 215,205 200,190" fill="hsl(0 0% 6%)" />
      <polygon points="215,225 235,238 245,232 225,220" fill="hsl(0 0% 5%)" />
      <polygon points="235,238 250,245 258,238 245,232" fill="hsl(0 0% 7%)" />
      {/* Thumb side facets */}
      <polygon points="185,190 200,190 195,200" fill="hsl(0 0% 5%)" />
      <polygon points="215,225 225,220 235,238" fill="hsl(0 0% 6%)" />

      {/* Index finger - extended, reaching */}
      <polygon points="315,165 340,155 365,148 340,143 315,148 310,125 320,140" fill="hsl(0 0% 6%)" />
      <polygon points="315,148 340,143 365,148 390,145 390,155 365,158 340,155 315,165" fill="hsl(0 0% 5%)" />
      <polygon points="390,145 420,142 445,140 445,150 420,152 390,155" fill="hsl(0 0% 6%)" />
      <polygon points="445,140 470,138 490,140 490,150 470,152 445,150" fill="hsl(0 0% 7%)" />
      <polygon points="490,140 510,140 525,143 530,148 525,153 510,155 490,150" fill="hsl(0 0% 6%)" />
      {/* Index finger top facets */}
      <polygon points="365,148 390,145 378,140" fill="hsl(0 0% 8%)" />
      <polygon points="445,140 470,138 458,136" fill="hsl(0 0% 7%)" />
      <polygon points="510,140 525,143 518,138" fill="hsl(0 0% 8%)" />
      {/* Index fingertip */}
      <polygon points="530,148 540,150 535,155 525,153" fill="hsl(0 0% 5%)" />

      {/* Middle finger - slightly relaxed */}
      <polygon points="310,165 335,162 360,160 385,162 385,172 360,174 335,175 310,178" fill="hsl(0 0% 5%)" />
      <polygon points="385,162 415,160 440,162 440,172 415,175 385,172" fill="hsl(0 0% 6%)" />
      <polygon points="440,162 462,164 478,168 478,178 462,180 440,172" fill="hsl(0 0% 7%)" />
      <polygon points="478,168 495,172 502,178 495,185 478,178" fill="hsl(0 0% 6%)" />
      {/* Middle finger facets */}
      <polygon points="335,162 360,160 348,158" fill="hsl(0 0% 7%)" />
      <polygon points="415,160 440,162 428,158" fill="hsl(0 0% 8%)" />

      {/* Ring finger - more relaxed, curving down */}
      <polygon points="305,178 328,178 350,180 372,185 372,195 350,196 328,194 305,192" fill="hsl(0 0% 6%)" />
      <polygon points="372,185 395,190 415,196 415,206 395,204 372,195" fill="hsl(0 0% 5%)" />
      <polygon points="415,196 432,202 440,210 432,215 415,206" fill="hsl(0 0% 7%)" />
      {/* Ring finger facets */}
      <polygon points="328,178 350,180 340,176" fill="hsl(0 0% 7%)" />

      {/* Pinky - most relaxed, curling */}
      <polygon points="295,192 315,194 335,198 352,205 352,215 335,214 315,210 295,206" fill="hsl(0 0% 5%)" />
      <polygon points="352,205 370,212 382,220 378,228 370,225 352,215" fill="hsl(0 0% 6%)" />
      {/* Pinky facets */}
      <polygon points="315,194 335,198 326,192" fill="hsl(0 0% 7%)" />

      {/* Knuckle highlights */}
      <polygon points="310,125 320,140 315,148 305,135" fill="hsl(0 0% 8%)" />
      <polygon points="305,165 315,165 310,178 300,172" fill="hsl(0 0% 7%)" />
      <polygon points="295,180 305,178 305,192 295,188" fill="hsl(0 0% 8%)" />
    </g>

    {/* Wireframe scatter - floating geometric nodes */}
    <g stroke="hsl(0 0% 15%)" strokeWidth="0.4" fill="none">
      <line x1="30" y1="130" x2="65" y2="120" />
      <line x1="65" y1="120" x2="100" y2="115" />
      <line x1="30" y1="130" x2="50" y2="110" />
      <line x1="50" y1="110" x2="100" y2="115" />
      <polygon points="120,108 150,100 140,115" />
      <polygon points="240,95 270,90 260,105" />
      <line x1="270" y1="90" x2="310" y2="110" />
      <line x1="350" y1="128" x2="380" y2="120" />
      <line x1="380" y1="120" x2="420" y2="125" />
    </g>
    <g fill="hsl(0 0% 22%)" stroke="none">
      <circle cx="30" cy="130" r="1.5" />
      <circle cx="65" cy="120" r="1.2" />
      <circle cx="50" cy="110" r="1" />
      <circle cx="100" cy="115" r="1.3" />
      <circle cx="150" cy="100" r="1" />
      <circle cx="240" cy="95" r="1.2" />
      <circle cx="270" cy="90" r="1" />
      <circle cx="380" cy="120" r="1.2" />
      <circle cx="420" cy="125" r="1" />
    </g>
  </svg>
);

const RightHand = () => (
  <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ transform: "scaleY(-1) rotate(180deg)" }}>
    {/* Reuse similar structure but with pointing index, curled other fingers */}
    <g stroke="hsl(0 0% 30%)" strokeWidth="0.6" strokeLinejoin="round">
      {/* Wrist / forearm */}
      <polygon points="10,210 10,155 50,145 85,138 85,200" fill="hsl(0 0% 4%)" />
      <polygon points="85,138 135,130 135,192 85,200" fill="hsl(0 0% 5%)" />
      <polygon points="135,130 180,122 180,185 135,192" fill="hsl(0 0% 4%)" />
      {/* Wrist detail */}
      <polygon points="10,155 50,145 32,152" fill="hsl(0 0% 6%)" />
      <polygon points="50,145 85,138 68,148" fill="hsl(0 0% 5%)" />

      {/* Palm */}
      <polygon points="180,122 225,112 265,110 265,138 225,133 180,128" fill="hsl(0 0% 6%)" />
      <polygon points="180,128 225,133 265,138 295,145 295,175 265,180 225,183 180,185" fill="hsl(0 0% 5%)" />
      <polygon points="265,110 295,112 315,122 295,145 265,138" fill="hsl(0 0% 7%)" />
      <polygon points="295,145 315,122 325,138 320,160 295,175" fill="hsl(0 0% 6%)" />
      {/* Palm triangulation */}
      <polygon points="180,128 225,133 205,155" fill="hsl(0 0% 5%)" />
      <polygon points="205,155 225,133 265,138" fill="hsl(0 0% 6%)" />
      <polygon points="205,155 265,138 255,165" fill="hsl(0 0% 5%)" />
      <polygon points="255,165 265,138 295,145" fill="hsl(0 0% 7%)" />
      <polygon points="255,165 295,145 295,175" fill="hsl(0 0% 6%)" />

      {/* Thumb - below palm */}
      <polygon points="190,185 205,205 220,218 230,212 218,198 205,185" fill="hsl(0 0% 6%)" />
      <polygon points="220,218 238,228 248,222 230,212" fill="hsl(0 0% 5%)" />

      {/* Index finger - POINTING, fully extended */}
      <polygon points="320,160 345,150 370,143 345,138 320,142 315,122 325,138" fill="hsl(0 0% 6%)" />
      <polygon points="320,142 345,138 370,143 395,140 395,150 370,153 345,150 320,160" fill="hsl(0 0% 5%)" />
      <polygon points="395,140 425,137 455,135 455,145 425,147 395,150" fill="hsl(0 0% 6%)" />
      <polygon points="455,135 480,133 505,135 505,145 480,147 455,145" fill="hsl(0 0% 7%)" />
      <polygon points="505,135 525,135 542,138 548,143 542,148 525,150 505,145" fill="hsl(0 0% 6%)" />
      {/* Fingertip */}
      <polygon points="548,143 558,146 555,152 542,148" fill="hsl(0 0% 5%)" />
      {/* Top facets */}
      <polygon points="370,143 395,140 383,136" fill="hsl(0 0% 8%)" />
      <polygon points="455,135 480,133 468,130" fill="hsl(0 0% 7%)" />
      <polygon points="525,135 542,138 534,132" fill="hsl(0 0% 8%)" />

      {/* Middle finger - slightly curled down */}
      <polygon points="315,162 340,160 365,162 385,168 380,180 365,182 340,178 315,175" fill="hsl(0 0% 5%)" />
      <polygon points="385,168 408,175 425,185 420,195 408,190 380,180" fill="hsl(0 0% 6%)" />
      <polygon points="425,185 438,195 440,205 432,208 420,195" fill="hsl(0 0% 7%)" />

      {/* Ring finger - curled */}
      <polygon points="308,175 330,178 352,185 368,195 365,205 352,204 330,196 308,190" fill="hsl(0 0% 6%)" />
      <polygon points="368,195 385,208 390,218 382,222 365,205" fill="hsl(0 0% 5%)" />

      {/* Pinky - most curled */}
      <polygon points="300,190 318,195 338,205 350,215 348,225 335,222 318,212 300,205" fill="hsl(0 0% 5%)" />
      <polygon points="350,215 360,228 358,238 348,235 348,225" fill="hsl(0 0% 6%)" />

      {/* Knuckle highlights */}
      <polygon points="315,122 325,138 320,142 310,132" fill="hsl(0 0% 8%)" />
      <polygon points="308,162 318,162 315,175 305,168" fill="hsl(0 0% 7%)" />
    </g>

    {/* Wireframe scatter */}
    <g stroke="hsl(0 0% 15%)" strokeWidth="0.4" fill="none">
      <line x1="35" y1="128" x2="68" y2="118" />
      <line x1="68" y1="118" x2="105" y2="112" />
      <line x1="35" y1="128" x2="55" y2="108" />
      <line x1="55" y1="108" x2="105" y2="112" />
      <polygon points="125,105 155,98 145,112" />
      <polygon points="245,92 275,88 265,102" />
      <line x1="275" y1="88" x2="315" y2="108" />
      <line x1="360" y1="125" x2="390" y2="118" />
    </g>
    <g fill="hsl(0 0% 22%)" stroke="none">
      <circle cx="35" cy="128" r="1.5" />
      <circle cx="68" cy="118" r="1.2" />
      <circle cx="55" cy="108" r="1" />
      <circle cx="105" cy="112" r="1.3" />
      <circle cx="155" cy="98" r="1" />
      <circle cx="245" cy="92" r="1.2" />
      <circle cx="275" cy="88" r="1" />
      <circle cx="390" cy="118" r="1.2" />
    </g>
  </svg>
);

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

  const pull = progress * 120;
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

      <div className="relative w-full max-w-[900px] h-[350px] mx-4 flex items-center">
        {/* Left hand container */}
        <div
          className="absolute right-1/2 w-[48%] h-full"
          style={{ transform: `translateX(${15 - pull}px)` }}
        >
          <LeftHand />
        </div>

        {/* Right hand container */}
        <div
          className="absolute left-1/2 w-[48%] h-full"
          style={{ transform: `translateX(${-15 + pull}px)` }}
        >
          <RightHand />
        </div>
      </div>
    </div>
  );
};

export default HandsIntro;
