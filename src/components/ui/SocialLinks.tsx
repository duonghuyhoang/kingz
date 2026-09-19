import { socialLinks } from "@/data/social";
import { cn } from "@/lib/utils";
import { ExternalLink } from "./ExternalLink";

interface SocialLinksProps {
  className?: string;
  size?: number;
}

export function SocialLinks({ className, size = 32 }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {socialLinks.map(({ label, href, Icon }) => (
        <li key={label}>
          <ExternalLink
            href={href}
            aria-label={label}
            className="inline-block text-white hover:text-color-main"
          >
            <Icon width={size} height={size} />
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
