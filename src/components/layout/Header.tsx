"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logo from "@/assets/images/logo.png";
import { navItems, siteConfig } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";
import { LocaleSwitch } from "./LocaleSwitch";

const NAV_IDS = navItems.map((item) => item.id);

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

export function Header({ dict, locale }: HeaderProps) {
  const activeId = useActiveSection(NAV_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 px-6 pt-4 sm:px-12 lg:px-[135px]">
      <nav
        aria-label={dict.nav.label}
        className="glass-blur mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-full px-5 text-white"
      >
        <Link
          href="#home"
          aria-label={`${siteConfig.name} — ${dict.nav.backToTop}`}
          className="flex-shrink-0 transition-transform duration-300 hover:scale-110"
        >
          <Image src={logo} alt="" width={36} height={36} priority />
        </Link>

        <ul className="hidden items-center gap-1 text-sm font-medium md:flex">
          {navItems.map(({ id, labelKey }) => {
            const isActive = activeId === id;
            return (
              <li key={id} className="relative">
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-3.5 py-2 transition-colors duration-300",
                    isActive ? "text-white" : "text-white/55 hover:text-white",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full border border-color-main/30 bg-color-main/15"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  {dict.nav[labelKey]}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LocaleSwitch current={locale} />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
          >
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-transform duration-300",
                menuOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-opacity duration-300",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-transform duration-300",
                menuOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="glass-blur mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl p-3 text-base font-medium md:hidden"
          >
            {navItems.map(({ id, labelKey }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeId === id ? "true" : undefined}
                  className={cn(
                    "block rounded-2xl px-4 py-3 transition-colors duration-300",
                    activeId === id
                      ? "bg-color-main/15 text-color-main"
                      : "text-white/70 hover:text-white",
                  )}
                >
                  {dict.nav[labelKey]}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
