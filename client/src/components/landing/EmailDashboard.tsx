import { motion, AnimatePresence } from "motion/react";
import { useEmailClassification, type ActiveEmail } from "./useEmailClassification";

const categories = [
  { key: "Finance", icon: "$" },
  { key: "Design", icon: "D" },
  { key: "Dev", icon: "/>" },
  { key: "Calendar", icon: "C" },
];

const labelStyles: Record<string, string> = {
  Finance: "bg-black dark:bg-white text-white dark:text-black",
  Design: "border border-black/20 dark:border-white/20 text-black dark:text-white",
  Dev: "bg-black/10 dark:bg-white/10 text-black dark:text-white",
  Calendar: "bg-black dark:bg-white text-white dark:text-black",
};

function SidebarIcon({
  icon,
  label,
  count,
  bumped,
}: {
  icon: string;
  label: string;
  count: number;
  bumped: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        animate={bumped ? { scale: [1, 1.3, 1], y: [0, -3, 0] } : { scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative size-8 rounded-lg bg-black/6 dark:bg-white/6 flex items-center justify-center"
      >
        <span className="font-[Syne] text-[10px] font-semibold text-black/40 dark:text-white/40">
          {icon}
        </span>
        <AnimatePresence mode="wait">
          {count > 0 && (
            <motion.div
              key={count}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-black dark:bg-white flex items-center justify-center"
            >
              <span className="text-white dark:text-black font-[Syne] text-[8px] font-bold">
                {count}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <span className="font-['DM_Sans'] text-[8px] text-black/25 dark:text-white/25">
        {label}
      </span>
    </div>
  );
}

function EmailRow({
  email,
  isLabeled,
  isSorting,
}: {
  email: ActiveEmail;
  isLabeled: boolean;
  isSorting: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30, height: 0 }}
      animate={{
        opacity: isSorting ? 0.2 : 1,
        x: isSorting ? -30 : 0,
        scale: isSorting ? 0.97 : 1,
        height: "auto",
      }}
      exit={{
        opacity: 0,
        x: -50,
        height: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30, height: { duration: 0.3 } }}
      whileHover={{
        backgroundColor: "rgba(128,128,128,0.03)",
        transition: { duration: 0.1 },
      }}
      className="flex items-center gap-2.5 px-3 py-2.5 border-b border-black/6 dark:border-white/6 last:border-b-0 cursor-default overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.08 }}
        className="size-7 rounded-full bg-black/6 dark:bg-white/8 flex items-center justify-center shrink-0"
      >
        <span className="font-[Syne] text-[10px] font-semibold text-black/45 dark:text-white/45 tracking-tight">
          {email.initials}
        </span>
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-['DM_Sans'] font-semibold text-[11.5px] text-black dark:text-white truncate">
            {email.sender}
          </span>
          <span className="font-['DM_Sans'] text-[10px] text-black/25 dark:text-white/25 shrink-0">
            {email.time}
          </span>
        </div>
        <p className="font-['DM_Sans'] text-[11px] text-black/50 dark:text-white/50 truncate leading-tight mt-0.5">
          {email.subject}
        </p>
      </div>
      <div className="shrink-0 w-14 flex justify-end">
        <AnimatePresence>
          {isLabeled && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className={`inline-flex items-center rounded-full px-1.5 py-0.5 font-['DM_Sans'] text-[9px] font-medium tracking-wide ${labelStyles[email.label] || "bg-black/10 dark:bg-white/10 text-black dark:text-white"}`}
            >
              {email.label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function StatusText({ text }: { text: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={text}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
        className="font-['DM_Sans'] text-[10px] text-black/40 dark:text-white/40"
      >
        {text}
      </motion.span>
    </AnimatePresence>
  );
}

export function EmailDashboard() {
  const {
    emails,
    labeledKeys,
    sortingKey,
    counts,
    bumpedCat,
    statusText,
    classifiedTotal,
  } = useEmailClassification();

  return (
    <div className="relative bg-white dark:bg-black/60 rounded-2xl border border-black/8 dark:border-white/8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(255,255,255,0.02),0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden backdrop-blur-sm">
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-black/6 dark:border-white/6">
        <div className="flex items-center gap-2">
          <div className="size-5 bg-black dark:bg-white rounded flex items-center justify-center">
            <span className="text-white dark:text-black font-[Syne] font-semibold text-[9px]">
              C
            </span>
          </div>
          <span className="font-[Syne] font-semibold text-[12px] text-black dark:text-white tracking-tight">
            Inbox
          </span>
          <motion.span
            key={emails.length}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="font-['DM_Sans'] text-[10px] text-black/25 dark:text-white/25 ml-0.5"
          >
            {emails.length}
          </motion.span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-5 px-2 rounded-md bg-black/4 dark:bg-white/6 flex items-center">
            <span className="font-['DM_Sans'] text-[9px] text-black/35 dark:text-white/35">
              All Mail
            </span>
          </div>
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(128,128,128,0)",
                "0 0 0 3px rgba(128,128,128,0.08)",
                "0 0 0 0 rgba(128,128,128,0)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            className="h-5 px-2 rounded-md bg-black dark:bg-white flex items-center"
          >
            <span className="font-['DM_Sans'] text-[9px] text-white dark:text-black font-medium">
              Smart Labels
            </span>
          </motion.div>
        </div>
      </div>

      <div className="flex h-96">
        <div className="w-14 border-r border-black/6 dark:border-white/6 bg-black/1.5 dark:bg-white/2 flex flex-col items-center py-3 gap-3.5 shrink-0">
          {categories.map((cat) => (
            <SidebarIcon
              key={cat.key}
              icon={cat.icon}
              label={cat.key}
              count={counts[cat.key]}
              bumped={bumpedCat === cat.key}
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-3 py-1.5 border-b border-black/6 dark:border-white/6 bg-black/1.5 dark:bg-white/2 flex items-center gap-2 shrink-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="size-3 rounded-full border-[1.5px] border-black dark:border-white border-t-transparent dark:border-t-transparent shrink-0"
            />
            <StatusText text={statusText} />
          </div>
          <div className="flex-1 overflow-hidden">
            <AnimatePresence initial mode="popLayout">
              {emails.map((email) => (
                <EmailRow
                  key={email.key}
                  email={email}
                  isLabeled={labeledKeys.has(email.key)}
                  isSorting={sortingKey === email.key}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="px-3 py-2 border-t border-black/6 dark:border-white/6 bg-black/1.5 dark:bg-white/2 flex items-center justify-between">
        <motion.span
          key={classifiedTotal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-['DM_Sans'] text-[10px] text-black/25 dark:text-white/25"
        >
          {classifiedTotal} of 248 classified
        </motion.span>
        <div className="h-1 w-8 rounded-full bg-black/6 dark:bg-white/6 overflow-hidden">
          <motion.div
            animate={{
              width: `${Math.min((classifiedTotal / 248) * 100 + 2, 100)}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-black dark:bg-white rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
