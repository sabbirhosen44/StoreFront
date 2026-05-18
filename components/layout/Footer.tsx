import { HELP_LINKS, NAV_LINKS } from "@/constants/navigation";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background pt-12 md:pt-20 pb-10 border-t border-border">
      <div className="container-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-border">
          <div className="flex flex-col gap-4 md:gap-7">
            <h2 className="text-2xl font-bold font-heading text-foreground tracking-tight">
              StoreFront
            </h2>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-64">
              400 University Drive Suite 200 Coral Gables,
              <br />
              FL 33134 USA
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-14">
            <span className="text-muted-foreground text-sm font-semibold tracking-wider">
              Links
            </span>

            <nav className="flex flex-col gap-4 md:gap-11">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-base font-medium transition-colors hover:text-furniro-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 md:gap-14">
            <span className="text-muted-foreground text-sm font-semibold tracking-wider">
              Help
            </span>
            <nav className="flex flex-col gap-4 md:gap-11">
              {HELP_LINKS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-base font-medium transition-colors hover:text-furniro-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 md:gap-14">
            <span className="text-muted-foreground text-sm font-semibold tracking-wider">
              Newsletter
            </span>
            <div className="flex items-center gap-3 w-full sm:max-w-xs md:max-w-none">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="bg-transparent text-foreground placeholder:text-muted-foreground text-xs md:text-sm font-medium pb-2 border-b border-foreground focus:outline-none w-full"
              />
              <span className="text-foreground text-xs md:text-sm font-bold pb-2 border-b border-foreground tracking-wider uppercase cursor-pointer hover:text-furniro-gold hover:border-furniro-gold transition-colors whitespace-nowrap">
                SUBSCRIBE
              </span>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <p className="text-foreground text-sm font-medium tracking-tight text-center sm:text-left">
            &copy; 2026 StoreFront. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
