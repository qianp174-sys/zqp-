/*
 * AboutSection — S型成长地图
 * 设计：北欧温柔风，奶油米白背景
 * 节点：从下往上 — 教育背景 → 校园经历 → 蕾奥AI → 海文辉 → 个人目标
 * 交互：点击节点，小车沿路径右侧行驶（偏移22px），不遮挡节点
 * 桌面端：右侧详情卡片淡入
 * 手机端：底部浮层 Bottom Sheet 弹出，右上角 × 关闭，无需滚动
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

const PATH_D = "M 200 880 C 200 800, 80 740, 80 660 C 80 580, 320 520, 320 440 C 320 360, 80 300, 80 220 C 80 140, 200 80, 200 60";

const NODES = [
  {
    id: "education",
    progress: 0.0,
    svgX: 200,
    svgY: 880,
    label: "教育背景",
    icon: "🎓",
    tag: "起点",
    tagColor: "oklch(0.68 0.055 35)",
    title: "东莞城市学院 · 软件工程",
    period: "2022.09 — 2026.06",
    details: [
      "主修课程：软件工程、数据库原理、软件测试、数据结构与算法、操作系统",
      "综合成绩年级前 15%，多次获得单项奖学金",
      "软件工程背景为产品思维提供了系统化、结构化的底层逻辑",
    ],
    metrics: [{ label: "成绩排名", value: "前15%" }],
  },
  {
    id: "campus",
    progress: 0.30,
    svgX: 80,
    svgY: 660,
    label: "校园经历",
    icon: "🏫",
    tag: "统筹管理",
    tagColor: "oklch(0.52 0.060 35)",
    title: "校心理部门部长 · 东莞城市学院",
    period: "2022.10 — 2025.12",
    details: [
      "统筹管理 30+ 人部门，建立策划、宣传、执行三组协作流程",
      "策划并落地 10+ 场校园心理游园会及系列讲座",
      "完成活动方案、预算编制、跨部门场地协调及现场调度",
      "单场活动覆盖超 1000 人",
    ],
    metrics: [
      { label: "团队规模", value: "30+" },
      { label: "活动场次", value: "10+" },
      { label: "单场覆盖", value: "1000+" },
    ],
  },
  {
    id: "leiao",
    progress: 0.58,
    svgX: 320,
    svgY: 440,
    label: "蕾奥 AI 实习",
    icon: "🤖",
    tag: "产品实习",
    tagColor: "oklch(0.68 0.055 35)",
    title: "蕾奥人工智能科学研究院 · 产品实习生",
    period: "2024.11 — 2025.04",
    details: [
      "协同负责人实地走访多家企业，结构化会议纪要，梳理《客户需求调研手册》",
      "将模糊痛点转化为可追溯的需求清单，确保外部需求与内部研发信息对齐",
      "独立策划多场线下企业沙龙，输出含时间线、场地、物料的详细执行清单",
      "会后完成含参与率、反馈及改进项的复盘报告并归档为团队模板",
    ],
    metrics: [{ label: "核心产出", value: "需求调研手册" }],
  },
  {
    id: "haiwenhui",
    progress: 0.80,
    svgX: 80,
    svgY: 220,
    label: "海文辉传媒实习",
    icon: "📊",
    tag: "运营实习",
    tagColor: "oklch(0.60 0.058 35)",
    title: "深圳市海文辉传媒 · 运营实习生",
    period: "2026.01 — 2026.05",
    details: [
      "从 0 到 1 建立「选题-脚本-拍摄-剪辑-发布-转化」全流程 SOP",
      "使用飞书多维表格搭建项目进度仪表盘，管理三大平台超 100 条内容任务",
      "每周收集播放量、互动率、转化率等 KPI，制作可视化复盘报告",
      "通过数据反向推导选题方向与脚本优化点",
    ],
    metrics: [
      { label: "发布率", value: "95%+" },
      { label: "报名率提升", value: "30%" },
    ],
  },
  {
    id: "goal",
    progress: 1.0,
    svgX: 200,
    svgY: 60,
    label: "个人目标",
    icon: "🚀",
    tag: "终点",
    tagColor: "oklch(0.68 0.055 35)",
    title: "产品经理 · 数字化流程专家",
    period: "未来",
    details: [
      "以软件工程背景为底层逻辑，以用户洞察为核心驱动",
      "擅长将复杂流程结构化，用数据驱动产品决策",
      "目标成为能连接技术与业务的优秀产品经理",
      "持续深耕 AI 产品与数字化运营领域",
    ],
    metrics: [{ label: "目标方向", value: "产品经理" }],
  },
];

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function offsetPoint(
  pt: { x: number; y: number },
  angle: number,
  offset: number
): { x: number; y: number } {
  const perpRad = ((angle + 90) * Math.PI) / 180;
  return {
    x: pt.x + Math.cos(perpRad) * offset,
    y: pt.y + Math.sin(perpRad) * offset,
  };
}

// SVG Road Map (shared between mobile and desktop)
function RoadMap({
  pathRef,
  carPos,
  activeNode,
  isAnimating,
  onNodeClick,
  maxHeight,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  carPos: { x: number; y: number; angle: number };
  activeNode: string | null;
  isAnimating: boolean;
  onNodeClick: (node: typeof NODES[0]) => void;
  maxHeight?: string;
}) {
  return (
    <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-4 lg:p-6 shadow-lg border border-[oklch(0.880_0.012_75)]">
      <svg
        viewBox="0 0 400 940"
        className="w-full"
        style={{ maxHeight: maxHeight ?? "580px" }}
      >
        <path d={PATH_D} fill="none" stroke="#c8f0e4" strokeWidth="10" />
        <path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          stroke="#4db896"
          strokeWidth="2.5"
          strokeDasharray="12 8"
          style={{ animation: "dash-flow 2s linear infinite" }}
        />
        {NODES.map((node) => (
          <g
            key={node.id}
            onClick={() => onNodeClick(node)}
            style={{ cursor: isAnimating ? "wait" : "pointer" }}
          >
            <circle
              cx={node.svgX}
              cy={node.svgY}
              r="28"
              fill={activeNode === node.id ? "#d4f5ea" : "transparent"}
            />
            <circle
              cx={node.svgX}
              cy={node.svgY}
              r="22"
              fill={activeNode === node.id ? "#f0fdf9" : "white"}
              stroke={
                activeNode === node.id
                  ? "oklch(0.68 0.055 35)"
                  : "oklch(0.820 0.040 35)"
              }
              strokeWidth={activeNode === node.id ? "2.5" : "1.5"}
            />
            <text
              x={node.svgX}
              y={node.svgY + 7}
              textAnchor="middle"
              fontSize="16"
            >
              {node.icon}
            </text>
            <text
              x={node.svgX > 200 ? node.svgX - 32 : node.svgX + 32}
              y={node.svgY - 5}
              textAnchor={node.svgX > 200 ? "end" : "start"}
              fontSize="11"
              fill="#1a4a3a"
              fontWeight="700"
              fontFamily="Noto Sans SC, sans-serif"
            >
              {node.label}
            </text>
            <text
              x={node.svgX > 200 ? node.svgX - 32 : node.svgX + 32}
              y={node.svgY + 11}
              textAnchor={node.svgX > 200 ? "end" : "start"}
              fontSize="9"
              fill="oklch(0.68 0.055 35)"
              fontFamily="DM Sans, sans-serif"
            >
              {node.period}
            </text>
          </g>
        ))}
        {/* Car — offset 22px to the right of path direction */}
        <g
          transform={`translate(${carPos.x}, ${carPos.y}) rotate(${carPos.angle + 90})`}
        >
          <ellipse cx="0" cy="12" rx="13" ry="3.5" fill="#1a4a3a" opacity="0.10" />
          <rect x="-13" y="-8" width="26" height="15" rx="5" fill="oklch(0.68 0.055 35)" />
          <rect x="-8" y="-16" width="16" height="10" rx="4" fill="#1e7a58" />
          <rect x="-6.5" y="-14" width="5.5" height="5.5" rx="1.5" fill="#b8f0de" opacity="0.9" />
          <rect x="1" y="-14" width="5.5" height="5.5" rx="1.5" fill="#b8f0de" opacity="0.9" />
          <circle cx="-7.5" cy="7" r="4" fill="#1a4a3a" />
          <circle cx="7.5" cy="7" r="4" fill="#1a4a3a" />
          <circle cx="-7.5" cy="7" r="1.8" fill="#78d4b0" />
          <circle cx="7.5" cy="7" r="1.8" fill="#78d4b0" />
          <rect x="11" y="-2.5" width="3.5" height="4.5" rx="1.5" fill="#f0fdf9" opacity="0.95" />
          <rect x="-13" y="-0.5" width="26" height="1.5" rx="0.75" fill="white" opacity="0.2" />
        </g>
      </svg>
      <p className="text-center text-xs text-[oklch(0.68_0.055_35)] mt-2 font-medium">
        ↑ 点击节点，小车将沿赛道行驶
      </p>
    </div>
  );
}

