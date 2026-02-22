import { motion, useScroll, useTransform, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { EmailDashboard } from "./EmailDashboard";

export function DemoSection() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

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
        {/* Section header — staggered reveal (simplified when prefers-reduced-motion) */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.1,
                delayChildren: prefersReducedMotion ? 0 : 0.05,
              },
            },
          }}
          className="text-center mb-16"
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
            Live Demo
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
              Watch it{" "}
              <span className="italic font-['Newsreader'] font-medium text-black/40 dark:text-white/40">
                think.
              </span>
            </motion.span>
          </h2>
          <motion.p
            variants={{
              hidden: {
                opacity: 0,
                ...(prefersReducedMotion ? {} : { y: 12 }),
              },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-['DM_Sans'] text-[16px] text-black/40 dark:text-white/40 mt-4 max-w-md mx-auto"
          >
            Emails arrive, get classified in real-time, and sort themselves into the right categories.
          </motion.p>
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
