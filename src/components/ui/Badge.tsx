import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "glass inline-flex h-11 flex-shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold uppercase tracking-[0.14em] text-color-main",
        className,
      )}
    >
      {children}
    </span>
  );
}
