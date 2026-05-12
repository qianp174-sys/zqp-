/*
 * Navbar — 顶部固定导航
 * 设计：薄荷极简主义，毛玻璃效果，滚动时加深背景
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
      // Update active section
      const sections = ["hero", "about", "skills", "portfolio", "contact"];
      for (const id of sections.reverse()) {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-[oklch(0.90_0.020_168)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-[oklch(0.60_0.13_168)] flex items-center justify-center">
            <span className="text-white font-bold text-sm font-display">Q</span>
          </div>
          <span className="font-serif font-bold text-[oklch(0.22_0.02_168)] text-sm hidden sm:block">
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[oklch(0.92_0.040_168)] text-[oklch(0.35_0.08_168)]"
                    : "text-[oklch(0.40_0.04_168)] hover:bg-[oklch(0.96_0.020_168)] hover:text-[oklch(0.35_0.08_168)]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[oklch(0.96_0.020_168)] transition-colors"
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            if (menu) menu.classList.toggle("hidden");
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="oklch(0.40 0.04 168)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-white/95 backdrop-blur-md border-b border-[oklch(0.90_0.020_168)]">
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
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-[oklch(0.40_0.04_168)] hover:bg-[oklch(0.96_0.020_168)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
