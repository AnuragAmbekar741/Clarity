import { Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function Footer() {
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
    <footer className="relative pb-12">
      {/* Final CTA Section */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto px-6 md:px-10 mb-20"
      >
        <div className="relative rounded-3xl border border-black/6 dark:border-white/6 bg-black/[0.02] dark:bg-white/[0.02] py-20 px-8 text-center overflow-hidden">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

          <div className="relative z-10">
            <h2 className="font-[Syne] text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-tight text-black dark:text-white leading-tight mb-4">
              Ready to clear the noise?
            </h2>
            <p className="font-['DM_Sans'] text-[16px] text-black/40 dark:text-white/40 max-w-md mx-auto mb-8">
              Join the waitlist and be the first to experience an inbox that understands you.
            </p>
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
          </div>
        </div>
      </motion.div>

      {/* Bottom footer */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-black/5 dark:border-white/5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="size-5 bg-black dark:bg-white rounded flex items-center justify-center">
            <span className="font-[Syne] font-bold text-[8px] text-white dark:text-black">C</span>
          </div>
          <span className="font-[Syne] font-semibold text-[14px] tracking-tight text-black dark:text-white">
            clarity
          </span>
        </div>

        {/* Copyright */}
        <span className="font-['DM_Sans'] text-[12px] text-black/30 dark:text-white/30">
          &copy; {new Date().getFullYear()} Clarity. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
