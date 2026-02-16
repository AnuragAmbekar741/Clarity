import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";
import { useTheme } from "@/components/theme/use-theme";
import { Sun, Moon, ArrowLeft } from "lucide-react";

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
          {/* Orbital dot on each ring */}
          <circle r="2" fill={`${stroke}${opacity * 1.5})`}>
            <animateMotion
              dur={duration}
              repeatCount="indefinite"
              path={`M ${220 + r},220 A ${r},${r} 0 1,1 ${220 + r - 0.01},220`}
            />
          </circle>
        </g>
      ))}
      {/* Center crosshair */}
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

export function AuthPage() {
  const { handleGoogleSuccess, handleGoogleError, isPending, isError, error } =
    useGoogleAuth();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative min-h-screen bg-white dark:bg-[oklch(0.141_0.005_285.823)] flex items-center justify-center overflow-hidden">
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

      {/* Top bar: back + theme toggle */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 h-16 flex items-center justify-between max-w-6xl mx-auto"
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-['DM_Sans'] text-[13px] text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </Link>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="size-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors duration-200 cursor-pointer"
          aria-label="Toggle theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ duration: 0.4, ease }}
          >
            {isDark ? (
              <Sun className="size-3.5 text-white/70" />
            ) : (
              <Moon className="size-3.5 text-black/70" />
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Decorative visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-2">
        <AuthDecoration isDark={isDark} />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease }}
        className="relative z-10 w-full max-w-sm mx-auto px-6"
      >
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="mb-12"
          >
            <div className="flex items-center gap-2.5">
              <div className="size-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <span className="font-[Syne] font-bold text-[12px] text-white dark:text-black tracking-tight">
                  C
                </span>
              </div>
              <span className="font-[Syne] font-bold text-[22px] tracking-tight text-black dark:text-white">
                clarity
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="font-[Syne] text-[clamp(1.8rem,5vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-black dark:text-white mb-3"
          >
            Welcome{" "}
            <span className="italic font-['Newsreader'] font-medium">back</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="font-['DM_Sans'] text-[15px] text-black/40 dark:text-white/40 font-light mb-10"
          >
            Sign in to continue to your inbox
          </motion.p>

          {/* Google sign-in */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className={`w-full ${
              isPending ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme={isDark ? "filled_black" : "outline"}
                size="large"
              />
            </div>
          </motion.div>

          {/* Error message */}
          {isError && error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-red-500 dark:text-red-400 font-['DM_Sans']"
            >
              {(error as any)?.message || "Authentication failed"}
            </motion.p>
          )}

          {/* Terms */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="font-['DM_Sans'] text-[12px] text-black/25 dark:text-white/25 leading-relaxed max-w-xs mt-8"
          >
            By continuing, you agree to Clarity's{" "}
            <span className="text-black/40 dark:text-white/40 underline underline-offset-2 cursor-pointer hover:text-black/60 dark:hover:text-white/60 transition-colors">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-black/40 dark:text-white/40 underline underline-offset-2 cursor-pointer hover:text-black/60 dark:hover:text-white/60 transition-colors">
              Privacy Policy
            </span>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
