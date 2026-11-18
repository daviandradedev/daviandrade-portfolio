import type { ReactNode } from "react";
import { ExternalLink, Lock } from "lucide-react";
import { ProjectMedia } from "@/components/project-media";

type ProjectCardProps = {
  projectId: string;
  badge: string;
  title: string;
  body: string;
  href?: string;
  internal?: boolean;
  ongoing?: boolean;
  ctaLabel: string;
  cover: string;
  coverAlt: string;
  accent: string;
  highlights: string[];
  media: Array<{
    type: "image" | "video" | "embed";
    src: string;
    poster?: string;
    alt: string;
  }>;
  galleryLabel: string;
  closeGalleryLabel: string;
  expandLabel: string;
  playVideoLabel: string;
  previousMediaLabel: string;
  nextMediaLabel: string;
  highlightsLabel: string;
  opensInNewTab: string;
  toolbar?: ReactNode;
};

export function ProjectCard({
  projectId,
  badge,
  title,
  body,
  href,
  internal = false,
  ongoing = false,
  ctaLabel,
  cover,
  coverAlt,
  accent,
  highlights,
  media,
  galleryLabel,
  closeGalleryLabel,
  expandLabel,
  playVideoLabel,
  previousMediaLabel,
  nextMediaLabel,
  highlightsLabel,
  opensInNewTab,
  toolbar,
}: ProjectCardProps) {
  return (
    <article className="project-card" id={`project-${projectId}`}>
      <ProjectMedia
        cover={cover}
        coverAlt={coverAlt}
        accent={accent}
        items={media}
        galleryLabel={galleryLabel}
        closeLabel={closeGalleryLabel}
        expandLabel={expandLabel}
        playVideoLabel={playVideoLabel}
        previousLabel={previousMediaLabel}
        nextLabel={nextMediaLabel}
        projectHref={href}
        projectLabel={ctaLabel}
        opensInNewTab={opensInNewTab}
      />

      <div className="project-card-content">
        <div className="project-card-top">
          <span
            className={`project-badge ${internal ? "is-internal" : ""} ${ongoing ? "is-ongoing" : ""}`}
          >
            {internal ? <Lock size={12} aria-hidden="true" /> : null}
            {badge}
          </span>
        </div>

        <h3 className="project-title">{title}</h3>

        {highlights.length > 0 ? (
          <ul className="project-highlights" aria-label={highlightsLabel}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        <p className="project-body">{body}</p>
        {toolbar}

        {href ? (
          <a
            className="project-link project-card-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">{title}. </span>
            {ctaLabel}
            <ExternalLink size={16} aria-hidden="true" />
            <span className="sr-only"> {opensInNewTab}</span>
          </a>
        ) : (
          <p className="project-muted">{ctaLabel}</p>
        )}
      </div>
    </article>
  );
}
