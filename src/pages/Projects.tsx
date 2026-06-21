import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLang } from "@/contexts/LangContext";
import { projects, t } from "@/lib/content";
import LangToggle from "@/components/LangToggle";
import TextScramble from "@/components/TextScramble";

const Projects = () => {
  const { lang } = useLang();

  useEffect(() => {
    document.title = "Projects | Priyansh Joshi";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LangToggle />
      <main className="mx-auto max-w-[640px] px-6 py-24 sm:py-32">
        <TextScramble
          text={t.sectionProjects[lang]}
          as="h1"
          className="text-4xl sm:text-5xl font-normal tracking-tight mb-16"
        />

        <div className="space-y-16">
          {projects.map((p) => (
            <article key={p.name}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-foreground text-xl font-medium">
                  {p.name}
                  {p.status && (
                    <span className="text-faint ml-2 text-sm font-light">
                      · {p.status}
                    </span>
                  )}
                </h2>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-inline text-sm shrink-0"
                  >
                    ↗
                  </a>
                )}
              </div>
              <p className="text-mute text-sm mt-3 leading-relaxed">
                {lang === "en"
                  ? ("longDescEn" in p ? p.longDescEn : p.descEn)
                  : ("longDescHi" in p ? p.longDescHi : p.descHi)}
              </p>
            </article>
          ))}
        </div>

        <Link to="/" className="link-inline mt-24 inline-block text-sm">
          {t.back[lang]}
        </Link>
      </main>
    </div>
  );
};

export default Projects;
