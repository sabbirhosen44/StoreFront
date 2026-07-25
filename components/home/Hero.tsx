import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[540px] md:min-h-[580px] lg:min-h-[640px] bg-[url('/images/hero-bg.jpg')] bg-cover bg-center flex items-center py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 animate-fade-in duration-700" />

      <div className="relative z-10 container-center w-full flex justify-center md:justify-end">
        <div className="bg-furniro-beige rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-[580px] w-full h-fit shadow-lg animate-in fade-in slide-in-from-right-10 duration-1000 ease-out">
          <span className="text-foreground font-semibold tracking-[3px] text-xs sm:text-sm block mb-2 sm:mb-3">
            New Arrival
          </span>

          <h1 className="text-furniro-gold font-heading text-2xl sm:text-4xl lg:text-[3.25rem] font-bold leading-tight sm:leading-snug lg:leading-[1.15] tracking-tight mb-3 sm:mb-4">
            Discover Our <br className="hidden sm:inline" /> New Collection
          </h1>

          <p className="text-foreground/90 text-xs sm:text-sm md:text-base font-medium leading-relaxed mb-6 sm:mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>

          <Link href="/products">
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider rounded-none px-8 py-4 sm:px-12 sm:py-5 lg:px-14 lg:py-6 cursor-pointer scale-100 hover:scale-[1.03] active:scale-98 transition-all duration-300">
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
