/*
 * HeroSection — 沉浸式首页
 * 设计：薄荷绿渐变背景，左侧文案+右侧插画，打字机动效
 * 动效：淡入上移，打字机循环，按钮悬停
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

  const handleDownloadResume = () => {
    // Create a link element to trigger download
    const link = document.createElement("a");
    link.href = "/manus-storage/resume_1e5fce82.pdf";
    link.download = "朱倩萍-产品经理简历.pdf";
    link.click();
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large soft circle top-right */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, oklch(0.85 0.075 168) 0%, transparent 70%)" }}
        />
        {/* Small circle bottom-left */}
        <div
          className="absolute bottom-20 -left-20 w-[300px] h-[300px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.10 168) 0%, transparent 70%)" }}
        />
        {/* Dot grid pattern */}
        <div className="absolute top-1/4 right-1/4 opacity-10">
          {Array.from({ length: 6 }).map((_, row) => (
            <div key={row} className="flex gap-4 mb-4">
              {Array.from({ length: 6 }).map((_, col) => (
                <div key={col} className="w-1.5 h-1.5 rounded-full bg-[oklch(0.60_0.13_168)]" />
              ))}
            </div>
          ))}
        </div>
        {/* Hero background image */}
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663649908096/XSkKeEYc9Cj3zgNTddVRfJ/hero_bg-FGbfY9D3AyvUbMkq3QioF9.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply"
        />
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.92_0.040_168)] text-[oklch(0.48_0.11_168)] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[oklch(0.60_0.13_168)] animate-pulse" />
              产品经理候选人
            </div>

            {/* Name */}
            <h1 className="text-5xl lg:text-6xl font-bold text-[oklch(0.22_0.02_168)] mb-3 leading-tight">
              朱倩萍
            </h1>
            <p className="font-display text-xl text-[oklch(0.55_0.04_168)] mb-4 tracking-wide">
              Qianping Zhu
            </p>

            {/* Typewriter */}
            <div className="h-10 flex items-center mb-8">
              <span className="text-2xl font-semibold text-[oklch(0.60_0.13_168)] typewriter-cursor">
                {displayText}
              </span>
            </div>

            {/* Introduction */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-[oklch(0.90_0.020_168)] card-mint-border mb-8 shadow-sm">
              <p className="text-[oklch(0.35_0.05_168)] leading-relaxed text-[15px]">
                👋 嗨，我是倩萍，一个喜欢把模糊需求"搓"成清晰计划的人。从软件工程专业出身，到 AI 研究院的用户洞察研究，再到传媒公司的 SOP 建设实践。每一段经历都让我学会了如何将复杂流程结构化，用数据驱动决策，以产品思维解决真实问题。
              </p>
              <p className="mt-4 text-[oklch(0.48_0.11_168)] font-semibold text-sm italic">
                「习惯把需求梳理清楚、把进度管到位、把交付做完整」—— 这是我的工作信条。
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleScrollToAbout}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[oklch(0.60_0.13_168)] text-white font-medium text-sm hover:bg-[oklch(0.55_0.13_168)] transition-all duration-200 shadow-lg shadow-[oklch(0.60_0.13_168)/0.3] hover:shadow-xl hover:shadow-[oklch(0.60_0.13_168)/0.4] hover:-translate-y-0.5"
              >
                探索我的个人经历
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <a
                href="/manus-storage/resume_1e5fce82.pdf"
                download="朱倩萍-产品经理简历.pdf"
                className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[oklch(0.60_0.13_168)] text-[oklch(0.48_0.11_168)] font-medium text-sm hover:bg-[oklch(0.96_0.020_168)] transition-all duration-200 hover:-translate-y-0.5"
              >
                下载简历
                <span>↓</span>
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-[oklch(0.90_0.020_168)]">
              {[
                { value: "2+", label: "年实习经验" },
                { value: "95%", label: "内容准时发布率" },
                { value: "30%", label: "学员报名率提升" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-[oklch(0.60_0.13_168)] font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[oklch(0.55_0.04_168)] mt-0.5">{stat.label}</div>
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
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[oklch(0.78_0.10_168)] scale-110 animate-[spin_30s_linear_infinite] opacity-40" />
              <div className="absolute inset-0 rounded-full border border-[oklch(0.85_0.075_168)] scale-125 opacity-30" />
              {/* Portrait */}
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl shadow-[oklch(0.60_0.13_168)/0.2]">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663649908096/XSkKeEYc9Cj3zgNTddVRfJ/hero_portrait-hh4rEqDNeQQVGbn5d4v6Ef.webp"
                  alt="朱倩萍"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-2 -right-2 bg-white rounded-2xl px-4 py-2 shadow-lg border border-[oklch(0.90_0.020_168)]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium text-[oklch(0.35_0.05_168)]">开放机会</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-[oklch(0.55_0.04_168)] font-display">向下探索</span>
        <div className="w-5 h-8 rounded-full border-2 border-[oklch(0.78_0.10_168)] flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[oklch(0.60_0.13_168)] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
