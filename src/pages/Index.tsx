import { useCallback, useState } from "react";
import LangToggle from "@/components/LangToggle";
import NameHover from "@/components/NameHover";
import HandsIntro from "@/components/HandsIntro";
import NextLaunch from "@/components/NextLaunch";
import QuoteOnLoad from "@/components/QuoteOnLoad";
import ProjectCard from "@/components/ProjectCard";
import TextScramble from "@/components/TextScramble";
import { useLang } from "@/contexts/LangContext";
import { posts, projects, t } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

const OrgMark = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    width={14}
    height={14}
    className="inline-block align-text-bottom mr-1.5"
    loading="lazy"
    style={{ verticalAlign: "-2px" }}
  />
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V9h3v10zM6.5 7.7a1.7 1.7 0 110-3.5 1.7 1.7 0 010 3.5zM19 19h-3v-5c0-1.2-.5-2-1.6-2-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8v5h-3V9h3v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4.1V19z" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const MonkeytypeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 8h4v2H5v4h2v2H3V8zm6 0h6v2h-2v6h-2v-6H9V8zm8 0h4v8h-2v-2h-2v2h-2V8h2v4h2v-2h-2V8z"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2H21.5l-7.5 8.572L22.5 22h-6.844l-5.36-7.01L4.16 22H.9l8.02-9.166L.5 2h7.02l4.84 6.39L18.244 2zm-1.2 18h1.86L7.04 4H5.06l11.984 16z"/>
  </svg>
);


const Index = () => {
  const { lang } = useLang();
  const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem("introSeen") === "1";
  const [showIntro, setShowIntro] = useState(!alreadySeen);

  const onIntroComplete = useCallback(() => {
    setShowIntro(false);
    sessionStorage.setItem("introSeen", "1");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showIntro && (
        <>
          <HandsIntro onComplete={onIntroComplete} />
          <div style={{ height: "500px" }} aria-hidden />
        </>
      )}
      <LangToggle />

      <main className="mx-auto max-w-[640px] px-6 py-24 sm:py-32">
        {/* Intro */}
        <section aria-label="Intro">
          <NameHover />

          <p className="text-mute text-base mb-8">
            {t.location[lang]}, <span aria-label="India">🇮🇳</span>
          </p>

          <p className="text-foreground leading-relaxed">
            I believe technology is the most powerful tool we have to{" "}
            <strong className="font-semibold">help</strong>{" "}
            <strong className="font-semibold">people</strong>, and that's what I'm here to build.
          </p>

          <p className="text-mute mt-6 leading-relaxed">
            {t.bioBeforeBits[lang]}
            <a
              href="https://www.bits-pilani.ac.in/pilani/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline whitespace-nowrap"
            >
              <OrgMark src="/logos/bits.png" alt="" />
              {t.bitsLink[lang]}
            </a>
            {t.bioAfterBits[lang]}
            <a
              href="https://www.samora.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline whitespace-nowrap"
            >
              <OrgMark src="/logos/samora.svg" alt="" />
              {t.samoraLink[lang]}
            </a>
            {t.bioSamoraDesc[lang]}
            <a
              href="https://www.conquestbits.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline whitespace-nowrap"
            >
              <OrgMark src="/logos/conquest.png" alt="" />
              {t.conquestLink[lang]}
            </a>
            {t.bioAfterConquest[lang]}
          </p>

          <p className="text-mute mt-4 leading-relaxed">
            {t.bioSeeStart[lang]}
            <a href="#projects" className="link-inline">{t.projectsLink[lang]}</a>
            {t.bioMid[lang]}
            <a href="#logx" className="link-inline">{t.logxLink[lang]}</a>
            {t.bioEnd[lang]}
            <a href="mailto:f20250479@pilani.bits-pilani.ac.in" className="link-inline">{t.contactLink[lang]}</a>
            {t.bioFinal[lang]}
          </p>

          <QuoteOnLoad />
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-heading" className="mt-24">
          <TextScramble
            text={t.sectionAbout[lang]}
            as="h2"
            id="about-heading"
            className="text-foreground mb-6"
          />
          <p className="text-mute leading-relaxed">{t.aboutPara[lang]}</p>
        </section>

        {/* Projects */}
        <section id="projects" aria-labelledby="projects-heading" className="mt-24">
          <TextScramble
            text={t.sectionProjects[lang]}
            as="h2"
            id="projects-heading"
            className="text-foreground mb-6"
          />
          <div className="space-y-8">
            {projects.map((p) => (
              <ProjectCard
                key={p.name}
                name={p.name}
                description={lang === "en" ? p.descEn : p.descHi}
                status={p.status}
                url={p.url}
              />
            ))}
          </div>
        </section>

        {/* Writing / LogX */}
        <section id="logx" aria-labelledby="logx-heading" className="mt-24">
          <TextScramble
            text={t.sectionWriting[lang]}
            as="h2"
            id="logx-heading"
            className="text-foreground"
          />
          <p className="text-mute text-sm mt-1 mb-6">{t.writingSub[lang]}</p>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.slug} className="flex items-baseline justify-between gap-4">
                <Link to={`/logx/${post.slug}`} className="link-inline">
                  {lang === "en" ? post.titleEn : post.titleHi}
                </Link>
                <span className="text-faint text-sm shrink-0">
                  {post.date ? formatDate(post.date, lang) : post.year}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer: socials */}
        <footer id="contact" className="mt-24">
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/priyansh-x"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-foreground hover:opacity-60 transition-opacity"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/priyansh-joshi-206658273/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-foreground hover:opacity-60 transition-opacity"
            >
              <LinkedInIcon />
            </a>
            <a
              href="mailto:f20250479@pilani.bits-pilani.ac.in"
              aria-label="Email"
              className="text-foreground hover:opacity-60 transition-opacity"
            >
              <MailIcon />
            </a>
            <a
              href="https://monkeytype.com/profile/PriyanshX"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Monkeytype"
              className="text-foreground hover:opacity-60 transition-opacity"
            >
              <MonkeytypeIcon />
            </a>
            <a
              href="https://x.com/otziiz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-foreground hover:opacity-60 transition-opacity"
            >
              <XIcon />
            </a>
            {/* Resume link removed for now — will point at a Drive PDF later. */}
          </div>

          <NextLaunch />
        </footer>
      </main>
    </div>
  );
};

export default Index;
