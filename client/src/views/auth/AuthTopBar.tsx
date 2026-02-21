import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useTheme } from "@/components/theme/use-theme";
import { Sun, Moon, ArrowLeft } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

interface AuthTopBarProps {
  isDark: boolean;
}

export function AuthTopBar({ isDark }: AuthTopBarProps) {
  const { setTheme } = useTheme();

  return (
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
  );
}
