import LangToggle from "@/components/LangToggle";
import NameHover from "@/components/NameHover";
import QuoteOnLoad from "@/components/QuoteOnLoad";
import ProjectCard from "@/components/ProjectCard";
import { useLang } from "@/contexts/LangContext";
import { posts, projects, t } from "@/lib/content";
import { Link } from "react-router-dom";

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

const Index = () => {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-background text-foreground">
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
            <strong className="font-semibold">help</strong> people, and that's what I'm here to build.
          </p>

          <p className="text-mute mt-6 leading-relaxed">
            {t.bioIntern[lang]}
            <a
              href="https://www.samora.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              {t.samoraLink[lang]}
            </a>
            {t.bioSamoraDesc[lang]}
            <a
              href="https://www.conquestbits.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
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
          <h2 id="about-heading" className="text-foreground mb-6">
            {t.sectionAbout[lang]}
          </h2>
          <p className="text-mute leading-relaxed">{t.aboutPara[lang]}</p>
        </section>

        {/* Projects */}
        <section id="projects" aria-labelledby="projects-heading" className="mt-24">
          <h2 id="projects-heading" className="text-foreground mb-6">
            {t.sectionProjects[lang]}
          </h2>
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
          <h2 id="logx-heading" className="text-foreground">
            {t.sectionWriting[lang]}
          </h2>
          <p className="text-mute text-sm mt-1 mb-6">{t.writingSub[lang]}</p>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.slug} className="flex items-baseline justify-between gap-4">
                <Link to={`/logx/${post.slug}`} className="link-inline">
                  {lang === "en" ? post.titleEn : post.titleHi}
                </Link>
                <span className="text-faint text-sm shrink-0">{post.year}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer: socials inline + rocket */}
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
            <a href="#" className="link-inline text-sm ml-2">{t.resume[lang]} →</a>
          </div>

          <p className="text-[12px] mt-6" style={{ color: "hsl(var(--hover-line))" }}>
            {t.rocket[lang]}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
