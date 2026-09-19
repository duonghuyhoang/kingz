import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ExternalLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string;
  children: ReactNode;
}

export function ExternalLink({
  href,
  children,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "rounded-sm outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-color-main focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
