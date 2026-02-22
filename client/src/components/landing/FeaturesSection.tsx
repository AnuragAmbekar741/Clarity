import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Tag, Search, Zap } from "lucide-react";

const features = [
  {
    icon: Tag,
    title: "Auto-labeling",
    description:
      "Every incoming email is instantly classified — finance, design, dev, calendar — without lifting a finger.",
    detail: "Powered by fine-tuned NLP models that learn your patterns.",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description:
      "Search by meaning, not keywords. Find 'that invoice from last month' without remembering the sender.",
    detail: "Vector embeddings understand context, not just text.",
  },
  {
    icon: Zap,
    title: "NLP Actions",
    description:
      "Delete, archive, reply, or forward — all through natural language. Just say what you want done.",
    detail: "Intent detection turns your words into email actions.",
  },
];

// TODO(human): Implement the feature highlight selection strategy
function getFeatureHighlightClass(_index: number): string {
  return "";
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const Icon = feature.icon;
  const highlightClass = getFeatureHighlightClass(index);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative p-8 md:p-10 rounded-2xl border border-black/6 dark:border-white/6 bg-white/50 dark:bg-white/[0.02] hover:border-black/12 dark:hover:border-white/12 transition-all duration-300 ${highlightClass}`}
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: -5 }}
        className="size-12 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] flex items-center justify-center mb-6"
      >
        <Icon className="size-5 text-black/60 dark:text-white/60" strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <h3 className="font-[Syne] text-[22px] font-bold tracking-tight text-black dark:text-white mb-3">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="font-['DM_Sans'] text-[15px] leading-[1.7] text-black/50 dark:text-white/50 mb-4">
        {feature.description}
      </p>

      {/* Technical detail */}
      <p className="font-['DM_Sans'] text-[12px] text-black/30 dark:text-white/30 italic">
        {feature.detail}
      </p>

      {/* Hover reveal line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-8 right-8 h-px bg-black/10 dark:bg-white/10 origin-left"
      />
    </motion.div>
  );
}

export function FeaturesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="features" className="relative py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header — staggered reveal (simplified when prefers-reduced-motion) */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.12,
                delayChildren: prefersReducedMotion ? 0 : 0.05,
              },
            },
          }}
          className="text-center mb-20"
        >
          <motion.span
            variants={{
              hidden: {
                opacity: 0,
                ...(prefersReducedMotion ? {} : { y: 16, filter: "blur(4px)" }),
              },
              visible: {
                opacity: 1,
                ...(prefersReducedMotion ? {} : { y: 0, filter: "blur(0px)" }),
              },
            }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-['DM_Sans'] text-[11px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30 mb-4 block"
          >
            Features
          </motion.span>
          <h2 className="font-[Syne] text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-black dark:text-white leading-tight text-balance overflow-hidden">
            <motion.span
              variants={{
                hidden: {
                  opacity: 0,
                  ...(prefersReducedMotion ? {} : { y: "1em" }),
                },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Your inbox,{" "}
              <span className="italic font-['Newsreader'] font-medium text-black/40 dark:text-white/40">
                understood.
              </span>
            </motion.span>
          </h2>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
