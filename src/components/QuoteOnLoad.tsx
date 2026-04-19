import { useMemo } from "react";
import { quotes } from "@/lib/content";
import { useLang } from "@/contexts/LangContext";

const QuoteOnLoad = () => {
  const { lang } = useLang();
  // Pick once per mount (page load)
  const q = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);
  return (
    <p className="italic text-faint text-sm mt-6">
      {lang === "en" ? q.textEn : q.textHi} — {q.author}
    </p>
  );
};

export default QuoteOnLoad;
