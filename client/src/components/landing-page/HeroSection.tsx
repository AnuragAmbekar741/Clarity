import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "motion/react";
import { EmailDashboard } from "./EmailDashboard";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
          {/* Left — Typography */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 mb-8"
            >
              <div className="size-1.5 rounded-full bg-black animate-pulse" />
              <span className="font-[Outfit] text-[12px] text-black/50 font-medium tracking-wide">
                AI-powered email intelligence
              </span>
            </motion.div>

            {/* Heading */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-['Instrument_Serif'] text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-black"
              >
                Your inbox,
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-['Instrument_Serif'] text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] italic"
              >
                <span className="relative inline-block">
                  <span className="bg-linear-to-r from-black via-black/50 to-black bg-clip-text text-transparent bg-size-[200%_100%] animate-[gradient-shift_3s_ease-in-out_infinite]">
                    finally understood.
                  </span>
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.55,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="font-[Outfit] text-[17px] leading-relaxed text-black/45 font-light max-w-md mb-10"
            >
              Clarity reads, labels, and organizes every email the moment it
              arrives — so you never have to sort through noise again.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex items-center gap-4"
            >
              <ShimmerButton to="/auth">
                Get Early Access
              </ShimmerButton>
            </motion.div>
          </div>

          {/* Right — Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center lg:justify-end"
          >
            <EmailDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
