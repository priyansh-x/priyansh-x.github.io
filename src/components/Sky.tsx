import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createSky, type LaunchOptions, type Sky as SkyApi } from "@/lib/sky";

export type SkyHandle = { launch: (o: LaunchOptions) => void };

const Sky = forwardRef<SkyHandle>((_, ref) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const sky = useRef<SkyApi | null>(null);

  useEffect(() => {
    if (!canvas.current) return;
    sky.current = createSky(canvas.current);
    return () => {
      sky.current?.destroy();
      sky.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    launch: (o) => sky.current?.launch(o),
  }));

  return <canvas ref={canvas} className="sky" aria-hidden="true" />;
});

Sky.displayName = "Sky";
export default Sky;
