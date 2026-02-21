import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import { EmailDashboard } from "./EmailDashboard";

export function DemoSection() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5], [8, 2, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);

  return (
    <section
      id="demo"
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="font-['DM_Sans'] text-[11px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30 mb-4 block">
            Live Demo
          </span>
          <h2 className="font-[Syne] text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-black dark:text-white leading-tight">
            Watch it{" "}
            <span className="italic font-['Newsreader'] font-medium text-black/40 dark:text-white/40">
              think.
            </span>
          </h2>
          <p className="font-['DM_Sans'] text-[16px] text-black/40 dark:text-white/40 mt-4 max-w-md mx-auto">
            Emails arrive, get classified in real-time, and sort themselves into the right categories.
          </p>
        </motion.div>

        {/* Dashboard with parallax perspective */}
        <motion.div
          style={{
            y,
            rotateX,
            scale,
            transformPerspective: 1200,
          }}
          className="w-full max-w-2xl mx-auto"
        >
          {/* Glow effect behind the dashboard */}
          <div className="absolute inset-0 -m-8 bg-gradient-to-b from-black/[0.02] via-transparent to-black/[0.02] dark:from-white/[0.02] dark:via-transparent dark:to-white/[0.02] rounded-3xl blur-2xl pointer-events-none" />

          <EmailDashboard />
        </motion.div>
      </div>
    </section>
  );
}
