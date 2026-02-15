import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { NoiseBackground } from "@/components/ui/noise-background";
import { HeroParallax } from "@/components/ui/hero-parallax";

const gradientColors = [
  "rgb(80, 80, 80)",
  "rgb(140, 140, 140)",
  "rgb(50, 50, 50)",
];

export function HeroSection() {
  return (
    <HeroParallax>
      {/* Hero header — centered, full viewport height */}
      <div className="relative mx-auto px-6 md:px-10 w-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-center max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-black/10 bg-white/60 backdrop-blur-sm mb-8"
          >
            <div className="size-1.5 rounded-full bg-black/70 animate-pulse" />
            <span className="font-[Outfit] text-[11px] uppercase text-black/50 font-medium tracking-[0.15em]">
              AI-powered email intelligence
            </span>
          </motion.div>

          {/* Heading — Line 1 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-[Outfit] text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.04em] text-black font-light"
            >
              Get{" "}
              <span className="font-['Newsreader'] font-medium italic">
                <span className="bg-linear-to-r from-black via-black/35 to-black bg-clip-text text-transparent bg-size-[200%_100%] animate-[gradient-shift_4s_ease-in-out_infinite]">
                  clarity
                </span>
              </span>
            </motion.h1>
          </div>

          {/* Heading — Line 2 */}
          <div className="overflow-hidden -mt-1">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-[Outfit] text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.04em] text-black font-light"
            >
              over your inbox.
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
            className="font-['Newsreader'] text-[20px] leading-[1.7] text-black/60 font-light max-w-lg mt-8 mb-10"
          >
            Clarity reads, labels, and organizes every email{" "}
            <span className="text-black/70 font-normal">
              the moment it arrives
            </span>{" "}
            — so you never have to sort through noise again.
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
          >
            <NoiseBackground
              containerClassName="w-fit p-1.5 rounded-full"
              gradientColors={gradientColors}
              noiseIntensity={0.15}
              speed={0.08}
            >
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 h-full w-full cursor-pointer rounded-full bg-black px-7 py-3 font-[Outfit] text-[15px] font-medium tracking-tight text-white shadow-[0px_1px_0px_0px_rgba(255,255,255,0.06)_inset,0px_1px_2px_0px_rgba(0,0,0,0.4)] transition-all duration-100 active:scale-[0.98]"
              >
                Get Early Access
                <span className="text-white/50">&rarr;</span>
              </Link>
            </NoiseBackground>
          </motion.div>
        </div>
      </div>
    </HeroParallax>
  );
}
