import Link from "next/link";
import { locales, localeNames, type Locale } from "@/i18n/dictionaries";
import { pathForLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LocaleSwitchProps {
  current: Locale;
  className?: string;
}

export function LocaleSwitch({ current, className }: LocaleSwitchProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-xs font-semibold",
        className,
      )}
    >
      {locales.map((locale) => {
        const isCurrent = locale === current;
        return (
          <Link
            key={locale}
            href={pathForLocale(locale)}
            hrefLang={locale}
            aria-label={localeNames[locale]}
            aria-current={isCurrent ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase transition-colors duration-200",
              isCurrent
                ? "bg-color-main/20 text-color-main"
                : "text-white/45 hover:text-white",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
