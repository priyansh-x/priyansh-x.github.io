import { useEffect, useRef } from "react";
import Water, { dropAt } from "@/components/Water";
import Name from "@/components/Name";
import Clock from "@/components/Clock";
import NextLaunch from "@/components/NextLaunch";

const LINE = "I want to do hard things.";
const RESUME_URL = "https://drive.google.com/file/d/1baXSxtwLopebznifaTD7tLkqQ59DaiLX/view?usp=sharing";

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
    {children}
  </a>
);

const links = [
  { label: "github", href: "https://github.com/priyansh-x" },
  { label: "x", href: "https://x.com/otziiz" },
  { label: "linkedin", href: "https://www.linkedin.com/in/priyansh-joshi-206658273/" },
  { label: "monkeytype", href: "https://monkeytype.com/profile/PriyanshX" },
  { label: "resume", href: RESUME_URL },
  { label: "email", href: "mailto:f20250479@pilani.bits-pilani.ac.in" },
];

// Two lines, always: "I want to do" / "hard things."
const LINES = [["I", "want", "to", "do"], ["hard", "things."]];

const Index = () => {
  const stop = useRef<HTMLSpanElement>(null);

  // Once the line has landed, its full stop falls into the water.
  useEffect(() => {
    const id = window.setTimeout(() => {
      const r = stop.current?.getBoundingClientRect();
      if (r) dropAt(r.left + r.width / 2, r.bottom - r.height * 0.2, 900, 5);
    }, 1500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="page">
      <Water />

      <header className="top mono">
        <Name />
        <Clock />
      </header>

      <section className="hero">
        <h1 className="line" aria-label={LINE}>
          {LINES.map((words, l) => (
            <span key={l}>
              {words.map((word, w) => {
                const i = l * 4 + w;
                const last = word === "things.";
                return (
                  <span key={w} className="word" style={{ animationDelay: `${0.15 + i * 0.12}s` }} aria-hidden="true">
                    {last ? word.slice(0, -1) : word}
                    {last && <span ref={stop}>.</span>}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
      </section>

      <section className="ledger" aria-labelledby="ledger-h">
        <h2 id="ledger-h" className="mono">hard things, so far</h2>
        <dl>
          <div className="row">
            <dt className="mono">5,364 m</dt>
            <dd>Walked to Everest Base Camp with my dad.</dd>
          </div>
          <div className="row">
            <dt className="mono">yc w26</dt>
            <dd>
              Building AI agents that run enterprise workflows at <A href="https://www.samora.ai/">Samora</A>.
            </dd>
          </div>
          <div className="row">
            <dt className="mono">conquest</dt>
            <dd>
              Capital advisory and tech at <A href="https://www.conquestbits.org/">India’s largest student-run accelerator</A>.
            </dd>
          </div>
          <div className="row">
            <dt className="mono">shipped</dt>
            <dd>
              <A href="https://devstats.me">DevStats</A>, <A href="https://github.com/priyansh-x/sloppy-reels">Sloppy</A> and{" "}
              <A href="https://github.com/priyansh-x/agent-passport">Agent Passport</A>.
            </dd>
          </div>
          <div className="row">
            <dt className="mono">bits pilani</dt>
            <dd>Electrical engineering, the long way round.</dd>
          </div>
          <NextLaunch />
        </dl>
      </section>

      <footer className="foot mono">
        <nav>
          {links.map((l) => (
            <A key={l.label} href={l.href}>
              {l.label}
            </A>
          ))}
        </nav>
        <span className="sig">maybe yes, maybe no.</span>
      </footer>
    </main>
  );
};

export default Index;
