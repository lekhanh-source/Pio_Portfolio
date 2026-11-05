import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, embedUrl } from "../lib/projects";


const label = "font-mono text-xs uppercase tracking-[0.25em]";

export default function Work() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  useEffect(() => { window.scrollTo(0, 0); if (p) document.title = `${p.title} — Hoàng Thị Hậu`; }, [p]);
  if (!p) return <div className="flex min-h-screen items-center justify-center"><Link to="/" className="underline">Không tìm thấy dự án — về trang chủ</Link></div>;
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length] ?? p;

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-primary/25 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link to="/" className={`glass inline-block rounded-full px-5 py-3 ${label}`}>← Quay lại</Link>

        <header className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className={`${label} text-primary`}>{p.category} · {p.industry}</p>
            <h1 className="mt-4 font-display text-6xl font-extrabold tracking-[-0.04em] md:text-8xl">{p.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.intro}</p>
          </div>
          <div className="glass self-end rounded-3xl p-6 md:col-span-5">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div><dt className={`${label} text-muted-foreground`}>Vai trò</dt><dd className="mt-1 font-semibold">{p.role}</dd></div>
              <div><dt className={`${label} text-muted-foreground`}>Thời gian</dt><dd className="mt-1 font-semibold">{p.period}</dd></div>
              <div className="col-span-2 border-t pt-4"><dt className={`${label} text-muted-foreground`}>Kết quả</dt><dd className="mt-1 font-mono text-2xl font-bold text-primary">{p.result}</dd></div>
            </dl>
          </div>
        </header>

        <img src={p.image} alt={p.title} width={1024} height={768} className="mt-14 aspect-[16/8] w-full rounded-[2rem] object-cover" />

        <section className="mt-24">
          <p className={`${label} text-primary`}>Video</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Sản phẩm thực tế</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {p.videos.map((v) => {
              const e = v.url ? embedUrl(v.url) : null;
              return (
                <figure key={v.title} className="glass rounded-3xl p-3">
                  <div className="aspect-video overflow-hidden rounded-2xl bg-muted">
                    {e?.kind === "iframe" && <iframe src={e.src} title={v.title} className="h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />}
                    {e?.kind === "video" && <video src={e.src} controls className="h-full w-full object-cover" />}
                    {!e && <div className="flex h-full items-center justify-center font-mono text-sm text-muted-foreground">▶ Video sắp cập nhật</div>}
                  </div>
                  <figcaption className="px-3 py-3 font-display font-bold">{v.title}</figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        <section className="mt-24">
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
        </section>

        <Link to={`/work/${next.slug}`} className="glass mt-24 block rounded-[2rem] p-10 transition hover:-translate-y-1">
          <p className={`${label} text-muted-foreground`}>Dự án tiếp theo</p>
          <p className="mt-2 font-display text-4xl font-extrabold md:text-6xl">{next.title} →</p>
        </Link>
      </div>
    </div>
  );
}
