import { useEffect, useRef } from "react";
import { createSky } from "@/lib/sky";

const Sky = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvas.current) return;
    const sky = createSky(canvas.current);
    return () => sky?.destroy();
  }, []);
  return <canvas ref={canvas} className="sky" aria-hidden="true" />;
};

export default Sky;
