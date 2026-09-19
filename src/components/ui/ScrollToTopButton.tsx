"use client";

import ScrollToTop from "react-scroll-to-top";

export function ScrollToTopButton({ label }: { label: string }) {
  return <ScrollToTop smooth aria-label={label} />;
}
