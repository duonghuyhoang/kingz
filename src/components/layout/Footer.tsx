import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/ui";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="relative mt-20 border-t border-white/10 px-6 py-10 sm:px-12 lg:px-[135px]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-white/55">
          {dict.footer.copyright} {siteConfig.name} · 2023
        </p>
        <SocialLinks size={28} />
      </div>
    </footer>
  );
}
