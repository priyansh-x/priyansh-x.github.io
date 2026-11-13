import { useState } from "react";
import { arc, curve, dot, doodle, line } from "@/lib/scrawl";
import Ink, { timeline } from "@/components/Ink";

// A slightly wonky rocket with a face, drawn in a 40 x 62 box.
const BOX = { x: 0, y: 0, w: 40, h: 62 };

const body = doodle(
  [
    curve([20, 2], [25.5, 7], [28.5, 15], [29, 24], [28.6, 36], [27, 42], [13, 42], [11.4, 36], [11, 24], [11.5, 15], [14.5, 7], [20, 2]),
    curve(...arc(20, 19, 4.8, 4.8, -90, 275)),
    dot(18.3, 18.2, 0.45),
    dot(21.7, 18.2, 0.45),
    curve(...arc(20, 19.4, 2.1, 1.7, 25, 155)),
    curve([11.2, 30], [20, 31.2], [28.8, 30]),
    line([11.4, 29], [4.5, 39], [5.5, 45], [12.2, 41]),
    line([28.6, 29], [35.5, 39], [34.5, 45], [27.8, 41]),
    line([15, 42], [15.8, 45.5], [24.2, 45.5], [25, 42]),
    line([3, 6], [3, 10.4]),
    line([0.8, 8.2], [5.2, 8.2]),
    line([37, 18.4], [37, 21.8]),
    line([35.3, 20.1], [38.7, 20.1]),
  ],
  7,
  0.45,
);

const flameA = doodle([line([16.5, 46.5], [14.6, 52], [18, 50.2], [20, 59], [22, 50.2], [25.4, 52], [23.5, 46.5])], 11, 0.35);
const flameB = doodle([line([16.5, 46.5], [15.5, 54.5], [18.6, 51.4], [20, 56.5], [21.4, 51.4], [24.5, 54.5], [23.5, 46.5])], 12, 0.35);

type Phase = "idle" | "launch" | "return";

const Rocket = ({ delay = 0, rate = 1 }: { delay?: number; rate?: number }) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const flameAt = delay + timeline(body, rate).total;

  return (
    <button
      type="button"
      className={`rocket ${phase}`}
      aria-label="Launch the rocket"
      onClick={() => phase === "idle" && setPhase("launch")}
      onAnimationEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        if (phase === "launch") setPhase("return");
        else if (phase === "return") setPhase("idle");
      }}
    >
      <span className="rocket-body">
        <Ink ink={body} delay={delay} rate={rate} viewBox={BOX} />
        <span className="flames">
          <Ink ink={flameA} delay={flameAt} rate={rate} viewBox={BOX} className="flame a" />
          <Ink ink={flameB} delay={flameAt} rate={rate} viewBox={BOX} className="flame b" />
        </span>
      </span>
    </button>
  );
};

export default Rocket;
