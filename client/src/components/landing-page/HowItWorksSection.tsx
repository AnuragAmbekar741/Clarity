import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Link2, Brain, MousePointerClick } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect",
    description:
      "Link your email account with one click. We use read-only OAuth — your credentials never touch our servers.",
    micro: "OAuth 2.0 · Read-only · Zero credentials stored",
  },
  {
    number: "02",
    icon: Brain,
    title: "Classify",
    description:
      "Our NLP engine reads every incoming email and auto-labels it by intent: finance, design, dev, scheduling, and more.",
    micro: "Fine-tuned NLP · 50ms latency · 12+ categories",
  },
  {
    number: "03",
    icon: MousePointerClick,
    title: "Act",
    description:
      "Search semantically, batch-delete noise, auto-archive, or set rules — all in natural language.",
    micro: "Natural language · Bulk actions · Smart rules",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Icon container with pulse ring on hover */}
      <div className="relative mb-8">
        {/* Pulse ring behind icon */}
        <motion.div
          animate={
            isHovered
              ? {
                  scale: [1, 1.6, 1.8],
                  opacity: [0.15, 0.05, 0],
                }
              : { scale: 1, opacity: 0 }
          }
          transition={{
            duration: 1.2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-2xl border border-black/10 dark:border-white/10"
        />

        <motion.div
          whileHover={{ scale: 1.08, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative size-20 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/3 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] cursor-pointer"
        >
          <motion.div
            animate={isHovered ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Icon
              className="size-7 text-black/50 dark:text-white/50 transition-colors duration-300 group-hover:text-black/80 dark:group-hover:text-white/80"
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Step number badge */}
          <motion.span
            animate={
              isInView
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
              delay: index * 0.2 + 0.3,
            }}
            className="absolute -top-2.5 -right-2.5 font-[Syne] text-[10px] font-bold text-white dark:text-black bg-black dark:bg-white border-2 border-white dark:border-[#0a0a0a] rounded-full size-7 flex items-center justify-center shadow-sm"
          >
            {step.number}
          </motion.span>
        </motion.div>
      </div>

      {/* Title */}
      <h3 className="font-[Syne] text-[22px] font-bold tracking-tight text-black dark:text-white mb-3">
        {step.title}
      </h3>

      {/* Description */}
      <p className="font-['DM_Sans'] text-[14px] leading-[1.7] text-black/45 dark:text-white/45 max-w-65 mb-4">
        {step.description}
      </p>

      {/* Micro specs — revealed on scroll */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.2 + 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex items-center gap-1.5 flex-wrap justify-center"
      >
        {step.micro.split(" · ").map((spec) => (
          <span
            key={spec}
            className="font-['DM_Sans'] text-[10px] px-2 py-0.5 rounded-full bg-black/3 dark:bg-white/5 text-black/30 dark:text-white/30 tracking-wide"
          >
            {spec}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/** SVG connector arrow drawn between step icons */
function ConnectorLine({
  isInView,
  index,
}: {
  isInView: boolean;
  index: number;
}) {
  return (
    <div className="hidden md:flex items-center justify-center">
      <svg width="100%" height="40" viewBox="0 0 120 40" fill="none" className="overflow-visible">
        {/* Dashed line */}
        <motion.line
          x1="0"
          y1="20"
          x2="100"
          y2="20"
          className="stroke-black/10 dark:stroke-white/10"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : {}
          }
          transition={{
            duration: 0.8,
            delay: index * 0.3 + 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        {/* Arrow head */}
        <motion.polygon
          points="100,20 92,15 92,25"
          className="fill-black/15 dark:fill-white/15"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : {}
          }
          transition={{
            duration: 0.3,
            delay: index * 0.3 + 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        {/* Traveling dot */}
        <motion.circle
          r="2.5"
          className="fill-black/30 dark:fill-white/30"
          initial={{ cx: 0, cy: 20, opacity: 0 }}
          animate={
            isInView
              ? {
                  cx: [0, 100],
                  cy: 20,
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{
            duration: 1.2,
            delay: index * 0.3 + 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>
    </div>
  );
}

export function HowItWorksSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stepsRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const isStepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Parallax background accent */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 pointer-events-none"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
      </motion.div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="font-['DM_Sans'] text-[11px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30 mb-4 block">
            How it works
          </span>
          <h2 className="font-[Syne] text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-black dark:text-white leading-tight">
            Three steps to{" "}
            <span className="italic font-['Newsreader'] font-medium text-black/40 dark:text-white/40">
              zero noise.
            </span>
          </h2>
        </motion.div>

        {/* Steps grid: Card — Connector — Card — Connector — Card */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr_80px_1fr] gap-8 md:gap-0 items-start"
        >
          {steps.map((step, i) => (
            <>
              <StepCard key={step.number} step={step} index={i} />
              {i < steps.length - 1 && (
                <ConnectorLine
                  key={`connector-${i}`}
                  isInView={isStepsInView}
                  index={i}
                />
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
