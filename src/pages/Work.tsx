import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, embedUrl, type ProjectImage } from "../lib/projects";


const label = "font-mono text-xs uppercase tracking-[0.25em] text-orange-500";

function ResultImageFigure({ image }: { image: ProjectImage }) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <figure>
      {unavailable ? (
        <div className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed bg-background/50 px-4 text-center text-sm text-muted-foreground">
          <span>Thêm ảnh vào đường dẫn:</span>
          <code>{image.url}</code>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-background/50">
          <img
            src={image.url}
            alt={image.alt ?? image.title}
            className="block h-auto w-full object-contain"
            loading="lazy"
            onError={() => setUnavailable(true)}
          />
        </div>
      )}
      <figcaption className="mt-2 text-center font-mono text-sm text-muted-foreground">{image.title}</figcaption>
    </figure>
  );
}

export default function Work() {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const p = projects.find((x) => x.slug === slug);
  useEffect(() => { window.scrollTo(0, 0); if (p) document.title = `${p.title} — Hoàng Thị Hậu`; }, [p]);
  useEffect(() => {
    if (!selectedImage) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedImage]);
  if (!p) return <div className="flex min-h-screen items-center justify-center"><Link to="/" className="underline">Không tìm thấy dự án — về trang chủ</Link></div>;
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length] ?? p;

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute -left-40 top-20 h-520px w-520px rounded-full bg-primary/25 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link to="/" className={`glass inline-block rounded-full px-5 py-3 ${label}`}>← Quay lại</Link>

        <header className="mt-14 grid items-center gap-8 md:grid-cols-12 lg:gap-12">
          <div className="min-w-0 md:col-span-7">
            <p className={`${label} text-primary`}>{p.category} · {p.industry}</p>
            <h1 className="mt-6 max-w-full break-words font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-orange-500 sm:text-5xl md:text-6xl">{p.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{p.intro}</p>
          </div>
          <div className="glass rounded-3xl p-6 md:col-span-5 md:p-7">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div><dt className={`${label} text-muted-foreground`}>Vai trò</dt><dd className="mt-1 font-semibold">{p.role}</dd></div>
              <div><dt className={`${label} text-muted-foreground`}>Thời gian</dt><dd className="mt-1 font-semibold">{p.period}</dd></div>
              <div className="col-span-2 border-t pt-4"><dt className={`${label} text-muted-foreground`}>Kết quả</dt><dd className="mt-1 font-mono text-2xl font-bold text-primary">{p.result}</dd></div>
            </dl>
          </div>
        </header>

        <img src={p.image} alt={p.title} width={1024} height={768} className="mt-14 aspect-16/8 w-full rounded-[2rem] object-contain" />

        {p.caseStudy && (
          <section className="mt-24">
            <p className={`font-mono text-lg uppercase tracking-[0.25em] text-primary pb-4`}>WORK PORTFOLIO</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">{p.caseStudy.title}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="glass rounded-3xl p-7 md:p-8">
                <h3 className="font-display text-2xl font-extrabold">Giới thiệu công ty</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{p.caseStudy.companyIntro}</p>
              </article>
              <article className="glass rounded-3xl p-7 md:p-8">
                <h3 className="font-display text-2xl font-extrabold">Vấn đề</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{p.caseStudy.challenge}</p>
              </article>
              <article className="glass rounded-3xl p-7 md:col-span-2 md:p-8">
                <h3 className="font-display text-2xl font-extrabold">Nhiệm vụ</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{p.caseStudy.responsibilities}</p>
              </article>
              <article className="glass rounded-3xl bg-primary/5 p-7 md:col-span-2 md:p-8">
                <h3 className="font-display text-2xl font-extrabold">Kết quả</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{p.caseStudy.resultDetail}</p>
                {p.resultImages && p.resultImages.length > 0 && (
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {p.resultImages.map((image) => <ResultImageFigure key={image.title} image={image} />)}
                  </div>
                )}
              </article>
            </div>
          </section>
        )}

        <section className="mt-24">
          <p className={`font-mono text-LG uppercase tracking-[0.25em] text-primary`}>RESULT</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Sản phẩm thực tế</h2>
          {p.images && (
            <div className="mt-10">
              <h3 className="font-display text-2xl font-extrabold">Hình ảnh</h3>
              {p.images.length > 0 ? (
                <div className="mt-5 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {p.images.map((image) => (
                    <figure key={image.url} className="glass rounded-3xl p-3">
                      <button
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        aria-label={`Mở ảnh kích thước đầy đủ: ${image.alt ?? image.title}`}
                        className="block w-full cursor-zoom-in rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      >
                        <img src={image.url} alt={image.alt ?? image.title} className="block h-auto w-full rounded-2xl object-contain" loading="lazy" />
                      </button>
                    </figure>
                  ))}
                </div>
              ) : (
                <p className="mt-5 rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
                  Chưa có ảnh sản phẩm gốc. Vui lòng bổ sung file ảnh để hiển thị tại đây.
                </p>
              )}
            </div>
          )}
          {p.videos.length > 0 && (
            <div className="mt-10">
              <h3 className="font-display text-2xl font-extrabold">Video</h3>
              <div className="mt-5 grid gap-6 md:grid-cols-3">
              {p.videos.map((v) => {
                const playbackUrl = v.sourceFile ?? v.url;
                const e = playbackUrl ? embedUrl(playbackUrl) : null;
                const isPortraitVideo = v.orientation === "portrait" || v.platform === "Facebook" || v.platform === "TikTok";
                return (
                  <figure key={v.title} className={`glass rounded-3xl p-3 ${isPortraitVideo ? "mx-auto w-full max-w-sm" : ""}`}>
                    <div className={`${isPortraitVideo ? "aspect-[9/16]" : "aspect-video"} overflow-hidden rounded-2xl bg-muted`}>
                      {e?.kind === "iframe" && <iframe src={e.src} title={v.title} className="block h-full w-full border-0" loading="eager" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen />}
                      {e?.kind === "video" && <video src={e.src} controls preload="auto" className="h-full w-full object-contain" />}
                      {!e && <div className="flex h-full items-center justify-center font-mono text-sm text-muted-foreground">▶ Video chưa có liên kết</div>}
                    </div>
                    <figcaption className="flex items-baseline gap-2 overflow-hidden px-3 py-3">
                      <p className="shrink-0 font-display font-bold">{v.title}</p>
                      {/* <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">{v.platform}</span> */}
                      {v.subtitle && <p className="truncate whitespace-nowrap text-xs font-normal text-muted-foreground">({v.subtitle})</p>}
                    </figcaption>
                    {v.platform !== "Local" && v.url && (
                      <a href={v.url} target="_blank" rel="noreferrer" className="px-3 text-sm text-primary underline underline-offset-4">
                        Xem video gốc
                      </a>
                    )}
                    <dl className="flex flex-wrap gap-x-5 gap-y-2 border-t px-3 py-3 text-xs text-muted-foreground sm:text-sm">
                      {([
                        ["Lượt xem", v.stats?.views],
                        ["Like", v.stats?.likes],
                        ["Lưu", v.stats?.saves],
                      ] as const).map(([label, value]) => (
                        <div key={label} className="flex gap-1.5">
                          <dt>{label}:</dt>
                          <dd className="font-semibold text-foreground">{value ?? "—"}</dd>
                        </div>
                      ))}
                    </dl>
                  </figure>
                );
              })}
              </div>
            </div>
          )}
        </section>

        {/* <section className="mt-24">
          <p className={`${label} text-primary`}>Quá trình</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Cách tôi làm việc</h2>
          <ol className="mt-10 space-y-4">
            {p.process.map((s, i) => (
              <li key={s.phase} className="grid gap-4 border-t py-6 md:grid-cols-12">
                <span className="font-mono text-sm text-primary md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-2xl font-extrabold md:col-span-4">{s.phase}</h3>
                <p className="text-muted-foreground md:col-span-7">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-2">
            {p.tasks.map((t) => <span key={t} className="rounded-full border px-4 py-1.5 font-mono text-xs">{t}</span>)}
          </div>
        </section> */}

        <Link to={`/work/${next.slug}`} className="glass mt-24 block rounded-[2rem] p-10 transition hover:-translate-y-1">
          <p className={`${label} text-muted-foreground`}>Dự án tiếp theo</p>
          <p className="mt-2 font-display text-4xl font-extrabold md:text-6xl">{next.title} →</p>
        </Link>
      </div>
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt ?? selectedImage.title}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
        >
          <button
            type="button"
            autoFocus
            onClick={() => setSelectedImage(null)}
            aria-label="Đóng ảnh"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-3xl text-white transition hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            ×
          </button>
          <img
            src={selectedImage.url}
            alt={selectedImage.alt ?? selectedImage.title}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
