import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/content";

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (stored === "en" || stored === "hi") setLang(stored);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "en" ? "hi" : "en")), []);

  return <LangContext.Provider value={{ lang, toggle, setLang }}>{children}</LangContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
};
