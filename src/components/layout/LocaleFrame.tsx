import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { personSchema } from "@/lib/structuredData";

interface LocaleFrameProps {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}

export function LocaleFrame({ locale, dict, children }: LocaleFrameProps) {
  return (
    <div lang={locale}>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-color-main focus:px-4 focus:py-2 focus:text-white"
      >
        {dict.common.skipToContent}
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema(locale)).replace(/</g, "\\u003c"),
        }}
      />

      {children}
    </div>
  );
}
