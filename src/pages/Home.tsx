import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import portrait from "../assets/portrait.jpg";
import about from "../assets/about.jpg";
import { projects } from "../lib/projects";

const services = [
  {
    title: "Content MARKETING",
    items: [
      "(08/2025 - 06/2026)",
      "Lĩnh vực: FMCG",
      "Công ty TNHH & DV Thế Giới Gia Dụng Uyên Uyên",
      "Vị trí: Content Marketing (content plan, plan event, kịch bản short video, edit video, design, MC nội bộ, VJ, chạy ads cơ bản)",
    ],
    bulleted: true,
  },
    {
    title: "Content MARKETING",
    items: [
      "(10/2024 - 05/2025)",
      "Lĩnh vực: Agency",
      "Công Ty TNHH Hằng Thu Media",
      "Vị trí: Content Marketing (plan content, kịch bản short video, đàm phán với khách hàng, host livestream)",
    ],
    bulleted: true,
  },
  {
    title: "Content CREATOR",
    items: [
      "(03/2025 - 07/2025)",
      "Lĩnh vực: F&B",
      "Công ty TNHH Truyền Thông Sự Kiện Alibaba Media",
      "Vị trí: Content Creator (plan content, reviewer các quán ăn, quay - dựng short video)",
    ],
    bulleted: true,
  },
  {
    title: "TRỢ LÝ KOC KHÁNH HOÀ - PARTTIME",
    items: [
      "(05/2024 - 09/2024)",
      "Lĩnh vực: Giáo dục - Đào tạo",
      "CT CPĐT AGAIN GROUP",
      "Vị trí: Thư ký - Trợ lý 9KOC - Hỗ trợ đào tạo",
    ],
    bulleted: true,
  },
  {
    title: "FREELANCE - PARTTIME",
    items: [
      "Content Marketing - Nha Khoa V Dental",
      "Content Marketing - Xưởng cà phê LEO Arabica",
      "Event Runner - Hộ Kinh Doanh Mai Thanh Hùng",
      "Video editor, VJ",
    ],
    bulleted: true,
  },
];

const headingParts = { start: "Port", emphasis: "folio", end: "" };
const fullHeadingLength = Object.values(headingParts).join("").length;

function glow(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
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

function TypewriterHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [started, setStarted] = useState(false);
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    const heading = ref.current;
    if (!heading) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedCount(fullHeadingLength);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || typedCount >= fullHeadingLength) return;

    const timeout = window.setTimeout(() => {
      setTypedCount((count) => count + 1);
    }, 55);
    return () => window.clearTimeout(timeout);
  }, [started, typedCount]);

  return (
    <h1
      ref={ref}
      aria-label="Biến ý tưởng thành câu chuyện."
      className="reveal mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.045em] text-balance sm:text-6xl md:text-7xl xl:text-[7rem]"
    >
      <span aria-hidden="true">
        {headingParts.start.slice(0, typedCount)}
<span className="text-metallic-orange inline-block italic tracking-[-0.01em] underline decoration-primary/30 decoration-4 underline-offset-8">          {headingParts.emphasis.slice(
            0,
            Math.max(0, typedCount - headingParts.start.length),
          )}
        </span>
        {headingParts.end.slice(
          0,
          Math.max(
            0,
            typedCount -
              headingParts.start.length -
              headingParts.emphasis.length,
          ),
        )}
        {typedCount < fullHeadingLength && (
          <span className="animate-cursor-blink ml-0.5 inline-block h-[0.8em] border-r-2 border-current align-[-0.08em]" />
        )}
      </span>
    </h1>
  );
}

