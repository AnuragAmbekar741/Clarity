import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-[Outfit] font-medium text-xl tracking-tight text-black">
            CLARITY.
          </span>
        </div>

        <Button className="bg-black text-white hover:bg-black/85 rounded-md px-5 h-9 font-[Outfit] font-medium text-sm tracking-tight">
          Get Access
        </Button>
      </div>
    </nav>
  );
}
