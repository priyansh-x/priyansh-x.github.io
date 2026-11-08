import { useCallback, useEffect, useState } from "react";

// Rockets are where it started. Shows the next launch anywhere on Earth,
// counting down live. Quietly renders nothing if the API is unreachable.
type Launch = { rocket: string; mission: string; net: string; url: string | null };

const KEY = "nextLaunch:v3";
const TTL = 30 * 60 * 1000;
const API = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5";

const pad = (n: number) => String(n).padStart(2, "0");
const tMinus = (iso: string) => {
  const s = Math.max(0, Math.floor((Date.parse(iso) - Date.now()) / 1000));
  const d = Math.floor(s / 86400);
  const clock = `${pad(Math.floor((s % 86400) / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  return d > 0 ? `T−${d}d ${clock}` : `T−${clock}`;
};

const NextLaunch = () => {
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [, tick] = useState(0);

  const load = useCallback(async () => {
    try {
      const c = JSON.parse(localStorage.getItem(KEY) ?? "null");
      if (c && Date.now() - c.ts < TTL && Date.parse(c.data.net) > Date.now()) return setLaunch(c.data);
    } catch {
      /* no cache */
    }
    try {
      const res = await fetch(API);
      if (!res.ok) return;
      const json = await res.json();
      type R = { name?: string; net?: string; vidURLs?: { url: string }[]; infoURLs?: { url: string }[] };
      const r = (json.results as R[] | undefined)?.find((x) => x.net && Date.parse(x.net) > Date.now());
      if (!r?.name || !r.net) return;
      const [rocket, mission = ""] = r.name.split(" | ");
      const data: Launch = {
        rocket: rocket.replace(/ Block \d+$/, ""),
        mission: mission.replace("Starlink Group ", "Starlink ").replace(/\s*(TBD)?\?+$/, "").trim(),
        net: r.net,
        url: r.vidURLs?.[0]?.url ?? r.infoURLs?.[0]?.url ?? null,
      };
      try {
        localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), data }));
      } catch {
        /* storage blocked */
      }
      setLaunch(data);
    } catch {
      /* offline */
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!launch) return;
    const id = window.setInterval(() => {
      if (Date.parse(launch.net) <= Date.now()) {
        try { localStorage.removeItem(KEY); } catch { /* ignore */ }
        load();
      } else tick((n) => n + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [launch, load]);

  if (!launch) return null;
  const name = `${launch.rocket}${launch.mission ? ` · ${launch.mission}` : ""}`;

  return (
    <div className="row">
      <dt className="mono">next launch</dt>
      <dd>
        Rockets are where this started. Next up:{" "}
        {launch.url ? (
          <a href={launch.url} target="_blank" rel="noreferrer">{name}</a>
        ) : (
          name
        )}
        {" "}<span className="when">in <span className="mono tnum small">{tMinus(launch.net)}</span></span>
      </dd>
    </div>
  );
};

export default NextLaunch;
