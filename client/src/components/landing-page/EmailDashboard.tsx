import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Email = {
  id: number;
  sender: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  label: string;
};

type ActiveEmail = Email & { key: number };

const emailPool: Email[] = [
  {
    id: 1,
    sender: "Alex Chen",
    initials: "AC",
    subject: "Q4 Revenue Report",
    preview: "Quarterly revenue breakdown attached",
    time: "2m",
    label: "Finance",
  },
  {
    id: 2,
    sender: "Sarah Kim",
    initials: "SK",
    subject: "Design review — Homepage v3",
    preview: "Latest iteration of the homepage",
    time: "5m",
    label: "Design",
  },
  {
    id: 3,
    sender: "GitHub",
    initials: "GH",
    subject: "PR #482 merged to main",
    preview: "feat: add smart label pipeline",
    time: "12m",
    label: "Dev",
  },
  {
    id: 4,
    sender: "Lina Patel",
    initials: "LP",
    subject: "Meeting rescheduled to 3pm",
    preview: "Pushing our sync to 3pm today",
    time: "18m",
    label: "Calendar",
  },
  {
    id: 5,
    sender: "Stripe",
    initials: "ST",
    subject: "Payment of $2,400 received",
    preview: "From Acme Corp — Invoice #1049",
    time: "24m",
    label: "Finance",
  },
  {
    id: 6,
    sender: "David Ruiz",
    initials: "DR",
    subject: "Re: Brand guidelines update",
    preview: "Small note on the logo spacing",
    time: "31m",
    label: "Design",
  },
  {
    id: 7,
    sender: "AWS",
    initials: "AW",
    subject: "Your monthly invoice is ready",
    preview: "January 2026 — $342.18",
    time: "35m",
    label: "Finance",
  },
  {
    id: 8,
    sender: "Jira",
    initials: "JR",
    subject: "CLAR-291 moved to In Review",
    preview: "Landing page hero section",
    time: "40m",
    label: "Dev",
  },
  {
    id: 9,
    sender: "Cal.com",
    initials: "CC",
    subject: "New booking confirmed",
    preview: "30-min call tomorrow at 2pm",
    time: "45m",
    label: "Calendar",
  },
  {
    id: 10,
    sender: "Figma",
    initials: "FG",
    subject: "New comment on Homepage v3",
    preview: "The spacing on the nav feels off",
    time: "48m",
    label: "Design",
  },
  {
    id: 11,
    sender: "Linear",
    initials: "LN",
    subject: "Issue ENG-204 assigned to you",
    preview: "Fix label classification timeout",
    time: "52m",
    label: "Dev",
  },
  {
    id: 12,
    sender: "QuickBooks",
    initials: "QB",
    subject: "Expense report ready",
    preview: "February expenses total: $1,280",
    time: "58m",
    label: "Finance",
  },
];

const categories = [
  { key: "Finance", icon: "$" },
  { key: "Design", icon: "D" },
  { key: "Dev", icon: "/>" },
  { key: "Calendar", icon: "C" },
];

const labelStyles: Record<string, string> = {
  Finance: "bg-black text-white",
  Design: "border border-black text-black",
  Dev: "bg-black/10 text-black",
  Calendar: "bg-black text-white",
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
        animate={
          bumped ? { scale: [1, 1.3, 1], y: [0, -3, 0] } : { scale: 1, y: 0 }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative size-8 rounded-lg bg-black/6 flex items-center justify-center"
      >
        <span className="font-[Outfit] text-[10px] font-semibold text-black/40">
          {icon}
        </span>
        <AnimatePresence mode="wait">
          {count > 0 && (
            <motion.div
              key={count}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-black flex items-center justify-center"
            >
              <span className="text-white font-[Outfit] text-[8px] font-bold">
                {count}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <span className="font-[Outfit] text-[8px] text-black/25">{label}</span>
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
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        height: { duration: 0.3 },
      }}
      whileHover={{
        backgroundColor: "rgba(0,0,0,0.015)",
        transition: { duration: 0.1 },
      }}
      className="flex items-center gap-2.5 px-3 py-2.5 border-b border-black/6 last:border-b-0 cursor-default overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
          delay: 0.08,
        }}
        className="size-7 rounded-full bg-black/6 flex items-center justify-center shrink-0"
      >
        <span className="font-[Outfit] text-[10px] font-semibold text-black/45 tracking-tight">
          {email.initials}
        </span>
      </motion.div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-[Outfit] font-semibold text-[11.5px] text-black truncate">
            {email.sender}
          </span>
          <span className="font-[Outfit] text-[10px] text-black/25 shrink-0">
            {email.time}
          </span>
        </div>
        <p className="font-[Outfit] text-[11px] text-black/50 truncate leading-tight mt-0.5">
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
              className={`inline-flex items-center rounded-full px-1.5 py-0.5 font-[Outfit] text-[9px] font-medium tracking-wide ${
                labelStyles[email.label] || "bg-black/10 text-black"
              }`}
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
        className="font-[Outfit] text-[10px] text-black/40"
      >
        {text}
      </motion.span>
    </AnimatePresence>
  );
}

