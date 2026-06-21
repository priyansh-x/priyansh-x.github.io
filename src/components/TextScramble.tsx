import { useCallback, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

interface Props {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  id?: string;
}

const TextScramble = ({ text, as: Tag = "span", className, id }: Props) => {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);
  const running = useRef(false);

  const scramble = useCallback(() => {
    if (running.current) return;
    running.current = true;

    const original = text;
    const length = original.length;
    let iteration = 0;
    const speed = 30;

    const step = () => {
      const resolved = Math.floor(iteration / 3);
      const next = original
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolved) return original[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(next);
      iteration++;

      if (resolved >= length) {
        setDisplay(original);
        running.current = false;
        return;
      }

      rafRef.current = window.setTimeout(step, speed);
    };

    step();
  }, [text]);

  const reset = useCallback(() => {
    if (rafRef.current !== null) clearTimeout(rafRef.current);
    running.current = false;
    setDisplay(text);
  }, [text]);

  return (
    <Tag id={id} className={className} style={{ cursor: "default" }}>
      <span
        onMouseEnter={scramble}
        onMouseLeave={reset}
        style={{ display: "inline" }}
      >
        {display}
      </span>
    </Tag>
  );
};

export default TextScramble;
