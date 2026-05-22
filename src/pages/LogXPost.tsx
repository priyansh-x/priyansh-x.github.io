import { Link, useParams } from "react-router-dom";
import { posts, postContent, t } from "@/lib/content";
import { useLang } from "@/contexts/LangContext";
import LangToggle from "@/components/LangToggle";
import { useEffect } from "react";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LangToggle />
      <main className="mx-auto max-w-[560px] px-6 py-32">
        <article>
          <h1 className="text-2xl font-normal mb-2">
            {lang === "en" ? post.titleEn : post.titleHi}
          </h1>
          <p className="text-faint text-sm mb-16">{post.year}</p>
          {postContent[post.slug] && postContent[post.slug].length > 0 ? (
            <div className="space-y-6 text-foreground leading-relaxed">
              {postContent[post.slug].map((para, i) => (
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
