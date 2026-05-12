/*
 * PortfolioSection — 项目深度拆解 (PRD 风格)
 * 设计：三张封面卡片 + 侧边抽屉 PRD 详情页
 * 布局：Notion 排版逻辑，四个 Section：背景/解决方案/交付/数据
 */
import { useEffect, useRef, useState } from "react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  period: string;
  tags: string[];
  coverColor: string;
  coverIcon: string;
  coverBg: string;
  problem: {
    title: string;
    content: string;
    painPoints: string[];
  };
  solution: {
    title: string;
    content: string;
    steps: string[];
    flowChart?: string[];
  };
  deliverables: {
    title: string;
    items: { name: string; desc: string; icon: string }[];
  };
  impact: {
    title: string;
    metrics: { value: string; label: string; color: string }[];
    summary: string;
  };
}

const PROJECTS: Project[] = [
  {
    id: "haiwenhui",
    title: "内容运营全流程 SOP 建设",
    subtitle: "从0到1搭建内容生产管理体系",
    company: "深圳市海文辉传媒",
    period: "2026.01 — 2026.05",
    tags: ["SOP建设", "飞书多维表格", "数据可视化", "流程管理"],
    coverColor: "oklch(0.65 0.18 50)",
    coverIcon: "📊",
    coverBg: "linear-gradient(135deg, oklch(0.97 0.015 50) 0%, oklch(0.93 0.030 50) 100%)",
    problem: {
      title: "项目背景 · 发现了什么痛点？",
      content: "入职初期，内容团队缺乏统一的生产流程标准，三大平台超100条内容任务依赖口头沟通，导致剪辑延期、素材缺失等问题频发，内容发布率不稳定。",
      painPoints: [
        "无标准化流程：选题到发布全靠经验，无文档沉淀",
        "任务状态不透明：多人协作时信息不同步，延期难预警",
        "数据分散：KPI 数据分散在各平台，无法统一复盘",
        "模板缺失：每次内容策划都从零开始，重复劳动多",
      ],
    },
    solution: {
      title: "解决方案 · 如何用 SOP 解决？",
      content: "从0到1设计并落地「选题-脚本-拍摄-剪辑-发布-转化」六阶段全流程 SOP，配合飞书多维表格搭建可视化项目仪表盘。",
      steps: [
        "流程梳理：访谈各岗位，绘制现状流程图，识别卡点",
        "SOP 设计：制定每个阶段的输入、输出、负责人、时间节点标准",
        "工具搭建：使用飞书多维表格建立任务看板，设置自动提醒",
        "数据接入：配置 KPI 数据自动汇总，生成周报模板",
        "迭代优化：根据实际执行反馈，持续优化流程节点",
      ],
      flowChart: ["选题立项", "→", "脚本撰写", "→", "素材拍摄", "→", "后期剪辑", "→", "审核发布", "→", "数据复盘"],
    },
    deliverables: {
      title: "核心交付 · 产出了什么成果？",
      items: [
        { name: "内容生产 SOP 文档", desc: "覆盖六大阶段，含模板与检查清单", icon: "📋" },
        { name: "飞书项目仪表盘", desc: "可视化管理100+内容任务状态与优先级", icon: "📈" },
        { name: "周报数据模板", desc: "自动汇总播放量、互动率、转化率等KPI", icon: "📊" },
        { name: "风险预警机制", desc: "提前识别剪辑延期、素材缺失等风险", icon: "⚠️" },
      ],
    },
    impact: {
      title: "数据反馈 · 取得了什么成果？",
      metrics: [
        { value: "95%+", label: "内容按时发布率", color: "oklch(0.60 0.13 168)" },
        { value: "30%", label: "学员报名率提升", color: "oklch(0.65 0.18 50)" },
        { value: "100+", label: "内容任务可视化管理", color: "oklch(0.60 0.18 250)" },
        { value: "3", label: "平台同步管理", color: "oklch(0.55 0.15 280)" },
      ],
      summary: "通过系统化的 SOP 建设和数据驱动的复盘机制，显著提升了团队内容生产效率和发布质量，直接推动了业务转化指标的提升。",
    },
  },
  {
    id: "leiao",
    title: "AI 产品客户需求调研",
    subtitle: "结构化需求梳理与跨团队信息对齐",
    company: "蕾奥人工智能科学研究院",
    period: "2024.11 — 2025.04",
    tags: ["需求调研", "用户访谈", "需求文档", "跨团队协作"],
    coverColor: "oklch(0.60 0.18 250)",
    coverIcon: "🤖",
    coverBg: "linear-gradient(135deg, oklch(0.97 0.015 250) 0%, oklch(0.93 0.025 250) 100%)",
    problem: {
      title: "项目背景 · 发现了什么痛点？",
      content: "AI 产品研发团队在与客户对接时，需求信息模糊、分散，导致研发方向偏差，内外部信息不对齐问题严重影响产品迭代效率。",
      painPoints: [
        "需求模糊：客户痛点描述不清晰，难以转化为可执行需求",
        "信息孤岛：外部客户需求与内部研发团队信息不同步",
        "文档缺失：无标准化的需求收集与整理模板",
        "追溯困难：需求变更无记录，决策依据难以回溯",
      ],
    },
    solution: {
      title: "解决方案 · 如何用产品逻辑解决？",
      content: "通过结构化访谈方法，将模糊的客户痛点转化为可追溯的需求清单，并建立内外部信息同步机制。",
      steps: [
        "访谈设计：制定结构化访谈提纲，覆盖业务场景、痛点、期望功能",
        "实地走访：协同负责人走访多家企业，现场记录结构化会议纪要",
        "需求提炼：将模糊描述转化为「用户故事」格式的需求清单",
        "文档汇总：整理《客户需求调研手册》，建立需求优先级矩阵",
        "信息对齐：参与内部研讨会，跟进任务分配，确保需求落地",
      ],
    },
    deliverables: {
      title: "核心交付 · 产出了什么成果？",
      items: [
        { name: "客户需求调研手册", desc: "结构化整理多家企业的需求与痛点", icon: "📖" },
        { name: "结构化会议纪要", desc: "将模糊痛点转化为可追溯需求清单", icon: "📝" },
        { name: "企业沙龙执行清单", desc: "含时间线、场地、物料、人员的详细方案", icon: "📅" },
        { name: "活动复盘报告", desc: "含参与率、反馈及改进项，归档为团队模板", icon: "📊" },
      ],
    },
    impact: {
      title: "数据反馈 · 取得了什么成果？",
      metrics: [
        { value: "多家", label: "企业实地走访", color: "oklch(0.60 0.18 250)" },
        { value: "1本", label: "需求调研手册产出", color: "oklch(0.60 0.13 168)" },
        { value: "多场", label: "线下企业沙龙组织", color: "oklch(0.65 0.18 50)" },
        { value: "100%", label: "需求可追溯率", color: "oklch(0.55 0.15 280)" },
      ],
      summary: "建立了规范化的需求收集与整理流程，有效解决了外部需求与内部研发信息不对齐的问题，提升了产品迭代的准确性和效率。",
    },
  },
  {
    id: "campus",
    title: "校园心理游园会统筹",
    subtitle: "30人团队管理与大型活动落地",
    company: "东莞城市学院 · 心理部门",
    period: "2022.10 — 2025.12",
    tags: ["团队管理", "活动统筹", "流程标准化", "跨部门协调"],
    coverColor: "oklch(0.55 0.15 280)",
    coverIcon: "🏫",
    coverBg: "linear-gradient(135deg, oklch(0.97 0.012 280) 0%, oklch(0.93 0.022 280) 100%)",
    problem: {
      title: "项目背景 · 发现了什么痛点？",
      content: "心理部门承担全校心理健康活动的策划与执行，但团队职能边界模糊、协作流程不清晰，导致大型活动执行时频繁出现协调混乱、资源浪费等问题。",
      painPoints: [
        "职能不清：策划、宣传、执行三组职责重叠，责任边界模糊",
        "协调成本高：跨部门场地、物料协调无标准流程",
        "经验难沉淀：每次活动经验无法有效传承给下一届",
        "规模挑战：单场活动覆盖1000+人，现场调度难度大",
      ],
    },
    solution: {
      title: "解决方案 · 如何用流程化思维解决？",
      content: "建立三组职能边界与协作流程标准，制定活动执行 SOP，通过标准化模板实现经验沉淀与传承。",
      steps: [
        "组织架构：明确策划、宣传、执行三组的职能边界与接口规范",
        "流程设计：制定活动策划→预算→协调→执行→复盘的标准流程",
        "模板建设：输出活动方案模板、预算表、物料清单、人员调度表",
        "跨部门协调：建立与教务、后勤等部门的标准化沟通机制",
        "复盘机制：每场活动后输出复盘报告，沉淀为下届参考模板",
      ],
    },
    deliverables: {
      title: "核心交付 · 产出了什么成果？",
      items: [
        { name: "部门协作流程手册", desc: "三组职能边界与接口规范文档", icon: "📋" },
        { name: "活动执行 SOP", desc: "覆盖策划到复盘的完整流程模板", icon: "📝" },
        { name: "10+ 场活动落地", desc: "心理游园会及系列讲座成功执行", icon: "🎪" },
        { name: "活动复盘报告", desc: "沉淀为可传承的团队知识库", icon: "📊" },
      ],
    },
    impact: {
      title: "数据反馈 · 取得了什么成果？",
      metrics: [
        { value: "30+", label: "人团队管理规模", color: "oklch(0.55 0.15 280)" },
        { value: "10+", label: "场活动成功落地", color: "oklch(0.60 0.13 168)" },
        { value: "1000+", label: "单场活动覆盖人数", color: "oklch(0.65 0.18 50)" },
        { value: "3年", label: "持续担任部门负责人", color: "oklch(0.60 0.18 250)" },
      ],
      summary: "通过系统化的组织管理和流程标准化，将一个职能模糊的学生团队打造成高效协作的执行组织，为后续届次留下了可复用的管理资产。",
    },
  },
];

