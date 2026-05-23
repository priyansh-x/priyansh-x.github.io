import { useCallback, useEffect, useState } from "react";

interface LaunchData {
  provider: string;
  mission: string;
  net: string;
  pad: string | null;
  infoUrl: string | null;
  videoUrl: string | null;
}

const CACHE_KEY = "nextLaunch";
const CACHE_TTL_MS = 30 * 60 * 1000;
// Pull a handful and filter to truly-future entries client-side — the
// upcoming endpoint can still include launches that just lifted off.
const ENDPOINT =
  "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5";

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatTMinus(iso: string): string {
  const totalSec = Math.max(0, Math.floor((new Date(iso).getTime() - Date.now()) / 1000));
  const days = Math.floor(totalSec / 86_400);
  const hours = Math.floor((totalSec % 86_400) / 3_600);
  const mins = Math.floor((totalSec % 3_600) / 60);
  const secs = totalSec % 60;
  const clock = `${pad2(hours)}:${pad2(mins)}:${pad2(secs)}`;
  return days > 0 ? `T-${days}d ${clock}` : `T-${clock}`;
}

function shortenMission(name: string): string {
  const parts = name.split(" | ");
  return parts[parts.length - 1].replace("Starlink Group ", "Starlink ");
}

function shortenPad(name: string | undefined): string | null {
  if (!name) return null;
  return name
    .replace(", USA", "")
    .replace("Air Force Station", "AFS")
    .replace("Space Force Base", "SFB");
}

const NextLaunch = () => {
  const [data, setData] = useState<LaunchData | null>(null);
  const [, setTick] = useState(0);

  const load = useCallback(async () => {
    const now = Date.now();

    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        const cachedNet = cached?.data?.net
          ? new Date(cached.data.net).getTime()
          : 0;
        const fresh = now - cached.ts < CACHE_TTL_MS;
        const stillFuture = cachedNet > now;
        if (fresh && stillFuture) {
          setData(cached.data);
          return;
        }
      }
    } catch {
      /* fall through to fetch */
    }

    try {
      const res = await fetch(ENDPOINT);
      if (!res.ok) return;
      const json = await res.json();
      // First result that is genuinely in the future.
      const r = (json.results ?? []).find(
        (entry: { net?: string }) =>
          entry?.net && new Date(entry.net).getTime() > Date.now(),
      );
      if (!r) return;
      const next: LaunchData = {
        provider: r.launch_service_provider?.name ?? "—",
        mission: shortenMission(r.name ?? ""),
        net: r.net,
        pad: shortenPad(r.pad?.location?.name),
        infoUrl: r.infoURLs?.[0]?.url ?? null,
        videoUrl: r.vidURLs?.[0]?.url ?? null,
      };
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ ts: Date.now(), data: next }),
        );
      } catch {
        /* ignore quota */
      }
      setData(next);
    } catch {
      /* silent */
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!data) return;
    const id = setInterval(() => {
      const launchPassed = new Date(data.net).getTime() <= Date.now();
      if (launchPassed) {
        try {
          localStorage.removeItem(CACHE_KEY);
        } catch {
          /* ignore */
        }
        load();
      } else {
        setTick((n) => n + 1);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [data, load]);

  if (!data) return null;

  const missionLink = data.videoUrl ?? data.infoUrl;
  const missionEl = missionLink ? (
    <a
      href={missionLink}
      target="_blank"
      rel="noopener noreferrer"
      className="link-inline"
    >
      {data.mission}
    </a>
  ) : (
    <span className="text-foreground">{data.mission}</span>
  );

  return (
    <div className="mt-8 leading-relaxed">
      <p className="text-base">
        <span className="text-mute">next launch · </span>
        <span className="text-foreground">{data.provider}</span>
        <span className="text-mute"> · </span>
        {missionEl}
      </p>
      <p className="text-mute text-sm mt-1 tabular-nums">
        {formatTMinus(data.net)}
        {data.pad && <span className="text-faint"> · {data.pad}</span>}
      </p>
    </div>
  );
};

export default NextLaunch;
