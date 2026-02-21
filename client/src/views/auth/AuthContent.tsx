import { motion } from "motion/react";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

const ease = [0.22, 1, 0.36, 1] as const;

interface AuthContentProps {
  isDark: boolean;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  onGoogleSuccess: (response: CredentialResponse) => void;
  onGoogleError: () => void;
}

export function AuthContent({
  isDark,
  isPending,
  isError,
  error,
  onGoogleSuccess,
  onGoogleError,
}: AuthContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease }}
      className="relative z-10 w-full max-w-sm mx-auto px-6"
    >
      <div className="flex flex-col items-center text-center">
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

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className={`w-full ${isPending ? "opacity-50 pointer-events-none" : ""}`}
        >
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={onGoogleError}
              theme={isDark ? "filled_black" : "outline"}
              size="large"
            />
          </div>
        </motion.div>

        {isError && error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-destructive font-['DM_Sans']"
          >
            {error instanceof Error ? error.message : "Authentication failed"}
          </motion.p>
        )}

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
  );
}
