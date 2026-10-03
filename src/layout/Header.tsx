import { useEffect, useState } from "react";

import { CalendarDays, Menu, X } from "lucide-react";

import { logo } from "../assets";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#rooms", label: "Rooms" },
  { href: "#dining", label: "Dining" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const merged = scrolled && !mobileOpen;

  // Update header appearance while scrolling.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Detect the section currently visible on screen.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  // Header surface.
  const surfaceClass = merged
    ? "border-transparent bg-bg-dark/10 backdrop-blur-sm"
    : mobileOpen
      ? "border-white/40 bg-bg/95 shadow-lg shadow-bg-dark/5 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-bg/60"
      : "border-white/20 bg-bg/90 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-bg/25";

  const navLinkClass = `
    relative rounded-lg px-3 py-2 text-sm font-medium
    transition-colors duration-300
    ${
      merged
        ? "text-white/80 hover:bg-white/10 hover:text-white"
        : "text-text/80 hover:bg-white/40 hover:text-primary"
    }
  `;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${surfaceClass}`}
    >
      {/* Decorative gold accent */}
      <div className="h-0.5 bg-linear-to-r from-transparent via-gold to-transparent" />

      {/* Main navigation bar */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "h-16" : "h-18"
        }`}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={() => {
            setMobileOpen(false);
            setActiveSection("home");
          }}
          className="group flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:gap-3"
          aria-label="Khwapa Chhen home"
        >
          <img
            src={logo}
            alt=""
            className="size-13 object-contain transition-transform duration-300 group-hover:scale-105 sm:size-15 lg:size-15"
          />

          <div className="flex flex-col items-center">
            {/* Brand name */}
            <span
              className={`font-heading text-[15px] font-bold leading-none tracking-[0.04em] transition-colors duration-300 sm:text-base lg:text-lg ${
                merged ? "text-white" : "text-primary"
              }`}
            >
              Khwapa Chhen
            </span>

            {/* Heritage divider */}
            <div className="my-1 flex items-center justify-center gap-1.5">
              <span className="h-px w-10 bg-gold/70 sm:w-12" />
              <span className="size-1.5 rotate-45 bg-gold" />
              <span className="h-px w-10 bg-gold/70 sm:w-12" />
            </div>

            {/* Subtitle */}
            <span
              className={`font-body text-[7px] font-medium uppercase leading-none tracking-[0.16em] transition-colors duration-300 sm:text-[8px] ${
                merged ? "text-white/70" : "text-text-muted"
              }`}
            >
              Guest House & Restaurant
            </span>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(item.href.slice(1))}
                className={`${navLinkClass} ${
                  isActive ? "text-gold hover:text-gold" : ""
                }`}
              >
                {item.label}

                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-0.5 origin-center rounded-full bg-gold transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="https://www.booking.com/hotel/np/khwapa-chhen-bhaktapur.en-gb.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md"
          >
            <CalendarDays
              size={17}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            Book a Room
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((previous) => !previous)}
          className={`flex size-10 items-center justify-center rounded-lg transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden ${
            merged
              ? "text-white hover:bg-white/10"
              : "text-text hover:bg-white/40 hover:text-primary"
          }`}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
          mobileOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 border-t border-white/40 px-4 py-4 sm:px-6"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.href.slice(1));
                    setMobileOpen(false);
                  }}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-gold/10 text-gold"
                      : "text-text/80 hover:bg-white/40 hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Mobile actions */}
            <div className="mt-3 grid grid-cols-1 gap-2 border-t border-white/40 pt-4">
              <a
                href="https://www.booking.com/hotel/np/khwapa-chhen-bhaktapur.en-gb.html"
                target="_blank"
                onClick={() => {
                  setActiveSection("rooms");
                  setMobileOpen(false);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                <CalendarDays size={17} />
                Book Now
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
