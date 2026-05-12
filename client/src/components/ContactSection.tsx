/*
 * ContactSection — 联系页面 & Final Call
 * 设计参考：技能工具箱风格 — 极浅米白背景 #FAFAF8，白色圆角卡片，暖棕分隔线
 * 配色：bg #FAFAF8 | card white | accent #C4A99A | text #2C3E35
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
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "#FAFAF8" }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6">

        {/* Section header — 与技能工具箱一致的标题样式 */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ background: "#F0EBE5", color: "#8B6F5E" }}
          >
            <span>✉️</span> 联系我
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "#2C3E35", fontFamily: "'Noto Serif SC', serif" }}
          >
            Let's Connect
          </h2>
          <p className="text-base" style={{ color: "#6B7E76" }}>
            期待与你一起，把模糊需求"搓"成清晰计划
          </p>
        </div>

        {/* Creed block — 白色卡片，与工具箱卡片一致 */}
        <div
          className={`mb-12 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="relative rounded-2xl p-10 text-center overflow-hidden"
            style={{
              background: "#FFFFFF",
              border: "1px solid #EDE9E3",
              boxShadow: "0 2px 12px rgba(196,169,154,0.08)"
            }}
          >
            {/* Decorative quote marks */}
            <div
              className="absolute top-5 left-7 text-7xl font-serif leading-none select-none"
              style={{ color: "#EDE9E3" }}
            >
              "
            </div>
            <div
              className="absolute bottom-5 right-7 text-7xl font-serif leading-none select-none rotate-180"
              style={{ color: "#EDE9E3" }}
            >
              "
            </div>
            <p
              className="relative text-xl lg:text-2xl font-bold leading-relaxed"
              style={{ color: "#2C3E35" }}
            >
              习惯把需求梳理清楚
              <span style={{ color: "#C4A99A" }}>、</span>
              把进度管到位
              <span style={{ color: "#C4A99A" }}>、</span>
              把交付做完整
            </p>
            <p className="mt-3 text-sm" style={{ color: "#8B6F5E" }}>
              
            </p>
          </div>
        </div>

        {/* Category divider — 与技能工具箱分类标题一致 */}
        <div
          className={`flex items-center gap-4 mb-6 transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: "#F0EBE5" }}
          >
            📬
          </div>
          <span className="text-lg font-semibold" style={{ color: "#2C3E35" }}>联系方式</span>
          <div className="flex-1 h-px" style={{ background: "#EDE9E3" }} />
        </div>

        {/* Contact cards — 白色圆角卡片，与工具箱工具卡片一致 */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* WeChat/Phone */}
          <div
            className="group p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            style={{
              background: "#FFFFFF",
              border: "1px solid #EDE9E3",
              boxShadow: "0 1px 6px rgba(196,169,154,0.08)"
            }}
            onClick={() => handleCopy("13267128972", "phone")}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform"
                style={{ background: "#F5F0EC" }}
              >
                📱
              </div>
              <div className="flex-1">
                <p className="text-xs mb-1" style={{ color: "#8B6F5E" }}>微信 / 手机</p>
                <p className="text-lg font-semibold tracking-wide" style={{ color: "#2C3E35" }}>
                  13267128972
                </p>
              </div>
              <div
                className="text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 px-2 py-1 rounded-full"
                style={{ color: "#C4A99A", background: "#F5F0EC" }}
              >
                {copied === "phone" ? "已复制 ✓" : "点击复制"}
              </div>
            </div>
          </div>

          {/* Email */}
          <div
            className="group p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            style={{
              background: "#FFFFFF",
              border: "1px solid #EDE9E3",
              boxShadow: "0 1px 6px rgba(196,169,154,0.08)"
            }}
            onClick={() => handleCopy("qianpingzhu0821@163.com", "email")}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform"
                style={{ background: "#F5F0EC" }}
              >
                ✉️
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs mb-1" style={{ color: "#8B6F5E" }}>邮箱</p>
                <p className="text-sm font-semibold truncate" style={{ color: "#2C3E35" }}>
                  qianpingzhu0821@163.com
                </p>
              </div>
              <div
                className="text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 px-2 py-1 rounded-full"
                style={{ color: "#C4A99A", background: "#F5F0EC" }}
              >
                {copied === "email" ? "已复制 ✓" : "点击复制"}
              </div>
            </div>
          </div>
        </div>

        {/* CTA — 下载简历按钮 */}
        <div
          className={`text-center mb-16 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="/manus-storage/朱倩萍个人简历13267128972_9988fcb4.pdf"
            download="朱倩萍简历.pdf"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:-translate-y-1"
            style={{
              background: "#2C3E35",
              color: "#FAFAF8",
              boxShadow: "0 8px 24px rgba(44,62,53,0.20)"
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#1E2E27";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(44,62,53,0.30)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#2C3E35";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(44,62,53,0.20)";
            }}
          >
            <span>↓</span>
            下载简历
          </a>
          <p className="mt-4 text-sm" style={{ color: "#8B6F5E" }}>
            期待与您沟通
          </p>
        </div>

        {/* Divider */}
        <div className="h-px mb-10" style={{ background: "#EDE9E3" }} />

        {/* Footer */}
        <div
          className={`text-center transition-all duration-700 delay-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#2C3E35" }}
            >
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="font-bold text-base" style={{ color: "#2C3E35", fontFamily: "'Noto Serif SC', serif" }}>朱倩萍</span>
          </div>
          <p className="text-xs font-medium mb-1" style={{ color: "#8B6F5E" }}>
            © 2026 朱倩萍. 基于软件工程逻辑与产品思维构建.
          </p>
          <p className="text-xs" style={{ color: "#A0ADA8" }}>
            Qianping Zhu · Product Manager Candidate
          </p>
        </div>

      </div>
    </section>
  );
}
