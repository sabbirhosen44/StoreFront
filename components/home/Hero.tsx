import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] bg-[url('/images/hero-bg.jpg')] bg-cover bg-center md:bg-left flex items-center py-12 md:py-0 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 animate-fade-in duration-700" />

      <div className="relative z-10 container-center w-full flex justify-center md:justify-end">
        <div className="bg-furniro-beige rounded-xl p-6 sm:p-8 md:pt-12 md:pb-8 md:px-10 max-w-full sm:max-w-xl md:max-w-160 w-full shadow-sm animate-in fade-in slide-in-from-right-20 duration-1500 ease-out">
          <span className="text-foreground font-semibold tracking-[3px] text-xs sm:text-sm md:text-base block mb-1 md:mb-2 delay-100 animate-in fade-in slide-in-from-y-2 duration-700 fill-mode-both">
            New Arrival
          </span>

          <h1 className="text-furniro-gold font-heading text-2xl sm:text-4xl md:text-[3.25rem] font-bold leading-tight sm:leading-snug md:leading-16 tracking-tight mb-3 md:mb-4 delay-200 animate-in fade-in slide-in-from-y-4 duration-700 fill-mode-both">
            Discover Our <br className="hidden sm:inline" /> New Collection
          </h1>

          <p className="text-foreground/90 text-xs sm:text-sm md:text-base font-medium leading-relaxed md:leading-6 mb-6 md:mb-8 max-w-full sm:max-w-128 md:max-w-136 delay-300 animate-in fade-in slide-in-from-y-4 duration-700 fill-mode-both">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>

          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider rounded-none px-8 py-4 sm:px-12 sm:py-5 md:py-6 md:px-16 cursor-pointer scale-100 hover:scale-[1.03] active:scale-98 transition-all duration-300 delay-400 animate-in fade-in slide-in-from-y-4 fill-mode-both">
            Buy Now
          </Button>
        </div>
      </div>
    </section>
  );
}
