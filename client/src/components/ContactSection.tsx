/*
 * ContactSection — 联系页面 & Final Call
 * 设计：信条重申 + 联系信息 + 页脚
 * 配色：北欧温柔风 — 奶油米白底 #F5F3EF，暖棕玫瑰 #C4A99A，深林绿文字 #2C3E35
 * 联系卡片：填充暖米色背景突出显示，底部按钮改为下载简历
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
      style={{ background: "linear-gradient(160deg, #F5F3EF 0%, #EDE9E3 50%, #F0ECE6 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-40"
          style={{ background: "linear-gradient(90deg, transparent, #C4A99A, transparent)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #C4A99A 0%, transparent 70%)" }}
        />
        <div
          className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #A8C5B5 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: "#E8E0D8", color: "#8B6F5E" }}
          >
            <span>✉️</span> 联系我
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#2C3E35" }}>
            Let's Connect
          </h2>
          <p style={{ color: "#6B7E76" }}>
            期待与你一起，把模糊需求"搓"成清晰计划
          </p>
        </div>

        {/* Creed block */}
        <div
          className={`mb-14 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="relative rounded-3xl p-10 text-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, #EDE9E3 0%, #E8E0D8 100%)", border: "1px solid #D9D0C7" }}
          >
            {/* Decorative quotes */}
            <div
              className="absolute top-4 left-8 text-8xl font-serif leading-none select-none"
              style={{ color: "#D9D0C7" }}
            >
              "
            </div>
            <div
              className="absolute bottom-4 right-8 text-8xl font-serif leading-none select-none rotate-180"
              style={{ color: "#D9D0C7" }}
            >
              "
            </div>
            <p className="relative text-2xl lg:text-3xl font-bold leading-relaxed" style={{ color: "#2C3E35" }}>
              习惯把需求梳理清楚
              <span style={{ color: "#C4A99A" }}>、</span>
              把进度管到位
              <span style={{ color: "#C4A99A" }}>、</span>
              把交付做完整
            </p>
            <p className="mt-4 text-sm font-display" style={{ color: "#8B6F5E" }}>
              —— 朱倩萍的工作信条
            </p>
          </div>
        </div>

        {/* Contact cards — filled warm color */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* WeChat/Phone */}
          <div
            className="group p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #EDE9E3 0%, #E4DDD5 100%)",
              border: "1px solid #D9D0C7",
              boxShadow: "0 2px 8px rgba(196,169,154,0.15)"
            }}
            onClick={() => handleCopy("13267128972", "phone")}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                style={{ background: "#C4A99A20" }}
              >
                📱
              </div>
              <div className="flex-1">
                <p className="text-xs mb-0.5" style={{ color: "#8B6F5E" }}>微信 / 手机</p>
                <p className="text-lg font-semibold font-display tracking-wide" style={{ color: "#2C3E35" }}>
                  13267128972
                </p>
              </div>
              <div
                className="text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                style={{ color: "#C4A99A" }}
              >
                {copied === "phone" ? "已复制 ✓" : "点击复制"}
              </div>
            </div>
          </div>

          {/* Email */}
          <div
            className="group p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #EDE9E3 0%, #E4DDD5 100%)",
              border: "1px solid #D9D0C7",
              boxShadow: "0 2px 8px rgba(196,169,154,0.15)"
            }}
            onClick={() => handleCopy("qianpingzhu0821@163.com", "email")}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                style={{ background: "#C4A99A20" }}
              >
                ✉️
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs mb-0.5" style={{ color: "#8B6F5E" }}>邮箱</p>
                <p className="text-sm font-semibold font-display truncate" style={{ color: "#2C3E35" }}>
                  qianpingzhu0821@163.com
                </p>
              </div>
              <div
                className="text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                style={{ color: "#C4A99A" }}
              >
                {copied === "email" ? "已复制 ✓" : "点击复制"}
              </div>
            </div>
          </div>
        </div>

        {/* CTA — 下载简历 */}
        <div
          className={`text-center mb-16 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="/manus-storage/朱倩萍个人简历13267128972_a09d9c4e.pdf"
            download="朱倩萍简历.pdf"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:-translate-y-1"
            style={{
              background: "#2C3E35",
              color: "#F5F3EF",
              boxShadow: "0 8px 24px rgba(44,62,53,0.25)"
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#1E2E27";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(44,62,53,0.35)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#2C3E35";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(44,62,53,0.25)";
            }}
          >
            <span>↓</span>
            下载简历
          </a>
          <p className="mt-4 text-sm" style={{ color: "#8B6F5E" }}>
            或直接拨打 13267128972 · 期待你的联系
          </p>
        </div>

        {/* Divider */}
        <div className="h-px mb-10" style={{ background: "#D9D0C7" }} />

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
              <span className="text-white font-bold text-sm font-display">Q</span>
            </div>
            <span className="font-serif font-bold" style={{ color: "#2C3E35" }}>朱倩萍</span>
          </div>
          <p className="text-xs font-medium mb-2" style={{ color: "#8B6F5E" }}>
            © 2026 朱倩萍. 基于软件工程逻辑与产品思维构建.
          </p>
          <p className="text-xs font-display" style={{ color: "#A0ADA8" }}>
            Qianping Zhu · Product Manager Candidate
          </p>
        </div>
      </div>
    </section>
  );
}
