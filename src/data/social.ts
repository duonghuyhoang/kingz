import type { SocialLink } from "@/types";
import { FacebookIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";

export const socialLinks: readonly SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hoang-duong-huy-76138828b/",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/duonghuyhoang",
    Icon: GitHubIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/duonghuyhoang17",
    Icon: FacebookIcon,
  },
] as const;
