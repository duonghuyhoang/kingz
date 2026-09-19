import type { Metadata } from "next";
import { Landing } from "@/components/layout/Landing";
import { LocaleFrame } from "@/components/layout/LocaleFrame";
import { getDictionary } from "@/i18n/dictionaries";
import { metadataForLocale } from "@/lib/metadata";

const locale = "en" as const;

export const metadata: Metadata = metadataForLocale(locale);

export default function HomePage() {
  const dict = getDictionary(locale);

  return (
    <LocaleFrame locale={locale} dict={dict}>
      <Landing locale={locale} dict={dict} />
    </LocaleFrame>
  );
}
