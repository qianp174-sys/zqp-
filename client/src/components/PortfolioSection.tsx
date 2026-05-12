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
    id: "shufa",
    title: "书法班逆势增长项目",
    subtitle: "从濒临关闭的6人班 → 假期满员运营，总学员40+",
    company: "某书法教育机构",
    period: "6个月 · 已结项",
    tags: ["教学体系重塑", "用户增长", "干系人管理", "数据驱动"],
    coverColor: "oklch(0.68 0.055 35)",
    coverIcon: "✍️",
    coverBg: "linear-gradient(135deg, oklch(0.950 0.018 35) 0%, oklch(0.920 0.030 35) 100%)",
    problem: {
      title: "项目背景 · 发现了什么痛点？",
      content: "某书法班因学员仅剩6人，面临关闭。前任教师教学枯燥，学员积极性低，家长感觉「学无效果」，机构负责人续费不理想。目标：6个月内实现班级常态化满员，总学员≥40人，假期班提前售罄。",
      painPoints: [
        "学生：课堂枯燥、积极性低，参与感不足",
        "家长：看不到孩子的进步，认为书法「没效果」",
        "机构负责人：续费率不足40%，班级濒临关闭",
        "教学差异：学员基础参差不齐，「一锅烩」教学无法满足个性化需求",
      ],
    },
    solution: {
      title: "解决方案 · 如何用产品思维重塑教学体系？",
      content: "1周内完成干系人痛点调研，针对学生、家长、机构三类干系人分别设计解决方案，通过积分制、入学测试、个性化教学和节日作品展示四大机制，系统性解决核心痛点。",
      steps: [
        "针对学生：穿插游戏与汉字典故讲解降低枯燥感；引入积分制度（纪律+练习质量+作品），可兑换奖品，提升积极性",
        "针对家长：入学测试+结课对比，让进步「肉眼可见」；当天建微信群，实时反馈上课状态；课前目标沟通，形成合理预期",
        "个性化教学：每节课前安排控笔训练，利用学生完成速度差异逐一讲解并制定个人学习计划",
        "分层内容设计：根据基础与进度差异，每个学生当天练习内容不同，解决「一锅烩」教学问题",
        "外部展示窗口：国庆、端午、元旦等节日统一使用精美作品纸，作品可带回家/发朋友圈，提升学生自豪感，家长自发转发带来转介绍",
      ],
      flowChart: ["痛点诊断", "→", "积分制上线", "→", "入学测试", "→", "个性化教学", "→", "节日作品展", "→", "口碑传播"],
    },
    deliverables: {
      title: "核心交付 · 产出了什么成果？",
      items: [
        { name: "积分制度方案", desc: "纪律+练习质量+作品三维评分，可兑换奖品", icon: "🏆" },
        { name: "入学测试体系", desc: "入学分析问题+展示作品，结课再对比，进步可视化", icon: "📋" },
        { name: "个性化学习计划", desc: "利用控笔训练时间差，为每位学员制定专属进度计划", icon: "📝" },
        { name: "节日作品展示机制", desc: "国庆/端午/元旦节日作品，家长自发转发，带来转介绍", icon: "🎨" },
      ],
    },
    impact: {
      title: "数据反馈 · 取得了什么成果？",
      metrics: [
        { value: "48人", label: "第6个月总学员数（目标40+）", color: "oklch(0.68 0.055 35)" },
        { value: "90%+", label: "续费率（原不足40%）", color: "oklch(0.52 0.060 35)" },
        { value: "50%+", label: "家长主动转介绍占比", color: "oklch(0.68 0.055 35)" },
        { value: "4班", label: "假期班满员（每班12人，提前售罄）", color: "oklch(0.40 0.035 155)" },
      ],
      summary: "6个月内从濒临关闭的6人班成长为假期4个满员班（48人），续费率从不足40%提升至90%+，家长主动转介绍占比超50%。机构负责人将该模式复制到其他班级，验证了方案的可迁移性。",
    },
  },
  {
    id: "leiao",
    title: "AI 产品客户需求调研",
    subtitle: "结构化需求梳理与跨团队信息对齐",
    company: "蕾奥人工智能科学研究院",
    period: "2024.11 — 2025.04",
    tags: ["需求调研", "用户访谈", "需求文档", "跨团队协作"],
    coverColor: "oklch(0.52 0.060 35)",
    coverIcon: "🤖",
    coverBg: "linear-gradient(135deg, oklch(0.960 0.010 75) 0%, oklch(0.930 0.018 75) 100%)",
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
        { value: "多家", label: "企业实地走访", color: "oklch(0.52 0.060 35)" },
        { value: "1本", label: "需求调研手册产出", color: "oklch(0.68 0.055 35)" },
        { value: "多场", label: "线下企业沙龙组织", color: "oklch(0.68 0.055 35)" },
        { value: "100%", label: "需求可追溯率", color: "oklch(0.40 0.035 155)" },
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
    coverColor: "oklch(0.40 0.035 155)",
    coverIcon: "🏫",
    coverBg: "linear-gradient(135deg, oklch(0.960 0.012 155) 0%, oklch(0.930 0.020 155) 100%)",
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
        { value: "30+", label: "人团队管理规模", color: "oklch(0.40 0.035 155)" },
        { value: "10+", label: "场活动成功落地", color: "oklch(0.68 0.055 35)" },
        { value: "1000+", label: "单场活动覆盖人数", color: "oklch(0.68 0.055 35)" },
        { value: "3年", label: "持续担任部门负责人", color: "oklch(0.52 0.060 35)" },
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
          <h2 className="text-2xl font-bold text-[oklch(0.27 0.035 155)] mb-1">{project.title}</h2>
          <p className="text-[oklch(0.50 0.025 155)] text-sm mb-3">{project.subtitle}</p>
          <div className="flex items-center gap-2 text-sm text-[oklch(0.50 0.025 155)] mb-4">
            <span className="font-medium text-[oklch(0.40 0.035 155)]">{project.company}</span>
            <span>·</span>
            <span>{project.period}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/70 text-[oklch(0.40 0.035 155)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex border-b border-[oklch(0.880 0.012 75)] px-6 flex-shrink-0 overflow-x-auto">
          {sections.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeSection === i
                  ? "border-[oklch(0.68 0.055 35)] text-[oklch(0.52 0.060 35)]"
                  : "border-transparent text-[oklch(0.50 0.025 155)] hover:text-[oklch(0.40 0.035 155)]"
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
              <h3 className="text-lg font-bold text-[oklch(0.27 0.035 155)] mb-3">
                {project.problem.title}
              </h3>
              <p className="text-[oklch(0.40_0.04_168)] leading-relaxed mb-5 text-sm">
                {project.problem.content}
              </p>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[oklch(0.40 0.035 155)]">核心痛点：</p>
                {project.problem.painPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[oklch(0.985 0.004 75)]">
                    <span className="text-[oklch(0.68 0.055 35)] font-bold text-sm flex-shrink-0">
                      P{i + 1}
                    </span>
                    <p className="text-sm text-[oklch(0.40 0.035 155)]">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Solution */}
          {activeSection === 1 && (
            <div className="prd-section">
              <h3 className="text-lg font-bold text-[oklch(0.27 0.035 155)] mb-3">
                {project.solution.title}
              </h3>
              <p className="text-[oklch(0.40_0.04_168)] leading-relaxed mb-5 text-sm">
                {project.solution.content}
              </p>
              {/* Flow chart */}
              {project.solution.flowChart && (
                <div className="mb-5 p-4 rounded-xl bg-[oklch(0.940 0.012 75)] overflow-x-auto">
                  <p className="text-xs font-semibold text-[oklch(0.50 0.025 155)] mb-3">流程图：</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {project.solution.flowChart.map((step, i) => (
                      <span
                        key={i}
                        className={
                          step === "→"
                            ? "text-[oklch(0.68 0.055 35)] font-bold"
                            : "px-3 py-1.5 rounded-lg bg-white text-xs font-medium text-[oklch(0.40 0.035 155)] border border-[oklch(0.880 0.012 75)] shadow-sm"
                        }
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[oklch(0.40 0.035 155)]">执行步骤：</p>
                {project.solution.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[oklch(0.68 0.055 35)] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-[oklch(0.40 0.035 155)] leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Deliverables */}
          {activeSection === 2 && (
            <div className="prd-section">
              <h3 className="text-lg font-bold text-[oklch(0.27 0.035 155)] mb-5">
                {project.deliverables.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.deliverables.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-[oklch(0.880 0.012 75)] bg-white hover:border-[oklch(0.68 0.055 35)] transition-colors"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm font-semibold text-[oklch(0.27 0.035 155)] mb-1">{item.name}</p>
                    <p className="text-xs text-[oklch(0.50 0.025 155)]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Impact */}
          {activeSection === 3 && (
            <div className="prd-section">
              <h3 className="text-lg font-bold text-[oklch(0.27 0.035 155)] mb-5">
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
              <div className="p-4 rounded-xl bg-[oklch(0.940 0.012 75)] border-l-4 border-[oklch(0.68 0.055 35)]">
                <p className="text-sm text-[oklch(0.40 0.035 155)] leading-relaxed">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.940 0.020 35)] text-[oklch(0.52 0.060 35)] text-sm font-medium mb-4">
            <span>💼</span> 项目案例
          </div>
          <h2 className="text-4xl font-bold text-[oklch(0.27 0.035 155)] mb-4">
            Portfolio · 项目深度拆解
          </h2>
          <p className="text-[oklch(0.50 0.025 155)] max-w-xl mx-auto">
            点击项目卡片，以 PRD 视角深度拆解每个项目的背景、方案、交付与成果
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className={`card-hover cursor-pointer rounded-3xl overflow-hidden border border-[oklch(0.880 0.012 75)] bg-white transition-all duration-700 ${
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
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[oklch(0.940 0.012 75)] text-[oklch(0.52 0.060 35)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-[oklch(0.27 0.035 155)] mb-1.5">
                  {project.title}
                </h3>
                <p className="text-sm text-[oklch(0.50 0.025 155)] mb-4">{project.subtitle}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[oklch(0.68 0.055 35)] font-medium">
                    {project.company}
                  </span>
                  <span className="text-xs text-[oklch(0.50 0.025 155)] font-display">
                    {project.period}
                  </span>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-6 pb-5">
                <div className="flex items-center gap-2 text-sm font-medium text-[oklch(0.68 0.055 35)] group">
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
