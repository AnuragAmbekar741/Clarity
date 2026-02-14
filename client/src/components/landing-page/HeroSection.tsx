import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { NoiseBackground } from "@/components/ui/noise-background";
import { EmailDashboard } from "./EmailDashboard";

const gradientColors = [
  "rgb(80, 80, 80)",
  "rgb(140, 140, 140)",
  "rgb(50, 50, 50)",
];

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
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-black/8 mb-6"
            >
              <div className="size-1.5 rounded-full bg-black/70 animate-pulse" />
              <span className="font-[Outfit] text-[10.5px] uppercase text-black/40 font-medium tracking-[0.15em]">
                AI-powered email intelligence
              </span>
            </motion.div>

            {/* Heading — Line 1 */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-[Outfit] text-[clamp(3rem,6vw,5rem)] leading-none tracking-[-0.035em] text-black font-light"
              >
                Get{" "}
                <span className="font-['Newsreader'] font-medium italic">
                  <span className="bg-linear-to-r pr-5 from-black via-black/40 to-black bg-clip-text text-transparent bg-size-[200%_100%] animate-[gradient-shift_4s_ease-in-out_infinite]">
                    clarity
                  </span>
                </span>
              </motion.h1>
            </div>

            {/* Heading — Line 2 */}
            <div className="overflow-hidden mb-5 -mt-6">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-[Outfit] text-[clamp(3rem,6vw,5rem)] leading-[1.05] tracking-[-0.035em] text-black font-light"
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
              className="font-['Newsreader'] text-[18px] leading-[1.7] text-black/40 font-light max-w-104 mb-7"
            >
              Clarity reads, labels, and organizes every email{" "}
              <span className="text-black/55">the moment it arrives</span> — so
              you never have to sort through noise again.
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
              className="flex flex-col gap-3.5"
            >
              <NoiseBackground
                containerClassName="w-fit p-1.5 rounded-full"
                gradientColors={gradientColors}
                noiseIntensity={0.15}
                speed={0.08}
              >
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 h-full w-full cursor-pointer rounded-full bg-black px-6 py-2.5 font-[Outfit] text-[15px] font-medium tracking-tight text-white shadow-[0px_1px_0px_0px_rgba(255,255,255,0.06)_inset,0px_1px_2px_0px_rgba(0,0,0,0.4)] transition-all duration-100 active:scale-[0.98]"
                >
                  Get Early Access
                  <span className="text-white/50">&rarr;</span>
                </Link>
              </NoiseBackground>
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
