"use client";

import { ChevronLeft, ChevronRight, Expand, ExternalLink, Play, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
type GalleryItem = {
  type: "image" | "video" | "embed";
  src: string;
  poster?: string;
  alt: string;
};

type ProjectMediaProps = {
  cover: string;
  coverAlt: string;
  accent: string;
  items: GalleryItem[];
  galleryLabel: string;
  closeLabel: string;
  expandLabel: string;
  playVideoLabel: string;
  previousLabel: string;
  nextLabel: string;
  projectHref?: string;
  projectLabel?: string;
  opensInNewTab?: string;
};

function isRasterImage(src: string) {
  return /\.(png|jpe?g|webp|gif|avif)$/i.test(src);
}

function isPlayableMedia(item: GalleryItem | undefined) {
  return item?.type === "video" || item?.type === "embed";
}

export function ProjectMedia({
  cover,
  coverAlt,
  accent,
  items,
  galleryLabel,
  closeLabel,
  expandLabel,
  playVideoLabel,
  previousLabel,
  nextLabel,
  projectHref,
  projectLabel,
  opensInNewTab,
}: ProjectMediaProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const openedRef = useRef(false);
  const activeItem = activeIndex === null ? null : items[activeIndex];
  const primaryMedia = items[0];
  const useVideoCover =
    Boolean(primaryMedia) &&
    isPlayableMedia(primaryMedia) &&
    !isRasterImage(cover);

  const close = useCallback(() => setActiveIndex(null), []);

  const openAt = useCallback((index: number) => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % items.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current - 1 + items.length) % items.length,
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, items.length]);

  useEffect(() => {
    if (activeIndex === null) {
      if (openedRef.current) openerRef.current?.focus();
      openedRef.current = false;
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = () =>
      [...dialog.querySelectorAll<HTMLElement>("button, [href], input, select, textarea")].filter(
        (node) => !node.hasAttribute("disabled"),
      );

    if (!openedRef.current) {
      openedRef.current = true;
      focusable()[0]?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const nodes = focusable();
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const showGalleryStrip =
    !useVideoCover &&
    (items.length > 1 ||
      (items.length === 1 &&
        items[0].type === "image" &&
        items[0].src !== cover));

  const coverOpensPreview = items.length > 0;

  const lightbox =
    activeItem ? (
      <div
        className="media-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={activeItem.alt}
        onClick={close}
      >
        <div
          ref={dialogRef}
          className="media-lightbox-panel"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="media-lightbox-close"
            onClick={close}
            aria-label={closeLabel}
          >
            <X size={20} aria-hidden="true" />
          </button>

          <div
            className={
              activeItem.type === "embed"
                ? "media-lightbox-stage is-embed"
                : "media-lightbox-stage"
            }
          >
            {activeItem.type === "image" ? (
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="media-lightbox-media"
                priority
              />
            ) : activeItem.type === "embed" ? (
              <iframe
                className="media-lightbox-embed"
                src={activeItem.src}
                title={activeItem.alt}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <video
                className="media-lightbox-video"
                src={activeItem.src}
                poster={activeItem.poster}
                controls
                autoPlay
                playsInline
              />
            )}
          </div>

          <p className="media-lightbox-caption">{activeItem.alt}</p>

          {projectHref && projectLabel ? (
            <a
              className="media-lightbox-project"
              href={projectHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {projectLabel}
              <ExternalLink size={16} aria-hidden="true" />
              {opensInNewTab ? <span className="sr-only"> {opensInNewTab}</span> : null}
            </a>
          ) : null}

          {items.length > 1 ? (
            <div className="media-lightbox-nav">
              <button
                type="button"
                aria-label={previousLabel}
                onClick={() =>
                  setActiveIndex((activeIndex! - 1 + items.length) % items.length)
                }
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <span>
                {activeIndex! + 1} / {items.length}
              </span>
              <button
                type="button"
                aria-label={nextLabel}
                onClick={() =>
                  setActiveIndex((activeIndex! + 1) % items.length)
                }
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    ) : null;

  return (
    <>
      {coverOpensPreview ? (
        <button
          type="button"
          className={`project-cover project-cover-button${
            useVideoCover ? " is-video-cover" : ""
          }`}
          style={{ background: accent }}
          onClick={() => openAt(0)}
          aria-label={
            useVideoCover
              ? `${playVideoLabel}: ${coverAlt}`
              : `${expandLabel}: ${coverAlt}`
          }
        >
          {useVideoCover && primaryMedia ? (
            primaryMedia.type === "embed" ? (
              <iframe
                className="project-cover-embed"
                src={primaryMedia.src}
                title={primaryMedia.alt}
                tabIndex={-1}
                aria-hidden="true"
              />
            ) : (
              <video
                className="project-cover-video"
                src={primaryMedia.src}
                poster={primaryMedia.poster}
                muted
                playsInline
                preload="metadata"
                tabIndex={-1}
                aria-hidden="true"
              />
            )
          ) : (
            <Image
              src={cover}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="project-cover-image"
            />
          )}
          <span
            className={
              useVideoCover
                ? "project-cover-overlay is-video"
                : "project-cover-overlay"
            }
            aria-hidden="true"
          >
            {useVideoCover ? <Play size={22} /> : <Expand size={18} />}
            <span>{useVideoCover ? playVideoLabel : expandLabel}</span>
          </span>
        </button>
      ) : (
        <div className="project-cover" style={{ background: accent }}>
          <Image
            src={cover}
            alt={coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="project-cover-image"
          />
        </div>
      )}

      {showGalleryStrip ? (
        <div className="media-gallery">
          <p className="media-gallery-label">{galleryLabel}</p>
          <div className="media-gallery-track" role="list">
            {items.map((item, index) => (
              <button
                key={`${item.type}-${index}`}
                type="button"
                className="media-gallery-thumb"
                onClick={() => openAt(index)}
                aria-label={item.alt}
                role="listitem"
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="120px"
                    className="media-gallery-thumb-media"
                  />
                ) : (
                  <>
                    {item.poster ? (
                      <Image
                        src={item.poster}
                        alt=""
                        fill
                        sizes="120px"
                        className="media-gallery-thumb-media"
                      />
                    ) : (
                      <span
                        className="media-gallery-thumb-fallback"
                        aria-hidden="true"
                      >
                        <Play size={18} />
                      </span>
                    )}
                    <span className="media-gallery-thumb-play" aria-hidden="true">
                      <Play size={14} />
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
}