export function EmailDashboard() {
  const [emails, setEmails] = useState<ActiveEmail[]>([]);
  const [labeledKeys, setLabeledKeys] = useState<Set<number>>(new Set());
  const [sortingKey, setSortingKey] = useState<number | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({
    Finance: 0,
    Design: 0,
    Dev: 0,
    Calendar: 0,
  });
  const [bumpedCat, setBumpedCat] = useState<string | null>(null);
  const [statusText, setStatusText] = useState("Scanning inbox...");
  const [classifiedTotal, setClassifiedTotal] = useState(0);

  const poolIdx = useRef(0);
  const keyCounter = useRef(0);
  const emailsRef = useRef<ActiveEmail[]>([]);
  const labeledRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    emailsRef.current = emails;
  }, [emails]);
  useEffect(() => {
    labeledRef.current = labeledKeys;
  }, [labeledKeys]);

  function getNext(): ActiveEmail {
    const e = emailPool[poolIdx.current % emailPool.length];
    poolIdx.current++;
    keyCounter.current++;
    return { ...e, key: keyCounter.current };
  }

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(() => {
          if (!cancelled) resolve();
        }, ms);
        timers.push(t);
      });

    const updateEmails = (fn: (prev: ActiveEmail[]) => ActiveEmail[]) => {
      setEmails((prev) => {
        const next = fn(prev);
        emailsRef.current = next;
        return next;
      });
    };

    const updateLabeled = (fn: (prev: Set<number>) => Set<number>) => {
      setLabeledKeys((prev) => {
        const next = fn(prev);
        labeledRef.current = next;
        return next;
      });
    };

    async function run() {
      // Initialize with 4 emails staggered
      const batch: ActiveEmail[] = [];
      for (let i = 0; i < 4; i++) {
        batch.push(getNext());
      }

      for (let i = 0; i < batch.length; i++) {
        updateEmails(() => batch.slice(0, i + 1));
        await wait(150);
        if (cancelled) return;
      }

      await wait(1800);
      if (cancelled) return;

      // Main processing loop
      while (!cancelled) {
        const current = emailsRef.current;
        const labeled = labeledRef.current;
        const target = current.find((e) => !labeled.has(e.key));

        if (!target) {
          await wait(400);
          continue;
        }

        // Phase 1: Show "labeling" status
        setStatusText(`Labeling: ${target.subject.slice(0, 24)}...`);
        await wait(1200);
        if (cancelled) return;

        // Phase 2: Apply label
        updateLabeled((prev) => new Set([...prev, target.key]));
        setStatusText(`Classified → ${target.label}`);
        await wait(1100);
        if (cancelled) return;

        // Phase 3: Sort animation (slide to sidebar)
        setSortingKey(target.key);
        await wait(500);
        if (cancelled) return;

        // Phase 4: Remove from list, update sidebar
        updateEmails((prev) => prev.filter((e) => e.key !== target.key));
        updateLabeled((prev) => {
          const s = new Set(prev);
          s.delete(target.key);
          return s;
        });
        setSortingKey(null);
        setCounts((prev) => ({
          ...prev,
          [target.label]: (prev[target.label] || 0) + 1,
        }));
        setBumpedCat(target.label);
        setClassifiedTotal((prev) => prev + 1);
        setStatusText("Classifying incoming mail...");

        await wait(400);
        if (cancelled) return;

        // Phase 5: Add new email
        const next = getNext();
        updateEmails((prev) => [...prev, next]);
        setBumpedCat(null);

        await wait(500);
      }
    }

    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative w-full max-w-175">
      {/* Outer glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-4 bg-black/3 rounded-3xl blur-2xl"
      />

      {/* Dashboard container */}
      <div className="relative bg-white rounded-2xl border border-black/8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-black/6">
          <div className="flex items-center gap-2">
            <div className="size-5 bg-black rounded flex items-center justify-center">
              <span className="text-white font-[Outfit] font-semibold text-[9px]">
                C
              </span>
            </div>
            <span className="font-[Outfit] font-semibold text-[12px] text-black tracking-tight">
              Inbox
            </span>
            <motion.span
              key={emails.length}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="font-[Outfit] text-[10px] text-black/25 ml-0.5"
            >
              {emails.length}
            </motion.span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-5 px-2 rounded-md bg-black/4 flex items-center">
              <span className="font-[Outfit] text-[9px] text-black/35">
                All Mail
              </span>
            </div>
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(0,0,0,0)",
                  "0 0 0 3px rgba(0,0,0,0.05)",
                  "0 0 0 0 rgba(0,0,0,0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
              className="h-5 px-2 rounded-md bg-black flex items-center"
            >
              <span className="font-[Outfit] text-[9px] text-white font-medium">
                Smart Labels
              </span>
            </motion.div>
          </div>
        </div>

        {/* Main content: sidebar + email list */}
        <div className="flex h-[27.5rem]">
          {/* Sidebar */}
          <div className="w-14 border-r border-black/6 bg-black/1.5 flex flex-col items-center py-3 gap-3.5 shrink-0">
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

          {/* Email list */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Processing indicator */}
            <div className="px-3 py-1.5 border-b border-black/6 bg-black/1.5 flex items-center gap-2 shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="size-3 rounded-full border-[1.5px] border-black border-t-transparent shrink-0"
              />
              <StatusText text={statusText} />
            </div>

            {/* Emails */}
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

        {/* Bottom bar */}
        <div className="px-3 py-2 border-t border-black/6 bg-black/1.5 flex items-center justify-between">
          <motion.span
            key={classifiedTotal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-[Outfit] text-[10px] text-black/25"
          >
            {classifiedTotal} of 248 classified
          </motion.span>
          <div className="h-1 w-8 rounded-full bg-black/6 overflow-hidden">
            <motion.div
              animate={{
                width: `${Math.min((classifiedTotal / 248) * 100 + 2, 100)}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-black rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
