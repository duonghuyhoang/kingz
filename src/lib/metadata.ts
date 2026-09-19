import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getDictionary, locales, type Locale } from "@/i18n/dictionaries";
import { urlForLocale } from "@/i18n/routing";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  vi: "vi_VN",
};

export function metadataForLocale(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const title = `${siteConfig.name} · ${dict.meta.ogTagline}`;
  const url = urlForLocale(siteConfig.url, locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s · ${siteConfig.name}`,
    },
    description: dict.meta.description,
    authors: [{ name: siteConfig.fullName }],
    creator: siteConfig.fullName,
    keywords: [
      "portfolio",
      "full-stack developer",
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      siteConfig.fullName,
    ],
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((code) => [code, urlForLocale(siteConfig.url, code)]),
      ),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url,
      siteName: siteConfig.name,
      title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}
