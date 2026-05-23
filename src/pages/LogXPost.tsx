import { Link, useParams } from "react-router-dom";
import { posts, postContent, t } from "@/lib/content";
import { useLang } from "@/contexts/LangContext";
import LangToggle from "@/components/LangToggle";
import { formatDate } from "@/lib/utils";
import { useEffect } from "react";

const WORDS_PER_MIN = 220;

const LogXPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${lang === "en" ? post.titleEn : post.titleHi} — Priyansh Joshi`;
    }
  }, [post, lang]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <LangToggle />
        <main className="mx-auto max-w-[560px] px-6 py-32">
          <p className="text-mute">Not found.</p>
          <Link to="/" className="link-inline mt-8 inline-block">{t.back[lang]}</Link>
        </main>
      </div>
    );
  }

  const paragraphs = postContent[post.slug] ?? [];
  const wordCount = paragraphs.reduce(
    (n, p) => n + p.trim().split(/\s+/).filter(Boolean).length,
    0,
  );
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MIN));
  const meta: string[] = [];
  if (post.date) meta.push(formatDate(post.date, lang));
  if (wordCount > 0) {
    meta.push(lang === "en" ? `~${minutes} min read` : `~${minutes} मिनट का पठन`);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LangToggle />
      <main className="mx-auto max-w-[560px] px-6 py-32">
        <article>
          <h1 className="text-2xl font-normal mb-2">
            {lang === "en" ? post.titleEn : post.titleHi}
          </h1>
          <p className="text-faint text-sm mb-16">
            {meta.length > 0 ? meta.join(" · ") : post.year}
          </p>
          {paragraphs.length > 0 ? (
            <div className="space-y-6 text-foreground leading-relaxed">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ) : (
            <p className="text-mute italic">[{t.comingSoon[lang]}]</p>
          )}
        </article>
        <Link to="/" className="link-inline mt-24 inline-block text-sm">
          {t.back[lang]}
        </Link>
      </main>
    </div>
  );
};

export default LogXPost;
