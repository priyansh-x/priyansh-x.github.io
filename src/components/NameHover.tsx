import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { t } from "@/lib/content";

const NameHover = () => {
  const [revealed, setRevealed] = useState(false);
  const { lang } = useLang();
  const fullName = t.fullName[lang];
  const meaning = t.belovedMeaning[lang];

  return (
    <div className="mb-2">
      <h1 className="text-5xl sm:text-6xl font-normal tracking-tight cursor-default">
        {fullName}
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          aria-label="Reveal name meaning"
          aria-expanded={revealed}
          className="ml-1 align-super text-base text-mute hover:text-foreground transition-colors focus:outline-none"
        >
          *
        </button>
      </h1>
      <p
        className="italic transition-opacity duration-200 ease-in-out"
        style={{
          opacity: revealed ? 1 : 0,
          fontSize: "13px",
          color: "#888",
          minHeight: "1.2em",
        }}
        aria-hidden={!revealed}
      >
        {meaning}
      </p>
    </div>
  );
};

export default NameHover;
