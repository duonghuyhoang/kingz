"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CopyIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label: string;
  copyText: string;
  copiedText: string;
  className?: string;
}

const RESET_DELAY_MS = 2000;

export function CopyButton({
  value,
  label,
  copyText,
  copiedText,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), RESET_DELAY_MS);
    } catch {
      setCopied(false);
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`${copyText} ${label}: ${value}`}
      className={cn(
        "inline-flex items-center gap-2 rounded-md p-1 text-color-main outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-color-main",
        className,
      )}
    >
      <CopyIcon width={22} height={22} />
      <span aria-live="polite" className="text-xs">
        {copied ? copiedText : ""}
      </span>
    </button>
  );
}