// Detail card content (shared)
function NodeDetailContent({ nodeData }: { nodeData: typeof NODES[0] }) {
  return (
    <>
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[oklch(0.940_0.012_75)] flex items-center justify-center text-2xl flex-shrink-0">
          {nodeData.icon}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full text-white"
              style={{ backgroundColor: nodeData.tagColor }}
            >
              {nodeData.tag}
            </span>
          </div>
          <h3 className="text-xl font-bold text-[oklch(0.27_0.035_155)]">
            {nodeData.title}
          </h3>
          <p className="text-sm text-[oklch(0.50_0.025_155)] mt-0.5">
            {nodeData.period}
          </p>
        </div>
      </div>
      {/* Details */}
      <ul className="space-y-3 mb-6">
        {nodeData.details.map((detail, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.68_0.055_35)] mt-2 flex-shrink-0" />
            <p className="text-sm text-[oklch(0.40_0.035_155)] leading-relaxed">
              {detail}
            </p>
          </li>
        ))}
      </ul>
      {/* Metrics */}
      {nodeData.metrics.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-4 border-t border-[oklch(0.880_0.012_75)]">
          {nodeData.metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex-1 min-w-[100px] bg-[oklch(0.940_0.012_75)] rounded-xl p-3 text-center"
            >
              <div className="text-lg font-bold text-[oklch(0.68_0.055_35)]">
                {metric.value}
              </div>
              <div className="text-xs text-[oklch(0.50_0.025_155)] mt-0.5">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function AboutSection() {
  const pathRef = useRef<SVGPathElement>(null);
  const [carPos, setCarPos] = useState({ x: 222, y: 880, angle: -90 });
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useIsMobile();
  // Mobile bottom sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getCarPosAtProgress = useCallback((progress: number) => {
    const path = pathRef.current;
    if (!path) return { x: 222, y: 880, angle: -90 };
    const len = path.getTotalLength();
    const p = progress * len;
    const pt = path.getPointAtLength(p);
    const p2 = path.getPointAtLength(Math.min(p + 2, len));
    const angle = Math.atan2(p2.y - pt.y, p2.x - pt.x) * (180 / Math.PI);
    const offsetPt = offsetPoint(pt, angle, 22);
    return { x: offsetPt.x, y: offsetPt.y, angle };
  }, []);

  const handleNodeClick = useCallback((node: typeof NODES[0]) => {
    if (isAnimating) return;
    if (!pathRef.current) return;

    setIsAnimating(true);
    setCardVisible(false);
    // Close existing sheet before opening new one
    setSheetVisible(false);

    const startProgress = currentProgressRef.current;
    const endProgress = node.progress;
    const duration = (Math.abs(endProgress - startProgress) * 2.5 + 0.4) * 1000;
    const startTime = performance.now();

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawT = Math.min(elapsed / duration, 1);
      const t = easeInOut(rawT);
      const progress = startProgress + (endProgress - startProgress) * t;
      const pos = getCarPosAtProgress(progress);
      setCarPos(pos);

      if (rawT < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        currentProgressRef.current = endProgress;
        setActiveNode(node.id);
        setIsAnimating(false);

        if (isMobile) {
          // Open bottom sheet
          setSheetOpen(true);
          setTimeout(() => setSheetVisible(true), 20);
        } else {
          // Desktop: fade in right panel
          setTimeout(() => setCardVisible(true), 100);
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isAnimating, getCarPosAtProgress]);

  const closeSheet = useCallback(() => {
    setSheetVisible(false);
    setTimeout(() => setSheetOpen(false), 300);
  }, []);

  useEffect(() => {
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, []);

  const activeNodeData = NODES.find((n) => n.id === activeNode);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-hero-gradient"
    >
      {/* Background decorative dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 right-12 opacity-[0.06]">
          {Array.from({ length: 6 }).map((_, row) => (
            <div key={row} className="flex gap-5 mb-5">
              {Array.from({ length: 6 }).map((_, col) => (
                <div
                  key={col}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "oklch(0.68 0.055 35)" }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.940_0.020_35)] text-[oklch(0.52_0.060_35)] text-sm font-medium mb-4">
            <span>🗺️</span> 成长地图
          </div>
          <h2 className="text-4xl font-bold text-[oklch(0.27_0.035_155)] mb-4">
            About Me · 我的个人经历
          </h2>
          <p className="text-[oklch(0.50_0.025_155)] max-w-xl mx-auto">
            点击路径上的节点，小车将沿 S 型赛道行驶，带你探索每一段故事
          </p>
        </div>

        {/* Desktop layout: side by side */}
        <div className="hidden lg:flex gap-8 items-start">
          <div
            className={`w-[420px] flex-shrink-0 transition-all duration-700 delay-200 ${
              sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <RoadMap
              pathRef={pathRef}
              carPos={carPos}
              activeNode={activeNode}
              isAnimating={isAnimating}
              onNodeClick={handleNodeClick}
              maxHeight="580px"
            />
          </div>

          {/* Desktop detail card */}
          <div className="flex-1 min-h-[400px] flex items-start">
            {!activeNode ? (
              <div className="w-full flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 rounded-full bg-[oklch(0.940_0.020_35)] flex items-center justify-center mb-4">
                  <span className="text-2xl">🚗</span>
                </div>
                <p className="text-[oklch(0.50_0.025_155)] text-center max-w-xs leading-relaxed text-sm">
                  点击地图上的任意节点，小车将驶向那段经历，详细内容将在这里展示
                </p>
              </div>
            ) : (
              <div
                className={`w-full transition-all duration-500 ${
                  cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {activeNodeData && (
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-[oklch(0.880_0.012_75)]">
                    <NodeDetailContent nodeData={activeNodeData} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile layout: map only, detail in bottom sheet */}
        <div
          className={`lg:hidden transition-all duration-700 delay-200 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <RoadMap
            pathRef={pathRef}
            carPos={carPos}
            activeNode={activeNode}
            isAnimating={isAnimating}
            onNodeClick={handleNodeClick}
            maxHeight="480px"
          />
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      {sheetOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
              sheetVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeSheet}
          />
          {/* Sheet */}
          <div
            className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
              sheetVisible ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ maxHeight: "80vh" }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-[oklch(0.880_0.012_75)]" />
            </div>
            {/* Close button */}
            <button
              onClick={closeSheet}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[oklch(0.940_0.012_75)] flex items-center justify-center text-[oklch(0.50_0.025_155)] hover:bg-[oklch(0.920_0.020_35)] transition-colors"
              aria-label="关闭"
            >
              <X size={16} />
            </button>
            {/* Scrollable content */}
            <div className="overflow-y-auto px-6 pb-8 pt-2" style={{ maxHeight: "calc(80vh - 48px)" }}>
              {activeNodeData && <NodeDetailContent nodeData={activeNodeData} />}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
