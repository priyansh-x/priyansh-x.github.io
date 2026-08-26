import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/contexts/LangContext";
import { RESUME_URL } from "@/lib/content";

interface Command {
  id: string;
  label: string;
  section: string;
  icon: string;
  action: () => void;
  keywords?: string;
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { lang, setLang } = useLang();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const commands: Command[] = useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        section: "Navigate",
        icon: "~",
        action: () => { navigate("/"); close(); },
        keywords: "index main",
      },
      {
        id: "about",
        label: "About",
        section: "Navigate",
        icon: "#",
        action: () => { navigate("/"); close(); setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 100); },
      },
      {
        id: "projects",
        label: "Projects",
        section: "Navigate",
        icon: "#",
        action: () => { navigate("/"); close(); setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 100); },
      },
      {
        id: "logx",
        label: "LogX",
        section: "Navigate",
        icon: "#",
        action: () => { navigate("/"); close(); setTimeout(() => document.getElementById("logx")?.scrollIntoView({ behavior: "smooth" }), 100); },
        keywords: "writing blog",
      },
      {
        id: "all-projects",
        label: "All Projects",
        section: "Navigate",
        icon: "→",
        action: () => { navigate("/projects"); close(); },
      },
      {
        id: "resume",
        label: "Resume",
        section: "Links",
        icon: "\u2197",
        action: () => { window.open(RESUME_URL, "_blank"); close(); },
        keywords: "cv pdf",
      },
      {
        id: "github",
        label: "GitHub",
        section: "Links",
        icon: "↗",
        action: () => { window.open("https://github.com/priyansh-x", "_blank"); close(); },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        section: "Links",
        icon: "↗",
        action: () => { window.open("https://www.linkedin.com/in/priyansh-joshi-206658273/", "_blank"); close(); },
      },
      {
        id: "twitter",
        label: "X / Twitter",
        section: "Links",
        icon: "↗",
        action: () => { window.open("https://x.com/otziiz", "_blank"); close(); },
      },
      {
        id: "email",
        label: "Copy email",
        section: "Actions",
        icon: "⎘",
        action: () => { navigator.clipboard.writeText("f20250479@pilani.bits-pilani.ac.in"); close(); },
        keywords: "contact mail",
      },
      {
        id: "lang",
        label: lang === "en" ? "Switch to Hindi" : "Switch to English",
        section: "Actions",
        icon: "⇄",
        action: () => { setLang(lang === "en" ? "hi" : "en"); close(); },
        keywords: "language translate",
      },
      {
        id: "top",
        label: "Back to top",
        section: "Actions",
        icon: "↑",
        action: () => { window.scrollTo({ top: 0, behavior: "smooth" }); close(); },
        keywords: "scroll",
      },
    ],
    [navigate, close, lang, setLang],
  );

  const filtered = useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.section.toLowerCase().includes(q) ||
        (c.keywords && c.keywords.toLowerCase().includes(q)),
    );
  }, [query, commands]);

  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>();
    for (const c of filtered) {
      const arr = map.get(c.section) || [];
      arr.push(c);
      map.set(c.section, arr);
    }
    return map;
  }, [filtered]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "/" && !open) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape" && open) {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const run = useCallback(
    (idx: number) => {
      const cmd = filtered[idx];
      if (cmd) cmd.action();
    },
    [filtered],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        run(selected);
      }
    },
    [filtered.length, selected, run],
  );

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  if (!open) return null;

  let flatIdx = 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
      onClick={close}
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden
      />
      <div
        className="relative w-full max-w-[480px] mx-4 border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_4%)] rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-[hsl(0_0%_12%)] px-4">
          <span className="text-faint text-sm mr-2">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command..."
            className="flex-1 bg-transparent text-foreground text-sm py-3 outline-none placeholder:text-[hsl(0_0%_30%)]"
            spellCheck={false}
          />
          <kbd className="text-[10px] text-faint border border-[hsl(0_0%_15%)] rounded px-1.5 py-0.5 ml-2">
            esc
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[300px] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="text-faint text-sm px-4 py-6 text-center">
              No results
            </p>
          )}
          {Array.from(grouped.entries()).map(([section, cmds]) => (
            <div key={section}>
              <p className="text-faint text-[11px] uppercase tracking-wider px-4 pt-3 pb-1">
                {section}
              </p>
              {cmds.map((cmd) => {
                const idx = flatIdx++;
                return (
                  <button
                    key={cmd.id}
                    data-idx={idx}
                    type="button"
                    onClick={() => run(idx)}
                    onMouseEnter={() => setSelected(idx)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                      idx === selected
                        ? "bg-[hsl(0_0%_12%)] text-foreground"
                        : "text-mute"
                    }`}
                  >
                    <span className="w-5 text-center text-faint shrink-0 text-xs">
                      {cmd.icon}
                    </span>
                    <span>{cmd.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="border-t border-[hsl(0_0%_12%)] px-4 py-2 flex items-center gap-4 text-[11px] text-faint">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
