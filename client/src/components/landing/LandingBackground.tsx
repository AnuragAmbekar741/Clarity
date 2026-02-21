export function LandingBackground() {
  return (
    <>
      {/* 1. Dot grid pattern — adapts to theme */}
      <div
        className="fixed inset-0 pointer-events-none opacity-100 dark:opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* 2. Radial gradient orbs — depth */}
      <div
        className="absolute top-[15%] left-[10%] w-150 h-150 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[15%] left-[10%] w-150 h-150 pointer-events-none hidden dark:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[5%] right-[5%] w-175 h-175 pointer-events-none dark:hidden"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.025) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-[5%] right-[5%] w-175 h-175 pointer-events-none hidden dark:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 65%)",
        }}
      />

      {/* 3. Film grain overlay */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.3] dark:opacity-[0.2]">
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

      {/* 4. Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.04) 100%)",
        }}
      />
    </>
  );
}
