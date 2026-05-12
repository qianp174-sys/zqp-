/*
 * HeroSection — 沉浸式首页
 * 设计：北欧温柔风 — 奶油米白背景，暖棕玫瑰点缀，深林绿文字
 * 配色：bg #F5F3EF | primary #C4A99A | text #2C3E35
 */
import { useState, useEffect, useRef } from "react";

const TYPING_TEXTS = ["软件工程背景", "从0到1的产品思维者", "流程结构化专家", "数据驱动决策者"];

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Typewriter effect
  useEffect(() => {
    const currentText = TYPING_TEXTS[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
    } else {
      const delta = isDeleting ? 60 : 100;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentText.slice(0, displayText.length - 1)
            : currentText.slice(0, displayText.length + 1)
        );
      }, delta);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large soft circle top-right — warm rose */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, oklch(0.820 0.040 35) 0%, transparent 70%)" }}
        />
        {/* Small circle bottom-left — cream */}
        <div
          className="absolute bottom-20 -left-20 w-[300px] h-[300px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, oklch(0.860 0.025 75) 0%, transparent 70%)" }}
        />
        {/* Dot grid pattern */}
        <div className="absolute top-1/4 right-1/4 opacity-[0.08]">
          {Array.from({ length: 6 }).map((_, row) => (
            <div key={row} className="flex gap-4 mb-4">
              {Array.from({ length: 6 }).map((_, col) => (
                <div key={col} className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.68 0.055 35)" }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Tag */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{
                background: "oklch(0.940 0.020 35)",
                color: "oklch(0.52 0.060 35)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "oklch(0.68 0.055 35)" }}
              />
              产品经理候选人
            </div>

            {/* Name */}
            <h1
              className="text-5xl lg:text-6xl font-bold mb-3 leading-tight"
              style={{ color: "oklch(0.27 0.035 155)" }}
            >
              朱倩萍
            </h1>
            <p
              className="font-display text-xl mb-4 tracking-wide"
              style={{ color: "oklch(0.50 0.025 155)" }}
            >
              Qianping Zhu
            </p>

            {/* Typewriter */}
            <div className="h-10 flex items-center mb-8">
              <span
                className="text-2xl font-semibold typewriter-cursor"
                style={{ color: "oklch(0.68 0.055 35)" }}
              >
                {displayText}
              </span>
            </div>

            {/* Introduction */}
            <div
              className="rounded-2xl p-6 mb-8 shadow-sm card-mint-border"
              style={{
                background: "oklch(0.985 0.004 75 / 0.85)",
                border: "1px solid oklch(0.880 0.012 75)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p
                className="leading-relaxed text-[15px]"
                style={{ color: "oklch(0.40 0.035 155)" }}
              >
                👋 嗨，我是倩萍，一个喜欢把模糊需求"搓"成清晰计划的人。从软件工程专业出身，到 AI 研究院的用户洞察研究，再到传媒公司的 SOP 建设实践。每一段经历都让我学会了如何将复杂流程结构化，用数据驱动决策，以产品思维解决真实问题。
              </p>
              <p
                className="mt-4 font-semibold text-sm italic"
                style={{ color: "oklch(0.52 0.060 35)" }}
              >
                「习惯把需求梳理清楚、把进度管到位、把交付做完整」—— 这是我的工作信条。
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleScrollToAbout}
                className="group flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "oklch(0.68 0.055 35)",
                  color: "oklch(0.985 0 0)",
                  boxShadow: "0 8px 24px oklch(0.68 0.055 35 / 0.28)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.60 0.058 35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.68 0.055 35)";
                }}
              >
                探索我的个人经历
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <a
                href="/manus-storage/resume_1e5fce82.pdf"
                download="朱倩萍-产品经理简历.pdf"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  border: "2px solid oklch(0.68 0.055 35)",
                  color: "oklch(0.52 0.060 35)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "oklch(0.940 0.020 35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                下载简历
                <span>↓</span>
              </a>
            </div>

            {/* Stats row */}
            <div
              className="flex gap-8 mt-10 pt-8"
              style={{ borderTop: "1px solid oklch(0.880 0.012 75)" }}
            >
              {[
                { value: "2+", label: "年实习经验" },
                { value: "95%", label: "内容准时发布率" },
                { value: "30%", label: "学员报名率提升" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl font-bold font-display"
                    style={{ color: "oklch(0.68 0.055 35)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.50 0.025 155)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Portrait illustration */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed scale-110 animate-[spin_30s_linear_infinite] opacity-30"
                style={{ borderColor: "oklch(0.820 0.040 35)" }}
              />
              <div
                className="absolute inset-0 rounded-full border scale-125 opacity-20"
                style={{ borderColor: "oklch(0.860 0.025 75)" }}
              />
              {/* Portrait */}
              <div
                className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden"
                style={{ boxShadow: "0 24px 60px oklch(0.68 0.055 35 / 0.18)" }}
              >
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663649908096/XSkKeEYc9Cj3zgNTddVRfJ/hero_portrait-hh4rEqDNeQQVGbn5d4v6Ef.webp"
                  alt="朱倩萍"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-2 -right-2 rounded-2xl px-4 py-2 shadow-lg"
                style={{
                  background: "oklch(0.985 0.004 75)",
                  border: "1px solid oklch(0.880 0.012 75)",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.40 0.035 155)" }}
                  >
                    开放机会
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs font-display" style={{ color: "oklch(0.50 0.025 155)" }}>
          向下探索
        </span>
        <div
          className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5"
          style={{ borderColor: "oklch(0.820 0.040 35)" }}
        >
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ background: "oklch(0.68 0.055 35)" }}
          />
        </div>
      </div>
    </section>
  );
}
