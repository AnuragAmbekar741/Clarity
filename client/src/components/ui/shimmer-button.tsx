import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  size?: "sm" | "default";
}

export function ShimmerButton({
  children,
  to,
  className,
  size = "default",
}: ShimmerButtonProps) {
  const buttonStyles = {
    sm: "px-5 py-2 text-sm",
    default: "px-7 py-2.5 text-[15px]",
  };

  return (
    <div className="group relative w-fit rounded-full p-[1.5px]">
      {/* Rotating shimmer border — tight neutral range for subtle light-catch */}
      <div
        className="absolute inset-0 rounded-full opacity-60 blur-[0.5px] transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background:
            "conic-gradient(from var(--shimmer-angle, 0deg), rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.04) 70%, rgba(0,0,0,0.12) 100%)",
          animation: "shimmer-spin 4s linear infinite",
        }}
      />
      {/* Soft outer glow on hover */}
      <div
        className="absolute -inset-1 rounded-full opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-20"
        style={{
          background:
            "conic-gradient(from var(--shimmer-angle, 0deg), transparent 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
          animation: "shimmer-spin 4s linear infinite",
        }}
      />
      <Link
        to={to}
        className={cn(
          "relative z-10 rounded-full",
          "bg-black text-white",
          "font-[Outfit] font-medium tracking-tight",
          "shadow-[0px_2px_0px_0px_rgba(255,255,255,0.06)_inset,0px_1px_2px_0px_rgba(0,0,0,0.3)]",
          "transition-all duration-150 active:scale-[0.98]",
          "inline-flex items-center justify-center",
          buttonStyles[size],
          className
        )}
      >
        {children}
      </Link>
    </div>
  );
}
