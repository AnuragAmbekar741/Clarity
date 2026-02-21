import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

// Showcase items representing different dashboard views
const showcaseItems = [
  { title: "Smart Inbox", subtitle: "AI-sorted inbox view" },
  { title: "Label Pipeline", subtitle: "Auto-classification" },
  { title: "Finance Filter", subtitle: "Financial emails grouped" },
  { title: "Design Updates", subtitle: "Design feedback organized" },
  { title: "Dev Notifications", subtitle: "GitHub & Jira sorted" },
  { title: "Calendar Sync", subtitle: "Meeting emails extracted" },
  { title: "Priority Queue", subtitle: "Urgent items surfaced" },
  { title: "Weekly Digest", subtitle: "Classified mail summary" },
  { title: "Smart Labels", subtitle: "One-click categorization" },
  { title: "Team Inbox", subtitle: "Shared workspace view" },
  { title: "Analytics", subtitle: "Email pattern insights" },
  { title: "Auto-Sort", subtitle: "Zero-touch organization" },
  { title: "Quick Actions", subtitle: "Bulk label & archive" },
  { title: "Focus Mode", subtitle: "Only what matters" },
  { title: "Search & Filter", subtitle: "Find any email instantly" },
  { title: "Attachments", subtitle: "Files auto-organized" },
  { title: "Snooze Queue", subtitle: "Timed follow-ups" },
  { title: "Unsubscribe", subtitle: "One-click cleanup" },
  { title: "Thread View", subtitle: "Conversations grouped" },
  { title: "Integrations", subtitle: "Slack & Notion sync" },
];

type ShowcaseItem = (typeof showcaseItems)[0];

// Miniature dashboard mockup card
function MockDashboardCard({
  item,
  variant,
}: {
  item: ShowcaseItem;
  variant: number;
}) {
  const rows = [3, 4, 5, 3, 4][variant % 5];
  const labelWidths = ["w-10", "w-12", "w-8", "w-14", "w-9"];

  return (
    <div className="h-full w-full bg-white rounded-xl border border-black/8 overflow-hidden flex flex-col">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-black/6">
        <div className="size-4 bg-black rounded flex items-center justify-center">
          <span className="text-white font-[Outfit] font-bold text-[7px]">
            C
          </span>
        </div>
        <span className="font-[Outfit] font-semibold text-[10px] text-black tracking-tight">
          {item.title}
        </span>
        <div className="ml-auto h-4 px-2 rounded bg-black/5 flex items-center">
          <span className="font-[Outfit] text-[8px] text-black/30">
            {item.subtitle}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-9 border-r border-black/6 bg-black/[0.02] flex flex-col items-center py-2.5 gap-2">
          {["$", "D", "/>", "C"].map((icon) => (
            <div
              key={icon}
              className="size-5 rounded bg-black/5 flex items-center justify-center"
            >
              <span className="font-[Outfit] text-[7px] font-semibold text-black/30">
                {icon}
              </span>
            </div>
          ))}
        </div>

        {/* Email rows */}
        <div className="flex-1">
          {Array.from({ length: rows }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2.5 border-b border-black/4"
            >
              <div className="size-5 rounded-full bg-black/6 shrink-0" />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="h-1.5 bg-black/10 rounded-full w-16" />
                <div className="h-1 bg-black/5 rounded-full w-24" />
              </div>
              <div
                className={`h-3.5 ${labelWidths[i % 5]} rounded-full ${i % 2 === 0 ? "bg-black" : "bg-black/10"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  item,
  translate,
  index,
}: {
  item: ShowcaseItem;
  translate: MotionValue<number>;
  index: number;
}) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <div className="h-full w-full rounded-2xl border border-black/8 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden transition-shadow duration-500 group-hover/product:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_20px_60px_rgba(0,0,0,0.1)]">
        <MockDashboardCard item={item} variant={index} />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-40 bg-white pointer-events-none rounded-2xl transition-opacity duration-300" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 font-[Outfit] font-semibold text-sm text-black tracking-tight transition-all duration-300">
        {item.title}
      </h2>
    </motion.div>
  );
}

export function HeroParallax({ children }: { children?: React.ReactNode }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-200, 100]),
    springConfig
  );

  const firstRow = showcaseItems.slice(0, 5);
  const secondRow = showcaseItems.slice(5, 10);
  const thirdRow = showcaseItems.slice(10, 15);
  const fourthRow = showcaseItems.slice(15, 20);

  return (
    <div
      ref={ref}
      className="h-[300vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {children}
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((item, i) => (
            <ProductCard
              key={item.title}
              item={item}
              translate={translateX}
              index={i}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((item, i) => (
            <ProductCard
              key={item.title}
              item={item}
              translate={translateXReverse}
              index={i + 5}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {thirdRow.map((item, i) => (
            <ProductCard
              key={item.title}
              item={item}
              translate={translateX}
              index={i + 10}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-20">
          {fourthRow.map((item, i) => (
            <ProductCard
              key={item.title}
              item={item}
              translate={translateXReverse}
              index={i + 15}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
