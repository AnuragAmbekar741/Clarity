import { motion } from "motion/react";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";
import { useTheme } from "@/components/theme/use-theme";
import { AuthBackground } from "./AuthBackground";
import { AuthTopBar } from "./AuthTopBar";
import { AuthContent } from "./AuthContent";

const ease = [0.22, 1, 0.36, 1] as const;

function AuthDecoration({ isDark }: { isDark: boolean }) {
  const stroke = isDark ? "rgba(255,255,255," : "rgba(0,0,0,";
  const rings = [
    { r: 60, opacity: 0.06, dash: "none", duration: "60s" },
    { r: 110, opacity: 0.04, dash: "4 8", duration: "90s" },
    { r: 160, opacity: 0.03, dash: "2 12", duration: "120s" },
    { r: 210, opacity: 0.02, dash: "1 16", duration: "150s" },
  ];

  return (
    <motion.svg
      width="440"
      height="440"
      viewBox="0 0 440 440"
      initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease }}
    >
      {rings.map(({ r, opacity, dash, duration }, i) => (
        <g key={i}>
          <circle
            cx="220"
            cy="220"
            r={r}
            fill="none"
            stroke={`${stroke}${opacity})`}
            strokeWidth="0.75"
            strokeDasharray={dash}
          />
          <circle r="2" fill={`${stroke}${opacity * 1.5})`}>
            <animateMotion
              dur={duration}
              repeatCount="indefinite"
              path={`M ${220 + r},220 A ${r},${r} 0 1,1 ${220 + r - 0.01},220`}
            />
          </circle>
        </g>
      ))}
      <line
        x1="210"
        y1="220"
        x2="230"
        y2="220"
        stroke={`${stroke}0.06)`}
        strokeWidth="0.5"
      />
      <line
        x1="220"
        y1="210"
        x2="220"
        y2="230"
        stroke={`${stroke}0.06)`}
        strokeWidth="0.5"
      />
    </motion.svg>
  );
}

export function Auth() {
  const {
    handleGoogleSuccess,
    handleGoogleError,
    isPending,
    isError,
    error,
  } = useGoogleAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative min-h-screen bg-white dark:bg-[oklch(0.141_0.005_285.823)] flex items-center justify-center overflow-hidden">
      <AuthBackground isDark={isDark} />
      <AuthTopBar isDark={isDark} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-2">
        <AuthDecoration isDark={isDark} />
      </div>
      <AuthContent
        isDark={isDark}
        isPending={isPending}
        isError={isError}
        error={error}
        onGoogleSuccess={handleGoogleSuccess}
        onGoogleError={handleGoogleError}
      />
    </div>
  );
}
