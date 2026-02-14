import { Link } from "@tanstack/react-router";
import { NoiseBackground } from "@/components/ui/noise-background";

const gradientColors = [
  "rgb(80, 80, 80)",
  "rgb(140, 140, 140)",
  "rgb(50, 50, 50)",
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-[Outfit] font-medium text-xl tracking-tight text-black">
            CLARITY.
          </span>
        </div>

        <NoiseBackground
          containerClassName="w-fit p-1 rounded-full"
          gradientColors={gradientColors}
          noiseIntensity={0.15}
          speed={0.06}
        >
          <Link
            to="/auth"
            className="inline-flex items-center h-full w-full cursor-pointer rounded-full bg-black px-5 py-1.5 font-[Outfit] text-sm font-medium tracking-tight text-white shadow-[0px_1px_0px_0px_rgba(255,255,255,0.06)_inset,0px_1px_2px_0px_rgba(0,0,0,0.4)] transition-all duration-100 active:scale-[0.98]"
          >
            Get Access
          </Link>
        </NoiseBackground>
      </div>
    </nav>
  );
}
