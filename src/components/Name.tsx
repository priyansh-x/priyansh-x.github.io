import { useState } from "react";

// प्रिय (beloved) + अंश (part). Hover, focus or tap to read it.
const Name = () => {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      className={`name${open ? " open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      aria-label="Priyansh Joshi. Priyansh means beloved part."
    >
      <span className="a" aria-hidden="true">priyansh joshi</span>
      <span className="b" aria-hidden="true">प्रिय + अंश = beloved part</span>
    </button>
  );
};

export default Name;
