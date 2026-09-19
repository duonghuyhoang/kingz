import Image from "next/image";
import profileImage from "@/assets/images/profile.png";
import { ChatIcon, DownloadIcon } from "@/components/icons";
import {
  Badge,
  MagneticLink,
  Parallax,
  Reveal,
  Section,
  SectionHeading,
  SocialLinks,
} from "@/components/ui";
import { resumeUrl, siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";

export function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;

  return (
    <Section
      id="home"
      label={dict.nav.home}
      className="relative flex min-h-screen items-center py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] bg-[radial-gradient(95%_60%_at_50%_38%,rgb(var(--color-background-rgb)/0.92),rgb(var(--color-background-rgb)/0.55)_55%,transparent_85%)] lg:bg-[radial-gradient(58%_65%_at_20%_50%,rgb(var(--color-background-rgb)/0.85),transparent_74%)]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <Badge>{t.badge}</Badge>
          </Reveal>

          <SectionHeading
            as="h1"
            text={siteConfig.name}
            className="text-6xl leading-[0.95] sm:text-7xl lg:text-8xl"
          />

          <Reveal delay={0.15} variant="blur">
            <p className="max-w-md text-lg text-white/60 sm:text-xl">
              <span className="text-gradient-brand font-semibold">
                {t.role}
              </span>{" "}
              {t.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticLink
                href={`mailto:${siteConfig.email}`}
                className="h-12 bg-color-main px-6 text-sm font-semibold text-white shadow-glow hover:bg-color-main/90"
              >
                <ChatIcon width={20} height={20} />
                {t.letsTalk}
              </MagneticLink>

              <MagneticLink
                href={resumeUrl}
                download
                className="glass h-12 px-6 text-sm font-semibold text-white/80 hover:text-white"
              >
                {t.downloadCv}
                <DownloadIcon width={16} height={16} />
              </MagneticLink>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <SocialLinks />
          </Reveal>

          <Reveal delay={0.45}>
            <p className="hidden text-xs uppercase tracking-[0.2em] text-white/25 lg:block">
              {t.dragHint}
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={0.2}
          variant="scale"
          className="justify-self-center lg:justify-self-end"
        >
          <Parallax distance={40}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 scale-90 rounded-full bg-gradient-to-br from-color-main/40 to-accent/20 blur-3xl"
              />
              <Image
                src={profileImage}
                alt={t.portraitAlt}
                width={400}
                height={450}
                priority
                sizes="(max-width: 1024px) 70vw, 400px"
                className="h-auto w-full max-w-[340px] animate-up-down drop-shadow-2xl [mask-image:linear-gradient(to_bottom,#000_72%,transparent_98%)] lg:max-w-[400px]"
              />
            </div>
          </Parallax>
        </Reveal>
      </div>
    </Section>
  );
}
