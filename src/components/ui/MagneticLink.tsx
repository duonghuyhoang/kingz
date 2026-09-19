"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  download?: boolean;
  external?: boolean;
  "aria-label"?: string;
}

export function MagneticLink({
  href,
  children,
  className,
  strength = 12,
  download,
  external,
  ...props
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();

  const springConfig = { stiffness: 250, damping: 18, mass: 0.4 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;

    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);
    x.set((offsetX / (bounds.width / 2)) * strength);
    y.set((offsetY / (bounds.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{ x, y }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-color-main focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}
