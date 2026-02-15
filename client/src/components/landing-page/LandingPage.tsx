import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";

export function LandingPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* ── Background layers ── */}

      {/* 1. Dot grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* 2. Radial gradient orbs — create focal depth */}
      <div
        className="absolute top-[15%] left-[10%] w-150 h-150 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[5%] right-[5%] w-175 h-175 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.025) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[40%] w-125 h-125 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)",
        }}
      />

      {/* 3. Film grain overlay (SVG noise filter) */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.35]">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* 4. Subtle vignette — darker edges */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.03) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
}
