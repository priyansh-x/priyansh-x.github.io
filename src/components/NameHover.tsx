import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { t } from "@/lib/content";

const NameHover = () => {
  const [hover, setHover] = useState(false);
  const { lang } = useLang();
  const fullName = t.fullName[lang];
  const beloved = t.belovedPart[lang];

  return (
    <h1
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-2xl font-normal mb-8 cursor-default relative"
      aria-label={fullName}
      style={{ minHeight: "2.5rem" }}
    >
      <span
        className="block transition-opacity duration-200 ease-in-out"
        style={{ opacity: hover ? 0 : 1 }}
      >
        {fullName}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center transition-opacity duration-200 ease-in-out italic whitespace-nowrap"
        style={{
          opacity: hover ? 1 : 0,
          fontSize: "13px",
          color: "#888",
          lineHeight: "1",
        }}
      >
        {beloved}
      </span>
    </h1>
  );
};

export default NameHover;
