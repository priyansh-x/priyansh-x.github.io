import { useLang } from "@/contexts/LangContext";
import { t } from "@/lib/content";

const LangToggle = () => {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="fixed top-6 right-6 text-sm text-mute hover:text-foreground transition-colors duration-200 font-light"
    >
      {t.toggleLabel[lang]}
    </button>
  );
};

export default LangToggle;
