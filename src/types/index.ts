import type { ComponentType, SVGProps } from "react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavItem {
  id: string;
  labelKey: "home" | "about" | "skills" | "experience" | "contact";
}

export interface SocialLink {
  label: string;
  href: string;
  Icon: IconComponent;
}

export interface Skill {
  name: string;
  Icon: IconComponent;
}
