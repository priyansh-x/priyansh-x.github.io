interface Props {
  name: string;
  description: string;
  status: string | null;
  url: string | null;
}

const ProjectCard = ({ name, description, status, url }: Props) => {
  return (
    <article className="card-min p-5 relative">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-foreground font-normal">
            {name}
            {status && <span className="text-faint ml-2 text-sm font-light">· {status}</span>}
          </h3>
          <p className="text-mute text-sm mt-1 leading-relaxed">{description}</p>
        </div>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-inline text-sm shrink-0"
            aria-label={`Open ${name}`}
          >
            ↗
          </a>
        ) : (
          <span className="text-faint text-sm shrink-0" aria-label="Coming soon">
            ↗
          </span>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
