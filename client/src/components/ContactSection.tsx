/*
 * ContactSection — 联系页面 & Final Call
 * 设计：信条重申 + 联系信息 + 页脚
 * 视觉：薄荷绿渐变背景，大字排版，优雅页脚
 */
import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1 opacity-60"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.60 0.13 168), transparent)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, oklch(0.60 0.13 168) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.10 168) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.92_0.040_168)] text-[oklch(0.48_0.11_168)] text-sm font-medium mb-4">
            <span>✉️</span> 联系我
          </div>
          <h2 className="text-4xl font-bold text-[oklch(0.22_0.02_168)] mb-4">
            Let's Connect
          </h2>
          <p className="text-[oklch(0.55_0.04_168)]">
            期待与你一起，把模糊需求"搓"成清晰计划
          </p>
        </div>

        {/* Creed block */}
        <div
          className={`mb-14 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative bg-[oklch(0.96_0.020_168)] rounded-3xl p-10 text-center overflow-hidden">
            {/* Decorative quotes */}
            <div className="absolute top-4 left-8 text-8xl text-[oklch(0.85_0.075_168)] font-serif leading-none select-none">
              "
            </div>
            <div className="absolute bottom-4 right-8 text-8xl text-[oklch(0.85_0.075_168)] font-serif leading-none select-none rotate-180">
              "
            </div>
            <p className="relative text-2xl lg:text-3xl font-bold text-[oklch(0.35_0.08_168)] leading-relaxed">
              习惯把需求梳理清楚
              <span className="text-[oklch(0.60_0.13_168)]">、</span>
              把进度管到位
              <span className="text-[oklch(0.60_0.13_168)]">、</span>
              把交付做完整
            </p>
            <p className="mt-4 text-sm text-[oklch(0.55_0.04_168)] font-display">
              —— 朱倩萍的工作信条
            </p>
          </div>
        </div>

        {/* Contact cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* WeChat/Phone */}
          <div
            className="group p-6 rounded-2xl border border-[oklch(0.90_0.020_168)] bg-white hover:border-[oklch(0.60_0.13_168)] hover:shadow-lg hover:shadow-[oklch(0.60_0.13_168)/0.10] transition-all duration-300 cursor-pointer"
            onClick={() => handleCopy("13267128972", "phone")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[oklch(0.96_0.020_168)] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📱
              </div>
              <div className="flex-1">
                <p className="text-xs text-[oklch(0.55_0.04_168)] mb-0.5">微信 / 手机</p>
                <p className="text-lg font-semibold text-[oklch(0.22_0.02_168)] font-display tracking-wide">
                  13267128972
                </p>
              </div>
              <div className="text-xs text-[oklch(0.60_0.13_168)] opacity-0 group-hover:opacity-100 transition-opacity">
                {copied === "phone" ? "已复制 ✓" : "点击复制"}
              </div>
            </div>
          </div>

          {/* Email */}
          <div
            className="group p-6 rounded-2xl border border-[oklch(0.90_0.020_168)] bg-white hover:border-[oklch(0.60_0.13_168)] hover:shadow-lg hover:shadow-[oklch(0.60_0.13_168)/0.10] transition-all duration-300 cursor-pointer"
            onClick={() => handleCopy("qianpingzhu0821@163.com", "email")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[oklch(0.96_0.020_168)] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                ✉️
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[oklch(0.55_0.04_168)] mb-0.5">邮箱</p>
                <p className="text-sm font-semibold text-[oklch(0.22_0.02_168)] font-display truncate">
                  qianpingzhu0821@163.com
                </p>
              </div>
              <div className="text-xs text-[oklch(0.60_0.13_168)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                {copied === "email" ? "已复制 ✓" : "点击复制"}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center mb-16 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="mailto:qianpingzhu0821@163.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[oklch(0.60_0.13_168)] text-white font-semibold text-base hover:bg-[oklch(0.55_0.13_168)] transition-all duration-200 shadow-xl shadow-[oklch(0.60_0.13_168)/0.3] hover:shadow-2xl hover:shadow-[oklch(0.60_0.13_168)/0.4] hover:-translate-y-1"
          >
            <span>✉️</span>
            发送邮件给我
            <span>→</span>
          </a>
          <p className="mt-4 text-sm text-[oklch(0.55_0.04_168)]">
            或直接拨打 13267128972 · 期待你的联系
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[oklch(0.90_0.020_168)] mb-10" />

        {/* Footer */}
        <div
          className={`text-center transition-all duration-700 delay-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[oklch(0.60_0.13_168)] flex items-center justify-center">
              <span className="text-white font-bold text-sm font-display">Q</span>
            </div>
            <span className="font-serif font-bold text-[oklch(0.22_0.02_168)]">朱倩萍</span>
          </div>
          <p className="text-xs text-[oklch(0.60_0.13_168)] font-medium mb-2">
            © 2026 朱倩萍. 基于软件工程逻辑与产品思维构建.
          </p>
          <p className="text-xs text-[oklch(0.70_0.03_168)] font-display">
            Qianping Zhu · Product Manager Candidate
          </p>
        </div>
      </div>
    </section>
  );
}
