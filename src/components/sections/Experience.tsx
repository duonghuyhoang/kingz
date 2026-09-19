import type { Dictionary } from "@/i18n/dictionaries";
import {
  Badge,
  Reveal,
  Section,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "@/components/ui";

interface ExperienceProps {
  dict: Dictionary;
}

export function Experience({ dict }: ExperienceProps) {
  const { badge, label, heading, lede, entries } = dict.experience;

  return (
    <Section
      id="experience"
      label={label}
      scrim
      className="flex flex-col items-center gap-6 py-32"
    >
      <Reveal>
        <Badge>{badge}</Badge>
      </Reveal>

      <SectionHeading text={heading} className="text-center" />

      <Reveal delay={0.1} variant="blur">
        <p className="max-w-xl text-center text-lg text-white/65">{lede}</p>
      </Reveal>

      <Stagger className="relative mt-12 w-full max-w-3xl" gap={0.12}>
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-[7px] top-2 w-px bg-gradient-to-b from-color-main/60 via-color-main/20 to-transparent sm:left-[9px]"
        />

        <ol className="flex flex-col gap-8">
          {entries.map(({ id, period, title, org, description, kind }) => (
            <StaggerItem key={id} variant="tilt">
              <li className="relative pl-10 sm:pl-14">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-color-main/50 bg-background sm:h-5 sm:w-5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-color-main" />
                </span>

                <div className="glass rounded-2xl p-5 transition-colors duration-300 hover:border-color-main/30">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-color-main">
                      {period}
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs text-white/65">
                      {kind === "education" ? "🎓" : "💼"}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-semibold">{title}</h3>
                  <p className="text-sm text-white/60">{org}</p>
                  <p className="mt-3 text-base text-white/70">{description}</p>
                </div>
              </li>
            </StaggerItem>
          ))}
        </ol>
      </Stagger>
    </Section>
  );
}
