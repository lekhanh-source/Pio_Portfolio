import { Link } from "react-router-dom";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import portrait from "../assets/portrait.jpg";
import { projects } from "../lib/projects";


const services = [
  { n: "01", t: "Content Strategy", items: ["Customer insight analysis", "Content planning", "Social media strategy", "Campaign planning"] },
  { n: "02", t: "Content Creation", items: ["Short-form video scripts", "Social media content", "Food review", "Storytelling"] },
  { n: "03", t: "Video Production", items: ["Filming", "Video editing", "CapCut", "Livestream production"] },
  { n: "04", t: "Creative Design", items: ["Canva", "Visual communication", "AI-assisted design", "Creative direction"] },
];

function glow(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>+{v}</span>;
}

const label = "font-mono text-xs uppercase tracking-[0.25em]";

export default function Home() {
  useReveal();
  useEffect(() => { document.title = "Hoàng Thị Hậu — Content Creator & Content Marketing"; }, []);
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-[40%] h-[420px] w-[420px] rounded-full bg-secondary/30 blur-[120px]" />

      {/* NAV */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav onMouseMove={glow} className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("top")?.scrollIntoView({ behavior: "smooth" }); }} className="font-display text-lg font-extrabold tracking-tight">HẬU<span className="text-primary">.</span></a>
          <div className={`hidden gap-8 md:flex ${label}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-primary">About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-primary">Services</a>
            <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-primary">Work</a>
            <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-primary">Contact</a>
          </div>
          <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className={`rounded-full bg-foreground px-4 py-2 text-background ${label} text-[10px]`}>Hire me</a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pt-28 pb-16 md:grid-cols-12">
        <div className="relative z-10 md:col-span-7">
          <p className={`${label} text-primary reveal`}>● Creative Content Creator</p>
          <h1 className="reveal mt-6 font-display text-6xl font-extrabold leading-[0.92] tracking-[-0.04em] md:text-8xl lg:text-[8.5rem]">
            Turning Ideas <span className="italic text-primary">Into</span> Stories.
          </h1>
          <p className="reveal mt-6 max-w-md text-lg text-muted-foreground">Sáng tạo nội dung. Kể câu chuyện thương hiệu.</p>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }} className={`rounded-full bg-primary px-7 py-4 text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)] ${label}`}>Explore my work →</a>
            <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} onMouseMove={glow} className={`glass rounded-full px-7 py-4 ${label}`}>Let's connect</a>
          </div>
        </div>
        <div className="relative md:col-span-5">
          <div className="reveal relative overflow-hidden rounded-[2.5rem]">
            <img src={portrait} alt="Hoàng Thị Hậu" width={896} height={1152} className="h-[78vh] w-full object-cover" />
          </div>
          <div onMouseMove={glow} className="glass animate-float absolute -left-10 bottom-10 rounded-3xl p-5 md:-left-24">
            <p className={`${label} text-muted-foreground`}>Name</p>
            <p className="font-display text-2xl font-extrabold">HOÀNG THỊ HẬU</p>
            <p className="mt-1 text-sm text-muted-foreground">Content Creator | Content Marketing | Video Production</p>
          </div>
          <div onMouseMove={glow} className="glass absolute -right-3 top-8 rounded-2xl px-4 py-3 font-mono text-sm">
            <span className="text-primary">●</span> Open to work
          </div>
        </div>
        <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }} className={`absolute bottom-6 left-6 ${label} text-muted-foreground`}>Scroll ↓</a>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-28">
        <p className={`${label} text-primary`}>02 — About me</p>
        <div className="mt-6 grid gap-12 md:grid-cols-2">
          <h2 className="reveal font-display text-5xl font-extrabold tracking-[-0.03em] md:text-7xl">Behind The Creativity.</h2>
          <div className="reveal space-y-6 text-lg leading-relaxed">
            <p>Tôi là Hậu – yêu thích sáng tạo, ham học hỏi và chủ động phát triển bản thân. Tôi từng đảm nhận các vị trí Content Marketing, Content Creator và Editor, phụ trách lên kế hoạch nội dung, viết kịch bản short video, sản xuất hình ảnh/video và hỗ trợ truyền thông.</p>
            <p className="text-muted-foreground"><span className="font-semibold text-foreground">Mục tiêu:</span> Trở thành Marketing Leader có khả năng dẫn dắt đội nhóm, xây dựng chiến lược và tạo ra giá trị thực tế cho thương hiệu.</p>
            <div className="flex flex-wrap gap-2">
              {["Content Marketing", "Content Creator", "Video Editing", "Social Strategy", "AI-assisted Production"].map((t) => (
                <span key={t} className="rounded-full border px-4 py-1.5 font-mono text-xs">{t}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[{ n: 2, l: "Years of marketing experience" }, { n: 5, l: "Freelance projects" }].map((s) => (
                <div key={s.l} onMouseMove={glow} className="glass rounded-3xl p-6">
                  <p className="font-mono text-6xl font-bold text-primary"><Counter to={s.n} /></p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-28">
        <p className={`${label} text-primary`}>03 — What I do</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.n} onMouseMove={glow} className="glass reveal group rounded-3xl p-7 transition duration-500 hover:-translate-y-2">
              <p className="font-mono text-sm text-primary">{s.n}</p>
              <h3 className="mt-16 font-display text-2xl font-extrabold">{s.t}</h3>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {s.items.map((i) => <li key={i} className="border-t pt-2 transition group-hover:text-foreground">{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={`${label} text-primary`}>04 — Featured projects</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-[-0.03em] md:text-7xl">Selected Work.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`rounded-full px-4 py-2 font-mono text-xs transition ${filter === c ? "bg-foreground text-background" : "border hover:border-primary"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="mt-14 space-y-20">
          {shown.map((p, i) => (
            <article key={p.title} className={`reveal grid items-center gap-8 md:grid-cols-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <Link to={`/work/${p.slug}`} className="group relative overflow-hidden rounded-[2rem] md:col-span-7">
                <span className={`glass absolute bottom-5 left-5 z-10 rounded-full px-5 py-3 ${label}`}>▶ Xem video & quá trình</span>
                <img src={p.image} alt={p.title} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
              </Link>
              <div onMouseMove={glow} className="glass rounded-3xl p-8 md:col-span-5">
                <p className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")} · {p.industry}</p>
                <h3 className="mt-3 font-display text-4xl font-extrabold">{p.title}</h3>
                <p className="mt-1 text-sm text-primary">{p.role}</p>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {p.tasks.map((t) => <li key={t}>— {t}</li>)}
                </ul>
                <p className="mt-6 border-t pt-4 font-mono text-lg font-bold">{p.result}</p>
                <Link to={`/work/${p.slug}`} className={`mt-5 inline-block text-primary ${label}`}>Xem chi tiết →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-28">
        <div onMouseMove={glow} className="glass rounded-[2.5rem] p-10 md:p-16">
          <p className={`${label} text-primary`}>05 — Contact</p>
          <h2 className="mt-4 font-display text-5xl font-extrabold tracking-[-0.03em] md:text-8xl">Let's create<br />something <span className="italic text-primary">real.</span></h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="mailto:hello@example.com" className={`rounded-full bg-primary px-7 py-4 text-primary-foreground ${label}`}>Email me</a>
            <a href="#" className={`rounded-full border px-7 py-4 ${label}`}>Facebook</a>
            <a href="#" className={`rounded-full border px-7 py-4 ${label}`}>TikTok</a>
          </div>
        </div>
        <p className="mt-10 text-center font-mono text-xs text-muted-foreground">© 2026 Hoàng Thị Hậu</p>
      </section>
    </div>
  );
}
