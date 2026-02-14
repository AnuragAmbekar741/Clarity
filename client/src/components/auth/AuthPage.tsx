import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";

export function AuthPage() {
  const { handleGoogleSuccess, handleGoogleError, isPending, isError, error } =
    useGoogleAuth();
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.025) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm mx-auto px-6"
      >
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-10"
          >
            <span className="font-[Outfit] font-medium text-2xl tracking-tight text-black">
              CLARITY.
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-['Instrument_Serif'] text-3xl leading-tight tracking-[-0.02em] text-black mb-3"
          >
            Welcome back
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-[Outfit] text-[15px] text-black/40 font-light mb-10"
          >
            Sign in to your account to continue
          </motion.p>

          {/* Google button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`w-full ${isPending ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
              />
            </div>
          </motion.div>

          {/* Error message */}
          {isError && error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-red-600 font-[Outfit]"
            >
              {(error as any)?.message || "Authentication failed"}
            </motion.p>
          )}

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="w-full flex items-center gap-4 my-8"
          >
            <div className="flex-1 h-px bg-black/6" />
            <span className="font-[Outfit] text-[11px] text-black/20 uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-black/6" />
          </motion.div>

          {/* Terms */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-[Outfit] text-[12px] text-black/25 leading-relaxed max-w-xs"
          >
            By continuing, you agree to Clarity's{" "}
            <span className="text-black/40 underline underline-offset-2 cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-black/40 underline underline-offset-2 cursor-pointer">
              Privacy Policy
            </span>
          </motion.p>
        </div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Link
            to="/"
            className="font-[Outfit] text-[13px] text-black/30 hover:text-black/60 transition-colors"
          >
            ← Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
