import { siteConfig } from "@/config/site";
import { socialLinks } from "@/data/social";
import { getDictionary, type Locale } from "@/i18n/dictionaries";
import { urlForLocale } from "@/i18n/routing";

export function personSchema(locale: Locale) {
  const dict = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    jobTitle: dict.meta.ogTagline,
    description: dict.meta.description,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone.href.replace("tel:", ""),
    url: urlForLocale(siteConfig.url, locale),
    sameAs: socialLinks.map((link) => link.href),
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "Node.js",
      "Tailwind CSS",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Mining and Geology",
    },
  };
}
