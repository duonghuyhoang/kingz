"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { DragState } from "./Scene";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

function SceneFallback() {
  return (
    <div
      className="absolute inset-0 flex items-start justify-center pt-[18vh]"
      aria-hidden="true"
    >
      <div className="h-64 w-64 rounded-full bg-gradient-to-br from-color-main/60 to-accent/20 blur-3xl" />
    </div>
  );
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

const INTERACTIVE =
  "a, button, input, textarea, select, [role='button'], [contenteditable]";

const DRAG_ZONE_ID = "home";

function insideDragZone(event: PointerEvent) {
  const zone = document.getElementById(DRAG_ZONE_ID);
  if (!zone) return false;

  const { left, right, top, bottom } = zone.getBoundingClientRect();
  return (
    event.clientX >= left &&
    event.clientX <= right &&
    event.clientY >= top &&
    event.clientY <= bottom
  );
}

const DRAG_SENSITIVITY = 0.005;

export function SceneBackground() {
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState<"idle" | "ready" | "unsupported">("idle");

  const scrollRef = useRef(0);
  const dragRef = useRef<DragState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    active: false,
  });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.52]);

  useEffect(() => {
    if (!hasWebGL()) {
      setState("unsupported");
      return;
    }
    setState("ready");
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      scrollRef.current = value;
    });
    return unsubscribe;
  }, [scrollYProgress]);

  useEffect(() => {
    if (reduceMotion) return;

    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if ((event.target as Element | null)?.closest(INTERACTIVE)) return;
      if (!insideDragZone(event)) return;

      event.preventDefault();
      window.getSelection()?.removeAllRanges();

      dragRef.current.active = true;
      dragRef.current.vx = 0;
      dragRef.current.vy = 0;
      lastX = event.clientX;
      lastY = event.clientY;
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current.active) return;

      const deltaX = (event.clientX - lastX) * DRAG_SENSITIVITY;
      const deltaY = (event.clientY - lastY) * DRAG_SENSITIVITY;
      lastX = event.clientX;
      lastY = event.clientY;

      dragRef.current.x += deltaY;
      dragRef.current.y += deltaX;
      dragRef.current.vx = deltaY;
      dragRef.current.vy = deltaX;
    };

    const endDrag = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: false });
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    window.addEventListener("blur", endDrag);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("blur", endDrag);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [reduceMotion]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity: reduceMotion ? 0.5 : opacity }}
      className="pointer-events-none fixed inset-0 -z-10"
    >
      {state === "ready" ? (
        <Scene
          still={Boolean(reduceMotion)}
          scroll={scrollRef}
          drag={dragRef}
        />
      ) : (
        <SceneFallback />
      )}
    </motion.div>
  );
}
