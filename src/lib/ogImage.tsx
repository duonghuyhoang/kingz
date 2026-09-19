import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n/dictionaries";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOgImage(locale: Locale) {
  const dict = getDictionary(locale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#090e16",
        backgroundImage:
          "radial-gradient(900px circle at 15% 25%, rgba(123,74,226,0.45), transparent 60%), radial-gradient(700px circle at 90% 85%, rgba(56,214,238,0.28), transparent 60%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#b79bff",
        }}
      >
        {dict.meta.ogTagline}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 148,
          fontWeight: 800,
          letterSpacing: -4,
          lineHeight: 1,
          marginTop: 18,
        }}
      >
        {siteConfig.name}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 36,
          color: "rgba(255,255,255,0.62)",
          marginTop: 20,
        }}
      >
        {siteConfig.fullName}
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 48,
          gap: 14,
        }}
      >
        {["React", "Next.js", "TypeScript", "NestJS"].map((label) => (
          <div
            key={label}
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              border: "1px solid rgba(123,74,226,0.5)",
              background: "rgba(123,74,226,0.12)",
              fontSize: 26,
              color: "#d9caff",
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>,
    ogSize,
  );
}
