import Image from "next/image";
import aboutImage from "@/assets/images/about-developer.png";
import {
  Badge,
  Parallax,
  Reveal,
  Section,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "@/components/ui";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";

export function About({ dict }: { dict: Dictionary }) {
  const t = dict.about;

  return (
    <Section
      id="about-me"
      label={t.label}
      scrim
      className="grid items-center gap-14 py-32 md:grid-cols-2"
    >
      <Parallax distance={80} className="min-w-0 justify-self-center">
        <Reveal variant="scale">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-full bg-color-main/20 blur-[100px]"
            />
            <Image
              src={aboutImage}
              alt=""
              width={460}
              height={460}
              sizes="(max-width: 768px) 80vw, 460px"
              className="h-auto w-full max-w-[420px] animate-up-down opacity-90"
            />
          </div>
        </Reveal>
      </Parallax>

      <Parallax distance={-40} className="min-w-0">
        <Reveal>
          <Badge>{t.badge}</Badge>
        </Reveal>

        <SectionHeading text={siteConfig.fullName} className="mt-6" />

        <Reveal delay={0.1} variant="blur">
          <p className="mt-6 text-lg text-white/60">{t.intro}</p>
        </Reveal>

        <Stagger className="mt-8 flex flex-col gap-4" gap={0.09}>
          {t.highlights.map(({ emoji, text }) => (
            <StaggerItem key={text} variant="tilt">
              <div className="glass flex items-start gap-4 rounded-2xl p-4 transition-colors duration-300 hover:border-color-main/30">
                <span aria-hidden="true" className="text-xl leading-none">
                  {emoji}
                </span>
                <p className="text-base text-white/70">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Parallax>
    </Section>
  );
}
