import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "boost" | "meco" | "sep" | "stage2" | "seco" | "orbit";

interface Waypoint {
  t: number;       // animation seconds
  h: number;       // altitude in meters
  v: number;       // velocity m/s
  realT: number;   // displayed T+ seconds
  y: number;       // rocket translateY px
}

// Falcon-9-style two-stage profile, compressed ~96x.
// Real waypoints are calibrated to public Falcon 9 numbers
// (MECO ≈ 80 km / 2.4 km/s, SECO ≈ 200 km / 7.8 km/s).
const WAYPOINTS: Waypoint[] = [
  { t: 0.0, h: 0,        v: 0,    realT: 0,   y: 0    },
  { t: 1.4, h: 80_000,   v: 2400, realT: 145, y: -150 },
  { t: 1.6, h: 95_000,   v: 2200, realT: 163, y: -170 },
  { t: 3.8, h: 200_000,  v: 7800, realT: 384, y: -340 },
  { t: 4.6, h: 215_000,  v: 7800, realT: 480, y: -420 },
];

const TOTAL_DURATION = 5.2;
const MECO_T = 1.4;
const SEP_T = 1.6;
const STAGE2_T = 1.8;
const SECO_T = 3.8;
const ORBIT_T = 4.1;

function interpolate(t: number): { h: number; v: number; realT: number; y: number } {
  if (t <= WAYPOINTS[0].t) return WAYPOINTS[0];
  if (t >= WAYPOINTS[WAYPOINTS.length - 1].t) return WAYPOINTS[WAYPOINTS.length - 1];
  for (let i = 1; i < WAYPOINTS.length; i++) {
    const a = WAYPOINTS[i - 1];
    const b = WAYPOINTS[i];
    if (t >= a.t && t <= b.t) {
      const f = (t - a.t) / (b.t - a.t);
      return {
        h: a.h + (b.h - a.h) * f,
        v: a.v + (b.v - a.v) * f,
        realT: a.realT + (b.realT - a.realT) * f,
        y: a.y + (b.y - a.y) * f,
      };
    }
  }
  return WAYPOINTS[WAYPOINTS.length - 1];
}

function phaseFor(t: number): Phase {
  if (t < MECO_T) return "boost";
  if (t < SEP_T) return "meco";
  if (t < STAGE2_T) return "sep";
  if (t < SECO_T) return "stage2";
  if (t < ORBIT_T) return "seco";
  return "orbit";
}