const label = "font-mono text-xs uppercase tracking-[0.25em]";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useReveal();
  const [activeNavSection, setActiveNavSection] = useState("top");
  useEffect(() => {
    document.title = "Hoàng Thị Hậu — Content Creator & Content Marketing";
  }, []);
  useEffect(() => {
    const sectionIds = ["about", "services", "work", "contact"];
    const updateActiveSection = () => {
      const isNearPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 80;
      if (isNearPageBottom) {
        setActiveNavSection("contact");
        return;
      }

      const activeLine = window.innerHeight * 0.45;
      const currentSection = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null)
        .reverse()
        .find((section) => section.getBoundingClientRect().top <= activeLine);

      setActiveNavSection(
        currentSection?.id === "work" ? "services" : currentSection?.id ?? "top",
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (typeof target !== "string") return;

    const timeout = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      navigate(location.pathname, { replace: true, state: null });
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.state, navigate]);
  const [filter, setFilter] = useState("All");
  const featuredProjects = projects.filter(
    (project) =>
      project.title !== "NHA KHOA V DENTAL" &&
      project.title !== "Xưởng cà phê Leo Arabica",
  );
  const cats = [
    "All",
    ...Array.from(new Set(featuredProjects.map((project) => project.category))),
  ];
  const shown =
    filter === "All"
      ? featuredProjects
      : featuredProjects.filter((project) => project.category === filter);

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute -left-40 top-20 h-520px w-520px rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-[40%] h-420px w-420px rounded-full bg-secondary/30 blur-[120px]" />

      {/* NAV */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          onMouseMove={glow}
          className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-6 py-3"
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("top")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-display text-lg font-extrabold tracking-tight"
          >
            HẬU<span className="text-primary"> HOÀNG</span>
          </a>
          <div className={`hidden gap-8 md:flex ${label}`}>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-current={activeNavSection === "about" ? "location" : undefined}
              className={`hover:text-primary ${
                activeNavSection === "about"
                  ? "text-primary underline decoration-2 underline-offset-8"
                  : ""
              }`}
            >
              About
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-current={activeNavSection === "services" ? "location" : undefined}
              className={`hover:text-primary ${
                activeNavSection === "services"
                  ? "text-primary underline decoration-2 underline-offset-8"
                  : ""
              }`}
            >
              project
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-current={activeNavSection === "contact" ? "location" : undefined}
              className={`hover:text-primary ${
                activeNavSection === "contact"
                  ? "text-primary underline decoration-2 underline-offset-8"
                  : ""
              }`}
            >
              Contact
            </a>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-current={activeNavSection === "contact" ? "location" : undefined}
            className={`rounded-full bg-foreground px-4 py-2 text-background ${label} text-[10px] ${
              activeNavSection === "contact"
                ? "text-primary underline decoration-2 underline-offset-4"
                : ""
            }`}
          >
            Hire me
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="top"
        className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pt-28 pb-16 md:grid-cols-12"
      >
        <div className="relative z-10 md:col-span-7">
          <p
            className={`font-mono uppercase tracking-[0.25em] text-primary reveal text-lg`}
          >
            ● Creative
          </p>
          <TypewriterHeading />
          <div className="reveal mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-lg text-primary">
            <a
              href="tel:+84828552134"
              className="inline-flex items-center gap-3 transition hover:opacity-75"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.56 3.58.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.46.56 3.58a1 1 0 0 1-.25 1.01l-2.19 2.2Z" />
              </svg>
              <span>082 855 2134</span>
            </a>
            <a
              href="mailto:hthau223@gmail.com"
              className="inline-flex items-center gap-3 transition hover:opacity-75"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
              </svg>
              <span>hthau223@gmail.com</span>
            </a>
          </div>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <div className="hero-action-float">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseMove={glow}
                className={`liquid-glass-button inline-flex items-center rounded-full bg-metallic-orange px-7 py-4 text-white shadow-sm transition hover:-translate-y-0.5 hover:brightness-105 hover:shadow-var(--shadow-glass) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${label}`}
              >
                <span>explore my work →</span>
              </a>
            </div>
            <div className="hero-action-float">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseMove={glow}
                className={`glass liquid-glass-button inline-flex items-center rounded-full px-7 py-4 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${label}`}
              >
                <span>Let's Connect</span>
              </a>
            </div>
          </div>
        </div>
        <div className="relative md:col-span-5">
          <div className="reveal relative overflow-hidden rounded-[2.5rem]">
            <img
              src={portrait}
              alt="Hoàng Thị Hậu"
              width={896}
              height={1152}
              className="h-[78vh] w-full object-cover"
            />
          </div>
          <div
            onMouseMove={glow}
            className="glass animate-float absolute inset-x-2 bottom-10 min-w-0 rounded-3xl p-4 sm:p-5 md:inset-x-auto md:-left-24 md:px-8 md:py-7"
          >
            <p className={`${label} text-muted-foreground`}>Họ và Tên</p>
            <p className="break-words font-display text-2xl font-extrabold text-orange-600 sm:text-3xl">
              HOÀNG THỊ HẬU
            </p>
            <p className="mt-2 break-words text-sm text-muted-foreground sm:text-base">
              Content Creator | Content Marketing | Video Production
            </p>
          </div>
          <div
            onMouseMove={glow}
            className="glass absolute -right-3 top-8 rounded-2xl px-4 py-3 font-mono text-sm"
          >
            <span className="text-green-400">●</span> Open to work
          </div>
        </div>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`absolute bottom-6 left-6 ${label} text-muted-foreground`}
        >
          Scroll ↓
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-28">
        <p className={`${label} text-primary`}>02 — About me</p>
        <div className="mt-6 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-8">
            <h2 className="reveal font-display text-5xl font-extrabold tracking-[-0.03em] md:text-7xl">
              Một chút về
              <br />
              <span className="ml-10 text-primary italic underline decoration-primary/30 decoration-4 underline-offset-8">
                Hậu Hoàng
              </span>
            </h2>
            <img
              src={about}
              alt="Hoàng Thị Hậu, content creator"
              width={896}
              height={1152}
              loading="lazy"
              className="reveal aspect-4/5 w-full max-w-md rounded-[2rem] object-cover object-[center_35%] shadow-var(--shadow-glass)"
            />
          </div>
          <div className="reveal space-y-6 text-lg leading-relaxed">
            <p>
              Tôi là <span className="text-primary italic font-bold">Hậu</span>{" "}
              – yêu thích sáng tạo, ham học hỏi và chủ động phát triển bản thân.
              Tôi từng đảm nhận các vị trí <span className="text-primary italic font-bold">Content Marketing, Content Creator và
              Editor,</span> phụ trách lên kế hoạch nội dung, viết kịch bản short
              video, sản xuất hình ảnh/video và hỗ trợ truyền thông.
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Mục tiêu:</span>{" "}
              Trở thành <span className="text-primary italic font-bold">Marketing Leader</span> có khả năng dẫn dắt đội nhóm, xây dựng
              chiến lược và tạo ra giá trị thực tế cho thương hiệu.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Content Marketing",
                "Content Creator",
                "Video Editing",
                "Social Strategy",
                "AI-assisted Production",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-4 py-1.5 font-mono text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { n: 2, l: "Years of marketing experience" },
                { n: projects.length, l: "Projects" },
              ].map((s) => (
                <div
                  key={s.l}
                  onMouseMove={glow}
                  className="glass rounded-3xl p-6"
                >
                  <p className="font-mono text-6xl font-bold text-primary">
                    <Counter to={s.n} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-0">
        <p className="font-mono text-lg uppercase tracking-[0.25em] text-primary">03 — Work Experience</p>
        <div className="mx-auto mt-10 max-w-5xl space-y-8">
          {services.map((service) => (
            <article
              key={service.title}
              onMouseMove={glow}
              className="reveal relative rounded-3xl border-2 border-dashed border-primary/75 bg-white/40 px-5 pb-5 pt-7 text-primary transition duration-300 hover:bg-primary/5 sm:px-7 cursor-pointer"
            >
              <h3 className="absolute left-5 top-0 max-w-[calc(100%-2.5rem)] -translate-y-1/2 rounded-lg bg-primary px-3 py-1.5 text-left font-display text-xs font-extrabold leading-tight text-primary-foreground shadow-sm sm:left-7 sm:text-sm">
                {service.title}
              </h3>
              <ul
                className={`max-w-full space-y-0.5 text-left text-sm leading-relaxed ${service.bulleted ? "list-disc pl-5" : ""}`}
              >
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={`font-mono uppercase tracking-[0.25em]text-primary text-lg text-primary`}>04 — Featured projects</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-[-0.03em] md:text-7xl">
              Featured Projects
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`rounded-full border px-4 py-2 font-mono text-xs transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer ${
                  filter === c
                    ? "border-foreground bg-foreground text-background hover:brightness-110"
                    : "border-foreground/15 bg-white/25 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div key={filter} className="filter-results mt-14 space-y-20">
          {shown.map((p, i) => {
            const projectUrl =
              p.category === "FREELANCE - PARTIME"
                ? "/freelancer"
                : `/work/${p.slug}`;

            return (
              <article
                key={p.title}
                className={`filter-item grid items-center gap-8 md:grid-cols-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
              <Link
                to={projectUrl}
                className="group relative overflow-hidden rounded-[2rem] md:col-span-7"
              >
                <span
                  className={`glass absolute bottom-5 left-5 z-10 rounded-full px-5 py-3 ${label}`}
                >
                  ▶ Xem video & quá trình
                </span>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-4/3 w-full object-fit transition duration-700 group-hover:scale-105"
                />
              </Link>
              <div
                onMouseMove={glow}
                className="glass rounded-3xl p-8 md:col-span-5"
              >
                <p className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} · {p.industry}
                </p>
                <h3 className="mt-3 font-display text-4xl font-extrabold">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-primary">{p.role}</p>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {p.tasks.map((t) => (
                    <li key={t}>— {t}</li>
                  ))}
                </ul>
                <p className="mt-6 border-t pt-4 font-mono text-lg font-bold">
                  {p.result}
                </p>
                <Link
                  to={projectUrl}
                  className={`mt-5 inline-block font-mono font-semibold text-s uppercase text-orange-600`}
                >
                  Xem chi tiết →
                </Link>
              </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 md:py-28">
        <div className="contact-card reveal rounded-[2rem] p-6 sm:rounded-[2.5rem] sm:p-8 md:p-12 lg:p-16">
          <div className="relative z-10">
            <p className={`${label} reveal text-primary`}>05 — Contact</p>
            <h2 className="reveal mt-4 max-w-5xl font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] text-balance sm:text-5xl md:text-7xl lg:text-8xl">
              Let's create
              <br />
              something <span className="italic text-primary">real.</span>
            </h2>
            <p className="reveal mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
              Open to creative collaborations, new opportunities, and
              interesting conversations.
            </p>
            <div className="reveal mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="mailto:hthau223@gmail.com"
              aria-label="Email Hoàng Thị Hậu"
              className={`group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-primary-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto ${label}`}
            >
              Email me
              <span
                aria-hidden="true"
                className="inline-block text-base transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
            <a
              href="https://www.facebook.com/pio.hau.223"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Hoàng Thị Hậu on Facebook (opens in a new tab)"
              className={`group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-foreground/15 bg-white/25 px-7 py-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/10 hover:text-primary hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto ${label}`}
            >
              Facebook
              <span
                aria-hidden="true"
                className="inline-block text-base transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
            <a
              href="https://www.tiktok.com/@pio.didau"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Hoàng Thị Hậu on TikTok (opens in a new tab)"
              className={`group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-foreground/15 bg-white/25 px-7 py-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/10 hover:text-primary hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto ${label}`}
            >
              TikTok
              <span
                aria-hidden="true"
                className="inline-block text-base transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
            </div>
          </div>
        </div>
        <footer className="mt-8 flex flex-col items-center gap-2 text-center sm:mt-10">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 Hoàng Thị Hậu
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/75">
            Designed &amp; developed with passion.
          </p>
        </footer>
      </section>
    </div>
  );
}
