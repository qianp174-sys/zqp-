/*
 * Navbar — 顶部固定导航
 * 设计：北欧温柔风 — 奶油白背景，暖棕玫瑰点缀，深林绿文字
 */
import { useState, useEffect } from "react";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "成长地图", href: "#about" },
  { label: "技能工具箱", href: "#skills" },
  { label: "项目案例", href: "#portfolio" },
  { label: "联系我", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["hero", "about", "skills", "portfolio", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: "oklch(0.985 0.004 75 / 0.92)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 1px 0 oklch(0.880 0.012 75)",
            }
          : { background: "transparent" }
      }
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.68 0.055 35)" }}
          >
            <span className="text-white font-bold text-sm font-display">Q</span>
          </div>
          <span
            className="font-serif font-bold text-sm hidden sm:block"
            style={{ color: "oklch(0.27 0.035 155)" }}
          >
            朱倩萍
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={
                  isActive
                    ? {
                        background: "oklch(0.940 0.020 35)",
                        color: "oklch(0.52 0.060 35)",
                      }
                    : {
                        color: "oklch(0.50 0.025 155)",
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.background = "oklch(0.940 0.012 75)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.40 0.035 155)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.50 0.025 155)";
                  }
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: "oklch(0.50 0.025 155)" }}
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            if (menu) menu.classList.toggle("hidden");
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="hidden md:hidden"
        style={{
          background: "oklch(0.985 0.004 75 / 0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid oklch(0.880 0.012 75)",
        }}
      >
        <div className="px-6 py-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                handleNavClick(e, item.href);
                const menu = document.getElementById("mobile-menu");
                if (menu) menu.classList.add("hidden");
              }}
              className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ color: "oklch(0.40 0.035 155)" }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
