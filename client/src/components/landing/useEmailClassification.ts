import { useEffect, useRef, useState } from "react";

export type Email = {
  id: number;
  sender: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  label: string;
};

export type ActiveEmail = Email & { key: number };

const emailPool: Email[] = [
  { id: 1, sender: "Alex Chen", initials: "AC", subject: "Q4 Revenue Report", preview: "Quarterly revenue breakdown attached", time: "2m", label: "Finance" },
  { id: 2, sender: "Sarah Kim", initials: "SK", subject: "Design review — Homepage v3", preview: "Latest iteration of the homepage", time: "5m", label: "Design" },
  { id: 3, sender: "GitHub", initials: "GH", subject: "PR #482 merged to main", preview: "feat: add smart label pipeline", time: "12m", label: "Dev" },
  { id: 4, sender: "Lina Patel", initials: "LP", subject: "Meeting rescheduled to 3pm", preview: "Pushing our sync to 3pm today", time: "18m", label: "Calendar" },
  { id: 5, sender: "Stripe", initials: "ST", subject: "Payment of $2,400 received", preview: "From Acme Corp — Invoice #1049", time: "24m", label: "Finance" },
  { id: 6, sender: "David Ruiz", initials: "DR", subject: "Re: Brand guidelines update", preview: "Small note on the logo spacing", time: "31m", label: "Design" },
  { id: 7, sender: "AWS", initials: "AW", subject: "Your monthly invoice is ready", preview: "January 2026 — $342.18", time: "35m", label: "Finance" },
  { id: 8, sender: "Jira", initials: "JR", subject: "CLAR-291 moved to In Review", preview: "Landing page hero section", time: "40m", label: "Dev" },
  { id: 9, sender: "Cal.com", initials: "CC", subject: "New booking confirmed", preview: "30-min call tomorrow at 2pm", time: "45m", label: "Calendar" },
  { id: 10, sender: "Figma", initials: "FG", subject: "New comment on Homepage v3", preview: "The spacing on the nav feels off", time: "48m", label: "Design" },
  { id: 11, sender: "Linear", initials: "LN", subject: "Issue ENG-204 assigned to you", preview: "Fix label classification timeout", time: "52m", label: "Dev" },
  { id: 12, sender: "QuickBooks", initials: "QB", subject: "Expense report ready", preview: "February expenses total: $1,280", time: "58m", label: "Finance" },
];

export function useEmailClassification() {
  const [emails, setEmails] = useState<ActiveEmail[]>([]);
  const [labeledKeys, setLabeledKeys] = useState<Set<number>>(new Set());
  const [sortingKey, setSortingKey] = useState<number | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({ Finance: 0, Design: 0, Dev: 0, Calendar: 0 });
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
      const batch: ActiveEmail[] = [];
      for (let i = 0; i < 4; i++) batch.push(getNext());
      for (let i = 0; i < batch.length; i++) {
        updateEmails(() => batch.slice(0, i + 1));
        await wait(150);
        if (cancelled) return;
      }
      await wait(1800);
      if (cancelled) return;

      while (!cancelled) {
        const current = emailsRef.current;
        const labeled = labeledRef.current;
        const target = current.find((e) => !labeled.has(e.key));
        if (!target) {
          await wait(400);
          continue;
        }

        setStatusText(`Labeling: ${target.subject.slice(0, 24)}…`);
        await wait(1200);
        if (cancelled) return;

        updateLabeled((prev) => new Set([...prev, target.key]));
        setStatusText(`Classified → ${target.label}`);
        await wait(1100);
        if (cancelled) return;

        setSortingKey(target.key);
        await wait(500);
        if (cancelled) return;

        updateEmails((prev) => prev.filter((e) => e.key !== target.key));
        updateLabeled((prev) => {
          const s = new Set(prev);
          s.delete(target.key);
          return s;
        });
        setSortingKey(null);
        setCounts((prev) => ({ ...prev, [target.label]: (prev[target.label] || 0) + 1 }));
        setBumpedCat(target.label);
        setClassifiedTotal((prev) => prev + 1);
        setStatusText("Classifying incoming mail…");
        await wait(400);
        if (cancelled) return;

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

  return {
    emails,
    labeledKeys,
    sortingKey,
    counts,
    bumpedCat,
    statusText,
    classifiedTotal,
  };
}
