import { ShimmerButton } from "@/components/ui/shimmer-button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-[Outfit] font-medium text-xl tracking-tight text-black">
            CLARITY.
          </span>
        </div>

        <ShimmerButton to="/auth" size="sm">
          Get Access
        </ShimmerButton>
      </div>
    </nav>
  );
}
