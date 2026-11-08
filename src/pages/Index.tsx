const LINE = "i just wanna do hard things.";

const links = [
  { label: "github", href: "https://github.com/priyansh-x" },
  { label: "x", href: "https://x.com/otziiz" },
  { label: "linkedin", href: "https://www.linkedin.com/in/priyansh-joshi-206658273/" },
  { label: "email", href: "mailto:f20250479@pilani.bits-pilani.ac.in" },
];

const Index = () => (
  <main className="page">
    <h1 className="line" aria-label={LINE}>
      {LINE.split(" ").map((word, i) => (
        <span key={i} className="word" style={{ animationDelay: `${0.15 + i * 0.12}s` }} aria-hidden="true">
          {word}
        </span>
      ))}
      <span className="caret" aria-hidden="true" />
    </h1>

    <footer className="foot">
      <span>priyansh joshi</span>
      <nav>
        {links.map((l) => (
          <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            {l.label}
          </a>
        ))}
      </nav>
    </footer>
  </main>
);

export default Index;
