import { Link } from "@tanstack/react-router";
import { NoiseBackground } from "@/components/ui/noise-background";
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
  const containerStyles = {
    sm: "w-fit p-[3px] rounded-full",
    default: "w-fit p-[3.5px] rounded-full",
  };

  const buttonStyles = {
    sm: "px-5 py-2 text-sm",
    default: "px-7 py-2.5 text-[15px]",
  };

  return (
    <NoiseBackground
      containerClassName={cn(
        containerStyles[size],
        "bg-neutral-300 shadow-none"
      )}
      gradientColors={[
        "rgb(180, 180, 180)",
        "rgb(80, 80, 80)",
        "rgb(220, 220, 220)",
      ]}
      noiseIntensity={0.25}
      speed={0.08}
    >
      <Link
        to={to}
        className={cn(
          "h-full w-full cursor-pointer rounded-full",
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
    </NoiseBackground>
  );
}
