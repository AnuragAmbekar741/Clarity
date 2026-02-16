import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "@/components/theme/use-theme";
import { Sun, Moon } from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();

  const headerBg = useTransform(scrollY, [0, 100], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 12]);

  const isDark = theme === "dark";

  return (
    <motion.nav
      style={{
        backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
        WebkitBackdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Background layer that fades in on scroll */}
      <motion.div
        style={{ opacity: headerBg }}
        className="absolute inset-0 bg-white/80 dark:bg-black/80 border-b border-black/5 dark:border-white/5"
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2"
        >
          <div className="size-7 bg-black dark:bg-white rounded-md flex items-center justify-center">
            <span className="font-[Syne] font-bold text-[11px] text-white dark:text-black tracking-tight">
              C
            </span>
          </div>
          <span className="font-[Syne] font-bold text-[18px] tracking-tight text-black dark:text-white">
            clarity
          </span>
        </motion.div>

        {/* Nav Links + Actions */}
        <div className="flex items-center gap-6">
          {/* Nav links - hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            {["Features", "How it works", "Demo"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                whileHover={{ y: -1 }}
                className="font-['DM_Sans'] text-[13px] text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-200 tracking-tight"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Theme toggle */}
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
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {isDark ? (
                <Sun className="size-3.5 text-white/70" />
              ) : (
                <Moon className="size-3.5 text-black/70" />
              )}
            </motion.div>
          </motion.button>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/auth"
              className="inline-flex items-center gap-1.5 rounded-full bg-black dark:bg-white px-5 py-2 font-[Syne] text-[13px] font-semibold text-white dark:text-black tracking-tight shadow-[0_1px_2px_rgba(0,0,0,0.2)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.1)] transition-all duration-150"
            >
              Get Access
              <span className="text-white/40 dark:text-black/40">&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
