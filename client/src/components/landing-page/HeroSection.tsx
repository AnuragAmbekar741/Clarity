import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax floating elements — abstract geometric shapes */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[15%] left-[8%] size-72 rounded-full border border-black/4 dark:border-white/4"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[60%] right-[10%] size-48 rounded-full border border-black/6 dark:border-white/6"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[30%] right-[25%] size-2 rounded-full bg-black/20 dark:bg-white/20 animate-[float_6s_ease-in-out_infinite]"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[70%] left-[20%] size-1.5 rounded-full bg-black/15 dark:bg-white/15 animate-[float_8s_ease-in-out_infinite_1s]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[20%] right-[15%] size-1 rounded-full bg-black/10 dark:bg-white/10 animate-[float_7s_ease-in-out_infinite_2s]"
      />

      {/* Main content */}
      <motion.div
        style={{ y: y1, opacity, scale }}
        className="relative z-10 mx-auto px-6 md:px-10 w-full flex flex-col items-center text-center max-w-5xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-black/8 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm mb-10"
        >
          <div className="relative flex items-center justify-center">
            <div className="size-1.5 rounded-full bg-black dark:bg-white" />
            <div className="absolute size-1.5 rounded-full bg-black/40 dark:bg-white/40 animate-[pulse-ring_2s_ease-out_infinite]" />
          </div>
          <span className="font-['DM_Sans'] text-[11px] uppercase text-black/45 dark:text-white/45 font-medium tracking-[0.18em]">
            AI-powered email intelligence
          </span>
        </motion.div>

        {/* Heading — Line 1 */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="font-[Syne] text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.04em] text-black dark:text-white font-bold"
          >
            Get{" "}
            <span className="italic font-['Newsreader'] font-medium">
              <span className="bg-linear-to-r from-black via-black/30 to-black dark:from-white dark:via-white/30 dark:to-white bg-clip-text text-transparent bg-size-[200%_100%] animate-[gradient-shift_4s_ease-in-out_infinite]">
                clarity
              </span>
            </span>
          </motion.h1>
        </div>

        {/* Heading — Line 2 */}
        <div className="overflow-hidden -mt-1">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="font-[Syne] text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.04em] text-black dark:text-white font-bold"
          >
            over your inbox.
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
          className="font-['DM_Sans'] text-[18px] md:text-[20px] leading-[1.7] text-black/50 dark:text-white/50 font-light max-w-lg mt-8 mb-12"
        >
          Clarity reads, labels, and organizes every email{" "}
          <span className="text-black/80 dark:text-white/80 font-normal">
            the moment it arrives
          </span>{" "}
          so you never sort through noise again.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="flex items-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/auth"
              className="group inline-flex items-center gap-2 rounded-full bg-black dark:bg-white px-8 py-3.5 font-[Syne] text-[15px] font-semibold text-white dark:text-black tracking-tight shadow-[0_2px_8px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] transition-all duration-200"
            >
              Get Early Access
              <span className="text-white/40 dark:text-black/40 group-hover:translate-x-0.5 transition-transform duration-200">
                &rarr;
              </span>
            </Link>
          </motion.div>

          <motion.a
            href="#demo"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-8 py-3.5 font-[Syne] text-[15px] font-semibold text-black/70 dark:text-white/70 tracking-tight hover:border-black/20 dark:hover:border-white/20 transition-all duration-200"
          >
            See Demo
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-black/15 dark:border-white/15 flex items-start justify-center p-1"
          >
            <motion.div
              animate={{ height: ["4px", "10px", "4px"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 rounded-full bg-black/25 dark:bg-white/25"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