function formatT(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `T+${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function formatAlt(m: number): string {
  if (m < 1000) return `${Math.round(m).toString().padStart(3, " ")} m`;
  return `${Math.round(m / 1000).toString().padStart(3, " ")} km`;
}

function formatVel(mps: number): string {
  if (mps < 1000) return `${Math.round(mps).toString().padStart(4, " ")} m/s`;
  return `${(mps / 1000).toFixed(2).padStart(5, " ")} km/s`;
}

const PHASE_LABEL: Record<Phase, string> = {
  idle: "",
  boost: "STAGE 1",
  meco: "MECO",
  sep: "STAGE SEP",
  stage2: "STAGE 2",
  seco: "SECO",
  orbit: "ORBIT",
};

const isEvent = (p: Phase) => p === "meco" || p === "sep" || p === "seco";

const MONO = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace';

const RocketLaunch = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [data, setData] = useState({ h: 0, v: 0, realT: 0, y: 0 });
  const [stage1Y, setStage1Y] = useState(0);
  const [stage1X, setStage1X] = useState(0);
  const [stage1Active, setStage1Active] = useState(false);
  const [flameSeed, setFlameSeed] = useState(0);
  const rafRef = useRef<number | null>(null);
  const sepStartYRef = useRef(0);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const launch = () => {
    if (phase !== "idle") return;
    setPhase("boost");
    setStage1Active(false);

    const startTs = performance.now();
    let separated = false;

    const step = (now: number) => {
      const t = (now - startTs) / 1000;

      if (t >= TOTAL_DURATION) {
        setPhase("idle");
        setData({ h: 0, v: 0, realT: 0, y: 0 });
        setStage1Active(false);
        return;
      }

      const current = interpolate(t);
      const currentPhase = phaseFor(t);

      setData(current);
      setPhase(currentPhase);
      setFlameSeed(Math.random());

      if (!separated && t >= SEP_T) {
        separated = true;
        sepStartYRef.current = current.y;
        setStage1Active(true);
      }

      if (separated) {
        const sepT = t - SEP_T;
        const fall = 220 * sepT * sepT;
        const drift = 30 * sepT;
        setStage1Y(sepStartYRef.current + fall);
        setStage1X(-drift);
        if (sepStartYRef.current + fall > 120) setStage1Active(false);
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const flying = phase !== "idle";
  const burning = phase === "boost" || phase === "stage2";
  const isStage2 = phase === "stage2" || phase === "seco" || phase === "orbit";
  const orbitFade = phase === "orbit"
    ? Math.max(0, 1 - (data.realT - 384) / 80)
    : 1;

  return (
    <div className="mt-6 relative" style={{ minHeight: "22px" }}>
      <div className="flex items-end gap-3">
        <button
          type="button"
          onClick={launch}
          aria-label={flying ? "In flight" : "Launch rocket"}
          className="relative bg-transparent border-0 p-0 leading-none"
          style={{
            fontSize: "16px",
            transform: `translateY(${data.y}px)`,
            transition: flying ? "none" : "transform 350ms ease-out",
            cursor: flying ? "default" : "pointer",
            opacity: orbitFade,
          }}
        >
          <span style={{ display: "inline-block" }}>🚀</span>
          {burning && (
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: "50%",
                top: "100%",
                transform: `translateX(-50%) scaleY(${0.7 + flameSeed * 0.6}) scaleX(${0.9 + flameSeed * 0.3})`,
                transformOrigin: "top center",
                width: isStage2 ? "3px" : "6px",
                height: isStage2 ? "12px" : "18px",
                background: isStage2
                  ? "linear-gradient(to bottom, #cfeaff 0%, #6bb6ff 35%, #2563eb 75%, transparent 100%)"
                  : "linear-gradient(to bottom, #ffe082 0%, #ff8c1a 40%, #d62828 78%, transparent 100%)",
                borderRadius: "0 0 3px 3px",
                filter: "blur(0.5px)",
                pointerEvents: "none",
              }}
            />
          )}
        </button>

        {flying ? (
          <span
            aria-live="polite"
            className="tabular-nums whitespace-pre"
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              letterSpacing: "0.02em",
              color: "hsl(var(--foreground))",
            }}
          >
            {formatT(data.realT)}
            <span style={{ color: "hsl(var(--text-mute))" }}>{"  ALT "}</span>
            {formatAlt(data.h)}
            <span style={{ color: "hsl(var(--text-mute))" }}>{"  VEL "}</span>
            {formatVel(data.v)}
            <span style={{ color: "hsl(var(--text-mute))" }}>{"   "}</span>
            <span
              style={{
                color: isEvent(phase) ? "#ff8c1a" : "hsl(var(--foreground))",
                fontWeight: isEvent(phase) ? 600 : 400,
              }}
            >
              {PHASE_LABEL[phase]}
            </span>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="text-[12px] hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-0 p-0"
            style={{ color: "hsl(var(--hover-line))" }}
          >
            still launching
          </button>
        )}
      </div>

      {stage1Active && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: "4px",
            top: 0,
            fontSize: "8px",
            color: "hsl(var(--text-mute))",
            transform: `translate(${stage1X}px, ${stage1Y}px) rotate(${stage1Y * 3}deg)`,
            pointerEvents: "none",
          }}
        >
          ▪
        </span>
      )}
    </div>
  );
};

export default RocketLaunch;
