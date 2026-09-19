"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  text,
  className,
  as = "h2",
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  const classes = cn(
    "text-gradient text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl",
    className,
  );

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={classes}>{text}</Tag>;
  }

  const words = text.split(" ");
  const Heading = as === "h1" ? motion.h1 : motion.h2;

  return (
    <Heading
      className={classes}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className={cn(
              "inline-block",
              index < words.length - 1 && "pr-[0.25em]",
            )}
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: 0,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Heading>
  );
}
