interface AuthBackgroundProps {
  isDark: boolean;
}

export function AuthBackground({ isDark }: AuthBackgroundProps) {
  return (
    <>
      {/* Background dot grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Radial orbs for depth */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-100 h-100 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)",
        }}
      />

      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-1">
        <svg className="w-full h-full opacity-30 dark:opacity-20">
          <filter id="auth-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#auth-grain)"
            className="animate-[grain-move_8s_steps(10)_infinite]"
          />
        </svg>
      </div>

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)"
            : "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.04) 100%)",
        }}
      />
    </>
  );
}
