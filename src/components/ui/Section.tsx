import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  label?: string;
  scrim?: boolean;
}

export function Section({
  id,
  children,
  className,
  label,
  scrim = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label ?? id}
      className={cn(
        "relative scroll-mt-28 px-6 sm:px-12 lg:px-[135px]",
        className,
      )}
    >
      {scrim && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-[5] bg-[radial-gradient(58%_42%_at_50%_42%,rgb(var(--color-background-rgb)/0.72),rgb(var(--color-background-rgb)/0.28)_58%,transparent_82%)]"
        />
      )}
      {children}
    </section>
  );
}
