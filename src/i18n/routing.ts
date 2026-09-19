import { defaultLocale, type Locale } from "./dictionaries";

export function pathForLocale(locale: Locale) {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

export function urlForLocale(siteUrl: string, locale: Locale) {
  return locale === defaultLocale ? siteUrl : `${siteUrl}/${locale}`;
}