function PRDDrawer({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { label: "项目背景", icon: "🔍" },
    { label: "解决方案", icon: "💡" },
    { label: "核心交付", icon: "📦" },
    { label: "数据反馈", icon: "📈" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="flex-1 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div
          className="p-8 flex-shrink-0"
          style={{ background: project.coverBg }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="text-5xl">{project.coverIcon}</div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-500 hover:bg-white transition-colors"
            >
              ✕
            </button>
          </div>
          <h2 className="text-2xl font-bold text-[oklch(0.22_0.02_168)] mb-1">{project.title}</h2>
          <p className="text-[oklch(0.55_0.04_168)] text-sm mb-3">{project.subtitle}</p>
          <div className="flex items-center gap-2 text-sm text-[oklch(0.55_0.04_168)] mb-4">
            <span className="font-medium text-[oklch(0.35_0.05_168)]">{project.company}</span>
            <span>·</span>
            <span>{project.period}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/70 text-[oklch(0.35_0.08_168)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex border-b border-[oklch(0.90_0.020_168)] px-6 flex-shrink-0 overflow-x-auto">
          {sections.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeSection === i
                  ? "border-[oklch(0.60_0.13_168)] text-[oklch(0.48_0.11_168)]"
                  : "border-transparent text-[oklch(0.55_0.04_168)] hover:text-[oklch(0.35_0.05_168)]"
              }`}
            >
              <span>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Section content */}
        <div className="flex-1 p-8">
          {/* Section 1: Problem */}
          {activeSection === 0 && (
            <div className="prd-section">
              <h3 className="text-lg font-bold text-[oklch(0.22_0.02_168)] mb-3">
                {project.problem.title}
              </h3>
              <p className="text-[oklch(0.40_0.04_168)] leading-relaxed mb-5 text-sm">
                {project.problem.content}
              </p>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[oklch(0.35_0.05_168)]">核心痛点：</p>
                {project.problem.painPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[oklch(0.98_0.008_168)]">
                    <span className="text-[oklch(0.60_0.13_168)] font-bold text-sm flex-shrink-0">
                      P{i + 1}
                    </span>
                    <p className="text-sm text-[oklch(0.35_0.05_168)]">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Solution */}
          {activeSection === 1 && (
            <div className="prd-section">
              <h3 className="text-lg font-bold text-[oklch(0.22_0.02_168)] mb-3">
                {project.solution.title}
              </h3>
              <p className="text-[oklch(0.40_0.04_168)] leading-relaxed mb-5 text-sm">
                {project.solution.content}
              </p>
              {/* Flow chart */}
              {project.solution.flowChart && (
                <div className="mb-5 p-4 rounded-xl bg-[oklch(0.96_0.020_168)] overflow-x-auto">
                  <p className="text-xs font-semibold text-[oklch(0.55_0.04_168)] mb-3">流程图：</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {project.solution.flowChart.map((step, i) => (
                      <span
                        key={i}
                        className={
                          step === "→"
                            ? "text-[oklch(0.60_0.13_168)] font-bold"
                            : "px-3 py-1.5 rounded-lg bg-white text-xs font-medium text-[oklch(0.35_0.05_168)] border border-[oklch(0.90_0.020_168)] shadow-sm"
                        }
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[oklch(0.35_0.05_168)]">执行步骤：</p>
                {project.solution.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[oklch(0.60_0.13_168)] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-[oklch(0.35_0.05_168)] leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Deliverables */}
          {activeSection === 2 && (
            <div className="prd-section">
              <h3 className="text-lg font-bold text-[oklch(0.22_0.02_168)] mb-5">
                {project.deliverables.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.deliverables.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-[oklch(0.90_0.020_168)] bg-white hover:border-[oklch(0.60_0.13_168)] transition-colors"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm font-semibold text-[oklch(0.22_0.02_168)] mb-1">{item.name}</p>
                    <p className="text-xs text-[oklch(0.55_0.04_168)]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Impact */}
          {activeSection === 3 && (
            <div className="prd-section">
              <h3 className="text-lg font-bold text-[oklch(0.22_0.02_168)] mb-5">
                {project.impact.title}
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {project.impact.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl text-center"
                    style={{ backgroundColor: `${metric.color.replace("oklch(", "oklch(").replace(")", " / 0.08)")}` }}
                  >
                    <div
                      className="text-3xl font-bold font-display mb-1"
                      style={{ color: metric.color }}
                    >
                      {metric.value}
                    </div>
                    <p className="text-xs text-[oklch(0.40_0.04_168)]">{metric.label}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-[oklch(0.96_0.020_168)] border-l-4 border-[oklch(0.60_0.13_168)]">
                <p className="text-sm text-[oklch(0.35_0.05_168)] leading-relaxed">
                  {project.impact.summary}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-mint-gradient">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.92_0.040_168)] text-[oklch(0.48_0.11_168)] text-sm font-medium mb-4">
            <span>💼</span> 项目案例
          </div>
          <h2 className="text-4xl font-bold text-[oklch(0.22_0.02_168)] mb-4">
            Portfolio · 项目深度拆解
          </h2>
          <p className="text-[oklch(0.55_0.04_168)] max-w-xl mx-auto">
            点击项目卡片，以 PRD 视角深度拆解每个项目的背景、方案、交付与成果
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className={`card-hover cursor-pointer rounded-3xl overflow-hidden border border-[oklch(0.90_0.020_168)] bg-white transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Cover */}
              <div
                className="h-40 flex items-center justify-center relative overflow-hidden"
                style={{ background: project.coverBg }}
              >
                <span className="text-6xl">{project.coverIcon}</span>
                {/* Decorative circles */}
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20"
                  style={{ backgroundColor: project.coverColor }}
                />
                <div
                  className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-15"
                  style={{ backgroundColor: project.coverColor }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[oklch(0.96_0.020_168)] text-[oklch(0.48_0.11_168)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-[oklch(0.22_0.02_168)] mb-1.5">
                  {project.title}
                </h3>
                <p className="text-sm text-[oklch(0.55_0.04_168)] mb-4">{project.subtitle}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[oklch(0.60_0.13_168)] font-medium">
                    {project.company}
                  </span>
                  <span className="text-xs text-[oklch(0.55_0.04_168)] font-display">
                    {project.period}
                  </span>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-6 pb-5">
                <div className="flex items-center gap-2 text-sm font-medium text-[oklch(0.60_0.13_168)] group">
                  <span>查看 PRD 详情</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRD Drawer */}
      {selectedProject && (
        <PRDDrawer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
