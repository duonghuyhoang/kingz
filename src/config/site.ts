import type { NavItem } from "@/types";

export const siteConfig = {
  name: "KINGZ",
  fullName: "Duong Huy Hoang",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kingz.io.vn").replace(
    /\/+$/,
    "",
  ),
  email: "duonghuyhoang2003@gmail.com",
  phone: {
    display: "0362 804 366",
    href: "tel:+84362804366",
    raw: "0362804366",
  },
} as const;

export const navItems: readonly NavItem[] = [
  { id: "home", labelKey: "home" },
  { id: "about-me", labelKey: "about" },
  { id: "skills", labelKey: "skills" },
  { id: "experience", labelKey: "experience" },
  { id: "contact", labelKey: "contact" },
] as const;

export const resumeUrl = "/cv-duong-huy-hoang.pdf";
