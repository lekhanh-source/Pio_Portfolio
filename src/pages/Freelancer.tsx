import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { embedUrl, projects, type ProjectImage } from "../lib/projects";
import {
  otherProjectImages,
  otherProjectVideos,
} from "../lib/otherProjectMedia";

const label = "font-mono text-xs uppercase tracking-[0.25em]";
const pioProject = projects.find((project) => project.slug === "Pio");

const channelHighlights = [
  "Định hướng kênh chia sẻ về ẩm thực, địa điểm vui chơi và trải nghiệm tại Nha Trang.",
  "Chủ động lên ý tưởng, sản xuất video, viết nội dung và bắt trend trên các nền tảng mạng xã hội.",
  "Trong 3 tháng, có 2 video đạt hơn 100.000 lượt xem mỗi video; các thương hiệu tại Nha Trang chủ động liên hệ hợp tác truyền thông.",
];

function glow(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

function MediaCarousel({
  label,
  hasItems,
  children,
}: {
  label: string;
  hasItems: boolean;
  children: ReactNode;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
    captured: boolean;
  } | null>(null);
  const draggedRef = useRef(false);

  const scroll = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({
      left: direction * carousel.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if (
      event.target instanceof Element &&
      event.target.closest("video, iframe")
    ) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
      captured: false,
    };
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) {
      drag.moved = true;
      if (!drag.captured) {
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.captured = true;
      }
    }
    if (drag.moved) {
      event.preventDefault();
      event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
    }
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    draggedRef.current = drag.moved;
    dragRef.current = null;
    if (
      drag.captured &&
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (draggedRef.current) {
      window.setTimeout(() => {
        draggedRef.current = false;
      }, 0);
    }
  };

  return (
    <div className="mt-4 min-w-0 overflow-hidden">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          aria-label={`Xem ${label} trước`}
          onClick={() => scroll(-1)}
          disabled={!hasItems}
          className="grid h-10 cursor-pointer w-10 place-items-center rounded-full border bg-white/50 text-lg transition hover:border-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          ←
        </button>
        <button
          type="button"
          aria-label={`Xem ${label} tiếp theo`}
          onClick={() => scroll(1)}
          disabled={!hasItems}
          className="grid h-10 cursor-pointer w-10 place-items-center rounded-full border bg-white/50 text-lg transition hover:border-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          →
        </button>
      </div>
      <div
        ref={carouselRef}
        className="image-carousel media-carousel flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-4 active:cursor-grabbing"
        aria-label={label}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          if (!draggedRef.current) return;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Freelancer() {
  const imageCarouselRef = useRef<HTMLDivElement>(null);
  const [lightboxImages, setLightboxImages] = useState<ProjectImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const selectedImage =
    lightboxIndex === null ? null : lightboxImages[lightboxIndex] ?? null;

  const openLightbox = (images: ProjectImage[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  const moveLightbox = (direction: -1 | 1) => {
    setLightboxIndex((index) => {
      if (index === null || lightboxImages.length < 2) return index;
      return (
        (index + direction + lightboxImages.length) % lightboxImages.length
      );
    });
  };

  useEffect(() => {
    document.title = "Freelancer — Hoàng Thị Hậu";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, lightboxImages.length]);

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute -left-40 top-20 h-520px w-520px rounded-full bg-primary/20 blur-[120px]" />
      <Link
        to="/"
        state={{ scrollTo: "work" }}
        className={`fixed left-10 top-10 z-60 inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-3 text-primary-foreground shadow-xl transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${label}`}
      >
        <span aria-hidden="true">←</span> Quay lại
      </Link>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          onMouseMove={glow}
          className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-6 py-3"
        >
          <Link
            to="/"
            state={{ scrollTo: "top" }}
            className="font-display text-lg font-extrabold tracking-tight"
          >
            <span className="text-primary">HẬU HOÀNG</span>
          </Link>
          <div className={`hidden gap-8 md:flex ${label}`}>
            <Link
              to="/"
              state={{ scrollTo: "about" }}
              className="hover:text-primary"
            >
              About
            </Link>
            <Link
              to="/"
              state={{ scrollTo: "services" }}
              aria-current="page"
              className="text-primary underline decoration-2 underline-offset-8"
            >
              project
            </Link>
            <Link
              to="/"
              state={{ scrollTo: "contact" }}
              className="hover:text-primary"
            >
              Contact
            </Link>
          </div>
          <Link
            to="/"
            state={{ scrollTo: "contact" }}
            className={`rounded-full bg-foreground px-4 py-2 text-background ${label} text-[10px]`}
          >
            Hire me
          </Link>
        </nav>
      </header>

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-28 sm:px-8 md:pb-12">
        <header id="top" className="mt-12 scroll-mt-28">
          <p className={`${label} text-primary`}>— Freelance -</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold tracking-[-0.045em] sm:text-6xl md:text-8xl">
            Freelance Projects
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Những dự án sáng tạo nội dung, video và truyền thông được thực hiện
            cùng các thương hiệu tại Nha Trang.
          </p>
        </header>

        <section
          id="pio-channel"
          className="mt-12 scroll-mt-28"
          aria-labelledby="pio-channel-title"
        >
          <article className="glass rounded-[2rem] p-6 sm:p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(16rem,0.7fr)] md:items-center md:gap-12">
              <div>
                <p className={`${label} text-primary`}>
                  Nội dung chính · Social media
                </p>
                <h2
                  id="pio-channel-title"
                  className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
                >
                  Admin kênh: Pio Đi Đâu Đấy
                </h2>
                <ul className="mt-6 space-y-3 text-base leading-relaxed text-muted-foreground">
                  {channelHighlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-0.5 text-primary" aria-hidden="true">
                        •
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.tiktok.com/@pio.didau"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Xem kênh Pio Đi Đâu Đấy trên TikTok (mở tab mới)"
                  className={`mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${label}`}
                >
                  Xem kênh TikTok <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="glass rounded-3xl p-5 sm:p-6">
                  <p className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
                    03
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    tháng phát triển nội dung
                  </p>
                </div>
                <div className="glass rounded-3xl p-5 sm:p-6">
                  <p className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
                    2×
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    video vượt 100.000 lượt xem
                  </p>
                </div>
                <div className="glass col-span-2 rounded-3xl p-5 sm:p-6">
                  <p className={`${label} text-muted-foreground`}>
                    Nội dung kênh
                  </p>
                  <p className="mt-2 font-display text-xl font-bold sm:text-2xl">
                    Ẩm thực · Địa điểm · Trải nghiệm Nha Trang
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section
          id="pio-media"
          className="mt-16 scroll-mt-28 sm:mt-20"
          aria-labelledby="pio-media-title"
        >
          <p className={`${label} text-primary`}>Pio Đi Đâu Đấy</p>
          <div className="mt-6 grid gap-12">
            <section aria-labelledby="pio-images-title">
              <h2
                id="pio-images-title"
                className="font-display text-3xl font-extrabold sm:text-4xl"
              >
                Hình ảnh
              </h2>
              {(pioProject?.images?.length ?? 0) > 0 ? (
                <div className="mt-6 overflow-hidden">
                  <div className="mb-4 flex justify-end gap-2">
                    <button
                      type="button"
                      aria-label="Xem ảnh trước"
                      onClick={() =>
                        imageCarouselRef.current?.scrollBy({
                          left: -imageCarouselRef.current.clientWidth * 0.8,
                          behavior: "smooth",
                        })
                      }
                      className="grid h-11 cursor-pointer w-11 place-items-center rounded-full border bg-white/50 text-lg transition hover:border-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      aria-label="Xem ảnh tiếp theo"
                      onClick={() =>
                        imageCarouselRef.current?.scrollBy({
                          left: imageCarouselRef.current.clientWidth * 0.8,
                          behavior: "smooth",
                        })
                      }
                      className="grid h-11 cursor-pointer w-11 place-items-center rounded-full border bg-white/50 text-lg transition hover:border-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      →
                    </button>
                  </div>
                  <div
                    ref={imageCarouselRef}
                    className="image-carousel media-carousel flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden pb-4"
                    aria-label="Carousel hình ảnh Pio Đi Đâu Đấy"
                  >
                    {pioProject?.images?.map((image, imageIndex) => (
                      <figure
                        key={image.url}
                        className="w-[85%] shrink-0 snap-start sm:w-[55%] lg:w-[32%]"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openLightbox(pioProject?.images ?? [], imageIndex)
                          }
                          aria-label={`Mở ảnh kích thước đầy đủ: ${image.alt ?? image.title ?? "Pio Đi Đâu Đấy"}`}
                          className="glass block w-full cursor-zoom-in overflow-hidden rounded-3xl p-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                        >
                          <img
                            src={image.url}
                            alt={image.alt ?? image.title ?? "Pio Đi Đâu Đấy"}
                            loading="lazy"
                            className="block h-72 w-full rounded-2xl object-contain sm:h-80"
                          />
                        </button>
                        {image.title && (
                          <figcaption className="pt-2 text-center text-sm text-muted-foreground">
                            {image.title}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-4 rounded-2xl border border-dashed p-5 text-sm text-muted-foreground">
                  Chưa có hình ảnh. Thêm dữ liệu vào `images` của project
                  Freelancer trong `projects.ts` để hiển thị tại đây.
                </p>
              )}
            </section>

            <section aria-labelledby="pio-videos-title">
              <h2
                id="pio-videos-title"
                className="font-display text-3xl font-extrabold sm:text-4xl"
              >
                Video
              </h2>
              {(pioProject?.videos.length ?? 0) > 0 ? (
                <MediaCarousel
                  label="video Pio Đi Đâu Đấy"
                  hasItems={(pioProject?.videos.length ?? 0) > 0}
                >
                  {pioProject?.videos.map((video) => {
                    const source = video.sourceFile ?? video.url;
                    const embed = source ? embedUrl(source) : null;
                    const isPortrait =
                      video.orientation === "portrait" ||
                      video.platform === "TikTok" ||
                      video.platform === "Facebook";

                    return (
                      <figure
                        key={video.title}
                        className={`glass w-[85%] shrink-0 snap-start rounded-3xl p-3 sm:w-[55%] lg:w-[32%] ${
                          isPortrait ? "max-w-sm" : ""
                        }`}
                      >
                        <div
                          className={`${
                            isPortrait ? "aspect-9/16" : "aspect-video"
                          } overflow-hidden rounded-2xl bg-muted`}
                        >
                          {embed?.kind === "iframe" && (
                            <iframe
                              src={embed.src}
                              title={video.title}
                              className="h-full w-full border-0"
                              loading="lazy"
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          )}
                          {embed?.kind === "video" && (
                            <video
                              src={embed.src}
                              controls
                              preload="metadata"
                              className="h-full w-full object-contain"
                            />
                          )}
                          {!embed && (
                            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                              Chưa có liên kết video
                            </div>
                          )}
                        </div>
                        <figcaption className="px-3 py-3 font-semibold">
                          {video.title}
                        </figcaption>
                        {video.url && video.platform !== "Local" && (
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 text-sm text-primary underline underline-offset-4"
                          >
                            Xem video gốc ↗
                          </a>
                        )}
                        <dl className="flex flex-wrap gap-x-5 gap-y-2 px-3 py-3 text-xs text-muted-foreground sm:text-sm">
                          {(
                            [
                              ["Lượt xem", video.stats?.views],
                              ["Like", video.stats?.likes],
                              ["Lưu", video.stats?.saves],
                            ] as const
                          ).map(([label, value]) => (
                            <div key={label} className="flex gap-1.5">
                              <dt>{label}:</dt>
                              <dd className="font-semibold text-foreground">
                                {value ?? "—"}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </figure>
                    );
                  })}
                </MediaCarousel>
              ) : (
                <p className="mt-4 rounded-2xl border border-dashed p-5 text-sm text-muted-foreground">
                  Chưa có video. Thêm dữ liệu vào `videos` của project
                  Freelancer trong `projects.ts` để hiển thị tại đây.
                </p>
              )}
            </section>
          </div>
        </section>

        <section
          id="other-freelance"
          className="mt-20 scroll-mt-28 sm:mt-24"
          aria-labelledby="other-freelance-title"
        >
          <p className={`${label} text-primary`}>Selected collaborations</p>
          <h2
            id="other-freelance-title"
            className="mt-3 font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl md:text-6xl"
          >
            Các dự án khác
          </h2>

          <div className="mt-8 space-y-10 md:mt-12 md:space-y-14">
            <section aria-labelledby="other-project-images-title">
              <h3
                id="other-project-images-title"
                className="font-display text-2xl font-extrabold"
              >
                Hình ảnh
              </h3>
              <MediaCarousel
                label="ảnh các dự án khác"
                hasItems={otherProjectImages.length > 0}
              >
                {otherProjectImages.length ? (
                  otherProjectImages.map((image, imageIndex) => (
                    <figure
                      key={image.url}
                      className="w-[85%] shrink-0 snap-start sm:w-[55%] lg:w-[32%]"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          openLightbox(otherProjectImages, imageIndex)
                        }
                        aria-label={`Mở ảnh: ${image.title}`}
                        className="glass block w-full cursor-zoom-in overflow-hidden rounded-3xl p-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      >
                        <img
                          src={image.url}
                          alt={image.alt ?? image.title}
                          loading="lazy"
                          className="h-64 w-full rounded-2xl object-contain sm:h-72"
                        />
                      </button>
                      <figcaption className="pt-3 text-center text-sm font-semibold">
                        {image.title}
                      </figcaption>
                    </figure>
                  ))
                ) : (
                  <p className="flex min-h-40 w-full shrink-0 items-center justify-center rounded-3xl border border-dashed text-sm text-muted-foreground">
                    Thêm hình và tiêu đề vào `otherProjectImages` trong
                    `otherProjectMedia.ts`.
                  </p>
                )}
              </MediaCarousel>
            </section>

            <section aria-labelledby="other-project-videos-title">
              <h3
                id="other-project-videos-title"
                className="font-display text-2xl font-extrabold"
              >
                Video
              </h3>
              <MediaCarousel
                label="video các dự án khác"
                hasItems={otherProjectVideos.length > 0}
              >
                {otherProjectVideos.length ? (
                  otherProjectVideos.map((video) => (
                    <figure
                      key={video.url}
                      className={`w-[85%] shrink-0 snap-start sm:w-[55%] lg:w-[32%] ${
                        video.orientation !== "landscape" ? "max-w-sm" : ""
                      }`}
                    >
                      <div className="glass rounded-3xl p-3">
                        <div
                          className={`${
                            video.orientation === "landscape"
                              ? "aspect-video"
                              : "aspect-9/16"
                          } overflow-hidden rounded-2xl bg-muted`}
                        >
                          {video.embedUrl ? (
                            <iframe
                              src={video.embedUrl}
                              title={video.title}
                              className="h-full w-full border-0"
                              loading="lazy"
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              src={video.url}
                              poster={video.thumbnail}
                              controls
                              preload="metadata"
                              className="h-full w-full object-contain"
                            />
                          )}
                        </div>
                      </div>
                      <figcaption className="px-3 pt-3 text-center">
                        <p className="font-semibold">{video.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {video.subtitle}
                        </p>
                      </figcaption>
                    </figure>
                  ))
                ) : (
                  <p className="flex min-h-40 w-full shrink-0 items-center justify-center rounded-3xl border border-dashed text-sm text-muted-foreground">
                    Thêm video, tiêu đề và phụ đề vào `otherProjectVideos` trong
                    `otherProjectMedia.ts`.
                  </p>
                )}
              </MediaCarousel>
            </section>
          </div>
        </section>
      </div>
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            selectedImage.alt ?? selectedImage.title ?? "Ảnh Pio Đi Đâu Đấy"
          }
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4"
        >
          <button
            type="button"
            autoFocus
            onClick={() => setLightboxIndex(null)}
            aria-label="Đóng ảnh"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-3xl text-white transition hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            ×
          </button>
          {lightboxImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  moveLightbox(-1);
                }}
                aria-label="Xem ảnh trước"
                className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-3xl text-white transition hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-8"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  moveLightbox(1);
                }}
                aria-label="Xem ảnh tiếp theo"
                className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-3xl text-white transition hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8"
              >
                ›
              </button>
            </>
          )}
          <img
            src={selectedImage.url}
            alt={selectedImage.alt ?? selectedImage.title ?? "Pio Đi Đâu Đấy"}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-[min(92vw,72rem)] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </main>
  );
}
