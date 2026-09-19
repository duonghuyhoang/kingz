"use client";

import { useRef } from "react";
import Marquee from "react-fast-marquee";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { backendSkills, frontendSkills } from "@/data/skills";

const GROUPS = {
  frontend: frontendSkills,
  backend: backendSkills,
} as const;

interface SkillMarqueeProps {
  group: keyof typeof GROUPS;
  reverse?: boolean;
}

export function SkillMarquee({ group, reverse = false }: SkillMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [0, 0, 0] : [18, 0, -18],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.25, 1, 1, 0.25],
  );

  const tiles = GROUPS[group].map(({ name, Icon }) => (
    <motion.div
      key={name}
      whileHover={reduceMotion ? undefined : { y: -8, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className="glass group mx-3 flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 hover:border-color-main/50 hover:shadow-glow-sm"
    >
      <Icon className="h-12 w-12 text-color-main/70 transition-colors duration-300 group-hover:text-color-main" />
    </motion.div>
  ));

  if (reduceMotion) {
    return (
      <div aria-hidden="true" className="flex flex-wrap justify-center gap-y-4">
        {tiles}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{ rotateX, opacity, transformPerspective: 1000 }}
      className="[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <Marquee
        direction={reverse ? "right" : "left"}
        pauseOnHover
        gradient={false}
        speed={40}
      >
        <div className="flex py-4">{tiles}</div>
      </Marquee>
    </motion.div>
  );
}
