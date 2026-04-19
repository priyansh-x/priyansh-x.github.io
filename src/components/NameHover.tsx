import { useState } from "react";

const NameHover = () => {
  const [hover, setHover] = useState(false);
  return (
    <h1
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-2xl font-normal mb-8 inline-block cursor-default"
      aria-label="Priyansh Joshi"
    >
      <span className="relative inline-block">
        <span
          className="transition-opacity duration-200 ease-in-out"
          style={{ opacity: hover ? 0 : 1 }}
        >
          Priyansh
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-200 ease-in-out italic text-mute"
          style={{ opacity: hover ? 1 : 0 }}
        >
          beloved part
        </span>
      </span>
      <span> Joshi</span>
    </h1>
  );
};

export default NameHover;
