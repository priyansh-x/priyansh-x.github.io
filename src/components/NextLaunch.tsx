import { useEffect, useState } from "react";

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
const ENDPOINT =
  "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=1";

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatTMinus(iso: string): string {
  const totalSec = Math.floor((new Date(iso).getTime() - Date.now()) / 1000);
  const sign = totalSec >= 0 ? "T-" : "T+";
  const abs = Math.abs(totalSec);
  const days = Math.floor(abs / 86_400);
  const hours = Math.floor((abs % 86_400) / 3_600);
  const mins = Math.floor((abs % 3_600) / 60);
  const secs = abs % 60;
  const clock = `${pad2(hours)}:${pad2(mins)}:${pad2(secs)}`;
  return days > 0 ? `${sign}${days}d ${clock}` : `${sign}${clock}`;
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

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached = JSON.parse(raw);
          if (Date.now() - cached.ts < CACHE_TTL_MS) {
            if (!cancelled) setData(cached.data);
            return;
          }
        }
      } catch {
        /* fall through */
      }

      try {
        const res = await fetch(ENDPOINT);
        if (!res.ok) return;
        const json = await res.json();
        const r = json.results?.[0];
        if (!r) return;
        const fresh: LaunchData = {
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
            JSON.stringify({ ts: Date.now(), data: fresh }),
          );
        } catch {
          /* ignore quota */
        }
        if (!cancelled) setData(fresh);
      } catch {
        /* silent */
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!data) return;
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, [data]);

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
