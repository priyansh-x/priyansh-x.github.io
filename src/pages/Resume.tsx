import { Link } from "react-router-dom";
import { useEffect } from "react";
import LangToggle from "@/components/LangToggle";

const EMAIL = "f20250479@pilani.bits-pilani.ac.in";
const LINKEDIN = "https://www.linkedin.com/in/priyansh-joshi-206658273/";

interface RoleProps {
  org: string;
  tag?: string;
  role: string;
  dates: string;
  location: string;
  blurb: string;
  bullets: string[];
}

const Role = ({ org, tag, role, dates, location, blurb, bullets }: RoleProps) => (
  <article>
    <div className="flex items-baseline justify-between gap-4">
      <h3 className="text-foreground font-medium">
        {org}
        {tag && (
          <span className="text-faint ml-2 text-sm font-light">· {tag}</span>
        )}
      </h3>
      <span className="text-faint text-sm shrink-0">{dates}</span>
    </div>
    <p className="text-mute text-sm mt-0.5">
      {role} · {location}
    </p>
    <p className="text-faint text-sm mt-2 italic leading-relaxed">{blurb}</p>
    <ul className="text-mute text-sm mt-3 space-y-1.5 leading-relaxed">
      {bullets.map((b, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-faint shrink-0" aria-hidden>
            —
          </span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </article>
);

interface SchoolProps {
  name: string;
  location: string;
  detail: string;
  dates: string;
}

const School = ({ name, location, detail, dates }: SchoolProps) => (
  <div>
    <div className="flex items-baseline justify-between gap-4">
      <h3 className="text-foreground font-medium">{name}</h3>
      <span className="text-faint text-sm shrink-0">{dates}</span>
    </div>
    <p className="text-mute text-sm mt-0.5">
      {detail} · {location}
    </p>
  </div>
);

const Resume = () => {
  useEffect(() => {
    document.title = "Resume — Priyansh Joshi";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LangToggle />
      <main className="mx-auto max-w-[640px] px-6 py-24 sm:py-32">
        <header>
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight">
            Priyansh Joshi
          </h1>
          <p className="text-mute text-sm mt-3">
            Sarjapur, Bengaluru, Karnataka
          </p>
          <p className="text-mute text-sm mt-1">
            <a href={`mailto:${EMAIL}`} className="link-inline">
              {EMAIL}
            </a>
            <span className="text-faint"> · </span>
            <span className="tabular-nums">+91 98454 67710</span>
            <span className="text-faint"> · </span>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              LinkedIn
            </a>
          </p>
        </header>

        <section className="mt-16">
          <h2 className="text-foreground mb-6">Education</h2>
          <div className="space-y-5">
            <School
              name="BITS Pilani"
              location="Pilani, India"
              detail="Bachelor's in Engineering — Electrical & Electronics · CGPA 8.86 / 10"
              dates="Aug 2025 – Jul 2029"
            />
            <School
              name="Geethanjali Vidyalaya"
              location="Bangalore, India"
              detail="CBSE, 12th Grade — 96.4%"
              dates="2025"
            />
            <School
              name="Greenwood High"
              location="Bangalore, India"
              detail="ICSE, 10th Grade — 97.8%"
              dates="2023"
            />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-foreground mb-6">Experience</h2>
          <div className="space-y-10">
            <Role
              org="Samora AI"
              tag="YC W26"
              role="Generalist Intern"
              dates="May 2026 – Present"
              location="Bangalore, India"
              blurb="Y Combinator-backed enterprise platform building production-grade, multilingual voice AI agents trusted for over 1 million calls."
              bullets={[
                "Collaborating directly with the CTO to engineer and deploy multilingual voice agents capable of executing complex system workflows and handling multi-dialect conversations.",
                "Assisting in the documentation and operational workflows required for achieving corporate SOC 2 compliance readiness.",
              ]}
            />
            <Role
              org="Conquest"
              role="Growth and Tech Associate"
              dates="Feb 2026 – Present"
              location="Pilani, India"
              blurb="India's first and largest student-run startup accelerator, with a combined cohort valuation of over $1 billion."
              bullets={[
                "Secured high-profile mentors and investors for the startup cohort through targeted outreach and relationship management.",
                "Facilitated founder-mentor engagements by managing the centralized mentorship portal and communication workflows.",
                "Helped develop core technical infrastructure, including the official website, mentor portal, and AI-driven evaluation systems.",
              ]}
            />
            <Role
              org="STAR"
              tag="Space Technology and Aeronautical Rocketry"
              role="Avionics Intern"
              dates="Apr 2023 – May 2023"
              location="Remote"
              blurb="Space education & research startup developing indigenous sub-orbital launch vehicles."
              bullets={[
                "Designed and simulated a static rocket motor test stand, validating structural integrity for propulsion testing.",
                "Documented avionics test procedures and supported cross-functional coordination between propulsion and instrumentation teams.",
              ]}
            />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-foreground mb-6">Extracurricular & Leadership</h2>
          <Role
            org="Centre for Entrepreneurial Leadership"
            tag="CEL, BITS Pilani"
            role="Member"
            dates="Dec 2025 – Present"
            location="Pilani, India"
            blurb="The entrepreneurship cell of BITS Pilani, ranked among the top 5 entrepreneurship centres in India by the Wadhwani Foundation."
            bullets={[
              "Organised E-week, a week-long entrepreneurship event attracting 1000+ attendees across campus.",
              "Organised Bedrock, a campus-wide initiative where students took over local eateries deploying marketing strategies, driving 3× revenue growth in a single day and attracting 3500+ attendees.",
              "Led De-Hack, BITS Pilani's flagship hackathon, with Sarvam as the official AI partner and multiple workshops.",
            ]}
          />
        </section>

        <section className="mt-16">
          <h2 className="text-foreground mb-6">Projects</h2>
          <div className="space-y-6">
            <article>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-foreground font-medium">Mnemos</h3>
                <a
                  href="https://github.com/priyansh-x/Mnemos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline text-sm shrink-0"
                  aria-label="Mnemos on GitHub"
                >
                  ↗
                </a>
              </div>
              <p className="text-mute text-sm mt-1 leading-relaxed">
                An interactive Brian2 application that transforms audio onsets
                into rhythmic spikes within an E/I neural network, visualised
                through synced rasters, traces, and browser animations.
              </p>
            </article>
            <article>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-foreground font-medium">Sloppy</h3>
                <a
                  href="https://github.com/priyansh-x/sloppy-reels"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline text-sm shrink-0"
                  aria-label="Sloppy on GitHub"
                >
                  ↗
                </a>
              </div>
              <p className="text-mute text-sm mt-1 leading-relaxed">
                An AI video social platform where users generate, remix, and
                share short-form videos through natural language prompts.
              </p>
            </article>
            <article>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-foreground font-medium">Novus</h3>
                <a
                  href="https://github.com/priyansh-x/Novus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline text-sm shrink-0"
                  aria-label="Novus on GitHub"
                >
                  ↗
                </a>
              </div>
              <p className="text-mute text-sm mt-1 leading-relaxed">
                Predict the whole-brain neural response to a video — second by
                second — before publishing it. Built on Meta FAIR's TRIBE v2
                brain-encoding foundation model.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-foreground mb-6">Awards & Achievements</h2>
          <ul className="space-y-2 text-mute text-sm leading-relaxed">
            <li>
              <span className="text-foreground">JEE Mains 2025</span> — 99.4
              percentile (9,214 AIR out of 14.75 lakh candidates)
            </li>
            <li>
              <span className="text-foreground">JEE Advanced 2025</span> —
              13,080 AIR (top 1% among 1.8 lakh candidates)
            </li>
            <li>
              <span className="text-foreground">
                YSI — Space Kidz India Competition
              </span>{" "}
              — top 50 from 30,000+ participants
            </li>
          </ul>
        </section>

        <Link to="/" className="link-inline mt-24 inline-block text-sm">
          ← back
        </Link>
      </main>
    </div>
  );
};

export default Resume;
