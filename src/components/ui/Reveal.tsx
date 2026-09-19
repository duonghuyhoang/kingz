"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export type RevealVariant = "up" | "blur" | "scale" | "tilt";

const VARIANTS: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  blur: {
    hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.93 },
    visible: { opacity: 1, scale: 1 },
  },
  tilt: {
    hidden: { opacity: 0, y: 48, rotateX: 14 },
    visible: { opacity: 1, y: 0, rotateX: 0 },
  },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  duration?: number;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  variant = "up",
  duration = 0.75,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={VARIANTS[variant]}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, ease: EASE, delay }}
      style={variant === "tilt" ? { transformPerspective: 1200 } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  gap?: number;
}

export function Stagger({ children, className, gap = 0.08 }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: gap } } }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  const base = VARIANTS[variant];

  return (
    <motion.div
      className={className}
      variants={{
        hidden: base.hidden ?? {},
        visible: {
          ...(base.visible ?? {}),
          transition: { duration: 0.7, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
