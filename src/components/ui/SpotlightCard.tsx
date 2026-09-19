"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

const MAX_TILT_DEG = 6;

export function SpotlightCard({
  children,
  className,
  tilt = true,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, rgb(var(--color-main-rgb) / 0.18), transparent 70%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    mouseX.set(x);
    mouseY.set(y);

    if (tilt && !reduceMotion) {
      rotateY.set(((x / bounds.width) * 2 - 1) * MAX_TILT_DEG);
      rotateX.set(-((y / bounds.height) * 2 - 1) * MAX_TILT_DEG);
    }
  };

  const handlePointerLeave = () => {
    mouseX.set(-200);
    mouseY.set(-200);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "glass group relative overflow-hidden rounded-3xl transition-colors duration-300 hover:border-color-main/40",
        className,
      )}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
