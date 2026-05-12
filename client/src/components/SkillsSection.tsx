/*
 * SkillsSection — Digital Toolkit 技能工具箱
 * 设计：卡片式技能展示，官方图标，分组排列
 * 分组：产品逻辑 | 项目协作 | 高效办公
 */
import { useEffect, useRef, useState } from "react";

// SVG icons as inline components
const icons: Record<string, React.ReactNode> = {
  modao: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <rect width="24" height="24" rx="6" fill="#FF4785"/>
      <path d="M12 6C8.686 6 6 8.686 6 12s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" fill="white"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  ),
  processon: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <rect width="24" height="24" rx="6" fill="#1E88E5"/>
      <path d="M7 8h10M7 12h7M7 16h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="18" cy="16" r="2.5" fill="white"/>
    </svg>
  ),
  canva: (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <rect width="24" height="24" rx="12" fill="#00C4CC"/>
      <path d="M12 5.5C8.41 5.5 5.5 8.41 5.5 12S8.41 18.5 12 18.5c1.8 0 3.43-.68 4.66-1.8l-1.42-1.42C14.35 16.07 13.22 16.5 12 16.5c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5c1.22 0 2.35.43 3.24 1.14l1.42-1.42C15.43 6.18 13.8 5.5 12 5.5z" fill="white"/>
    </svg>
  ),
  jianying: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <rect width="24" height="24" rx="6" fill="#161823"/>
      <path d="M9 8l8 4-8 4V8z" fill="white"/>
      <rect x="6" y="7" width="2" height="10" rx="1" fill="#FE2C55"/>
    </svg>
  ),
  jira: (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <rect width="24" height="24" rx="6" fill="#0052CC"/>
      <path d="M12 3L3 12l9 9 9-9-9-9zm0 3.5L17.5 12 12 17.5 6.5 12 12 6.5z" fill="white"/>
      <circle cx="12" cy="12" r="2.5" fill="white"/>
    </svg>
  ),
  feishu: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <rect width="24" height="24" rx="6" fill="#1456F0"/>
      <path d="M12 4L6 9v6l6 5 6-5V9L12 4z" fill="none" stroke="white" strokeWidth="1.5"/>
      <path d="M9 11l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  wps: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <rect width="24" height="24" rx="6" fill="#E84C3D"/>
      <text x="4" y="17" fontSize="11" fontWeight="bold" fill="white" fontFamily="Arial">WPS</text>
    </svg>
  ),
  excel: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <rect width="24" height="24" rx="6" fill="#217346"/>
      <path d="M14 4H6v16h12V8l-4-4z" fill="none" stroke="white" strokeWidth="1.5"/>
      <path d="M14 4v4h4" stroke="white" strokeWidth="1.5"/>
      <path d="M9 13l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  word: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <rect width="24" height="24" rx="6" fill="#2B579A"/>
      <path d="M14 4H6v16h12V8l-4-4z" fill="none" stroke="white" strokeWidth="1.5"/>
      <path d="M14 4v4h4" stroke="white" strokeWidth="1.5"/>
      <path d="M9 12h6M9 15h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  ppt: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <rect width="24" height="24" rx="6" fill="#D24726"/>
      <path d="M14 4H6v16h12V8l-4-4z" fill="none" stroke="white" strokeWidth="1.5"/>
      <path d="M14 4v4h4" stroke="white" strokeWidth="1.5"/>
      <circle cx="11" cy="14" r="2.5" fill="none" stroke="white" strokeWidth="1.5"/>
      <path d="M13.5 14h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const SKILL_GROUPS = [
  {
    group: "产品逻辑",
    color: "oklch(0.60 0.13 168)",
    bgColor: "oklch(0.96 0.020 168)",
    icon: "🎯",
    skills: [
      { name: "墨刀", key: "modao", desc: "原型设计" },
      { name: "ProcessOn", key: "processon", desc: "流程图绘制" },
      { name: "Canva", key: "canva", desc: "视觉设计" },
      { name: "剪映", key: "jianying", desc: "视频剪辑" },
    ],
  },
  {
    group: "项目协作",
    color: "oklch(0.60 0.18 250)",
    bgColor: "oklch(0.96 0.015 250)",
    icon: "🤝",
    skills: [
      { name: "Jira", key: "jira", desc: "项目管理" },
      { name: "飞书 Lark", key: "feishu", desc: "团队协作" },
    ],
  },
  {
    group: "高效办公",
    color: "oklch(0.55 0.15 50)",
    bgColor: "oklch(0.97 0.015 50)",
    icon: "💼",
    skills: [
      { name: "WPS", key: "wps", desc: "文档处理" },
      { name: "Excel", key: "excel", desc: "数据分析" },
      { name: "Word", key: "word", desc: "文档撰写" },
      { name: "PowerPoint", key: "ppt", desc: "演示制作" },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.92_0.040_168)] text-[oklch(0.48_0.11_168)] text-sm font-medium mb-4">
            <span>🛠️</span> 技能工具箱
          </div>
          <h2 className="text-4xl font-bold text-[oklch(0.22_0.02_168)] mb-4">
            Digital Toolkit
          </h2>
          <p className="text-[oklch(0.55_0.04_168)] max-w-xl mx-auto">
            熟练掌握产品设计、项目管理与数据分析全链路工具，深度结合 AI 辅助工具提升交付效率
          </p>
        </div>

        {/* Skill groups */}
        <div className="space-y-10">
          {SKILL_GROUPS.map((group, gi) => (
            <div
              key={group.group}
              className={`transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${gi * 150}ms` }}
            >
              {/* Group header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ backgroundColor: group.bgColor }}
                >
                  {group.icon}
                </div>
                <h3 className="text-lg font-bold text-[oklch(0.22_0.02_168)]">{group.group}</h3>
                <div className="flex-1 h-px" style={{ backgroundColor: group.bgColor }} />
              </div>

              {/* Skill cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {group.skills.map((skill, si) => (
                  <div
                    key={skill.name}
                    className="skill-card p-5 flex flex-col items-center gap-3 group"
                    style={{ transitionDelay: `${gi * 150 + si * 60}ms` }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-50 group-hover:scale-110 transition-transform duration-200">
                      {icons[skill.key] || (
                        <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                          {skill.name[0]}
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[oklch(0.22_0.02_168)]">{skill.name}</p>
                      <p className="text-xs text-[oklch(0.55_0.04_168)] mt-0.5">{skill.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI boost note */}
        <div
          className={`mt-10 p-5 rounded-2xl border border-[oklch(0.90_0.020_168)] bg-[oklch(0.98_0.008_168)] flex items-start gap-4 transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-[oklch(0.92_0.040_168)] flex items-center justify-center text-xl flex-shrink-0">
            ✨
          </div>
          <p className="text-sm text-[oklch(0.40_0.06_168)] leading-relaxed italic">
            深度结合 AI 辅助工具，实现自动化数据处理与高质量文档产出，大幅提升工作交付效率。
          </p>
        </div>
      </div>
    </section>
  );
}
