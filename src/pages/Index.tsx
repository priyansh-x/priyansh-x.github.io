import { useEffect } from "react";
import { scrawl } from "@/lib/scrawl";
import Ink, { timeline } from "@/components/Ink";
import Rocket from "@/components/Rocket";

// Everything is written once, the same way on every visit (fixed seeds).
const line1 = scrawl("Priyansh's", { seed: 3, tilt: 7, jitter: 1.3 });
const line2 = scrawl("Webs^te", { seed: 9, tilt: 7, jitter: 1.3 });
const tagline = scrawl("i want to do hard things", {
  seed: 21,
  tilt: 8,
  jitter: 1.4,
});
const TITLE_RATE = 1.5;
const TAG_RATE = 3;
const LINK_RATE = 2.2;
const ROCKET_RATE = 4;

const links = [
  {
    label: "X",
    text: "X",
    href: "https://x.com/otziiz",
    seed: 31,
    pos: { left: "4%", top: "12%" },
    rot: -6,
  },
  {
    label: "GitHub",
    text: "gh",
    href: "https://github.com/priyansh-x",
    seed: 37,
    pos: { left: "28%", top: "30%" },
    rot: 4,
  },
  {
    label: "LinkedIn",
    text: "Li",
    href: "https://www.linkedin.com/in/priyansh-joshi-206658273/",
    seed: 41,
    pos: { left: "53%", top: "0%" },
    rot: -3,
  },
  {
    label: "Email",
    text: "@",
    href: "mailto:f20250479@pilani.bits-pilani.ac.in",
    seed: 43,
    pos: { left: "80%", top: "20%" },
    rot: 8,
  },
].map((l) => ({
  ...l,
  ink: scrawl(l.text, { seed: l.seed, tilt: 8, jitter: 1.3 }),
}));

// one pen: each piece starts when the last one is done
const t1 = 0.3;
const t2 = t1 + timeline(line1, TITLE_RATE).total + 0.12;
const t3 = t2 + timeline(line2, TITLE_RATE).total + 0.2;
let t = t3 + timeline(tagline, TAG_RATE).total + 0.2;
const linkDelays = links.map((l) => {
  const start = t;
  t += timeline(l.ink, LINK_RATE).total + 0.06;
  return start;
});
const rocketAt = t;

const Index = () => {
  // Safety net: if the browser ever stalls the pen (a background tab, a link
  // preview bot), show everything fully written a moment after it should be.
  useEffect(() => {
    const id = window.setTimeout(
      () => document.documentElement.classList.add("inked"),
      (rocketAt + 2.5) * 1000,
    );
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="page">
      <h1 className="sr-only">
        Priyansh&rsquo;s Website. I want to do hard things.
      </h1>

      <div className="sheet">
        <div className="title">
          <Ink ink={line1} delay={t1} rate={TITLE_RATE} className="l1" />
          <Ink ink={line2} delay={t2} rate={TITLE_RATE} className="l2" />
          <Ink ink={tagline} delay={t3} rate={TAG_RATE} className="tag" />
        </div>

        <div className="scatter">
          <nav aria-label="Elsewhere">
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                aria-label={l.label}
                className="link"
                style={{ ...l.pos, rotate: `${l.rot}deg` }}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <Ink ink={l.ink} delay={linkDelays[i]} rate={LINK_RATE} />
              </a>
            ))}
          </nav>

          <Rocket delay={rocketAt} rate={ROCKET_RATE} />
        </div>
      </div>
    </main>
  );
};

export default Index;
