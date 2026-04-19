interface Props {
  name: string;
  description: string;
  status: string | null;
  url: string | null;
}

const ProjectCard = ({ name, description, status, url }: Props) => {
  const arrowClasses = "text-sm shrink-0 transition-opacity";
  return (
    <article>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-foreground font-medium">
          {name}
          {status && (
            <span className="text-faint ml-2 text-sm font-light">· {status}</span>
          )}
        </h3>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`link-inline ${arrowClasses}`}
            aria-label={`Open ${name}`}
          >
            ↗
          </a>
        ) : (
          <span className={`text-faint ${arrowClasses}`} aria-label="Coming soon">
            ↗
          </span>
        )}
      </div>
      <p className="text-mute text-sm mt-1 leading-relaxed">{description}</p>
    </article>
  );
};

export default ProjectCard;
