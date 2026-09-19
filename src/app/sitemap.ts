import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/dictionaries";
import { urlForLocale } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: urlForLocale(siteConfig.url, locale),
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((code) => [code, urlForLocale(siteConfig.url, code)]),
      ),
    },
  }));
}
