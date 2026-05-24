// "currently" strip — shows the orgs I'm presently in, as tiny
// grayscale favicons that reveal their brand colour on hover.
// Logos are pulled from Google's favicon endpoint so I never have
// to maintain asset files; trade-off is a soft dependency on
// Google for the icon load, which is acceptable for three icons.

interface Org {
  name: string;
  domain: string;
  url: string;
}

const ORGS: Org[] = [
  { name: "Samora AI", domain: "samora.ai", url: "https://www.samora.ai/" },
  {
    name: "Conquest",
    domain: "conquestbits.org",
    url: "https://www.conquestbits.org/",
  },
  {
    name: "BITS Pilani",
    domain: "bits-pilani.ac.in",
    url: "https://www.bits-pilani.ac.in/pilani/",
  },
];

const faviconUrl = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

const CurrentlyStrip = () => (
  <div className="mt-10 flex items-center gap-4 flex-wrap">
    <span className="text-faint text-sm">currently</span>
    <div className="flex items-center gap-4">
      {ORGS.map(({ name, domain, url }) => (
        <a
          key={domain}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          title={name}
          className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-200 inline-flex items-center"
        >
          <img
            src={faviconUrl(domain)}
            alt=""
            width={18}
            height={18}
            loading="lazy"
            referrerPolicy="no-referrer"
            style={{ display: "block" }}
          />
        </a>
      ))}
    </div>
  </div>
);

export default CurrentlyStrip;
