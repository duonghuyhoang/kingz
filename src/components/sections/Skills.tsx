import { backendSkills, frontendSkills } from "@/data/skills";
import { Badge, Reveal, Section, SectionHeading } from "@/components/ui";
import type { Dictionary } from "@/i18n/dictionaries";
import { SkillMarquee } from "./SkillMarquee";

export function Skills({ dict }: { dict: Dictionary }) {
  const t = dict.skills;

  const groups = [
    {
      group: "frontend",
      title: t.frontend,
      skills: frontendSkills,
      reverse: false,
    },
    {
      group: "backend",
      title: t.backend,
      skills: backendSkills,
      reverse: true,
    },
  ] as const;

  return (
    <Section
      id="skills"
      label={t.label}
      scrim
      className="flex flex-col items-center gap-6 py-32"
    >
      <Reveal>
        <Badge>{t.badge}</Badge>
      </Reveal>

      <SectionHeading text={t.heading} className="text-center" />

      <Reveal delay={0.1} variant="blur">
        <p className="max-w-xl text-center text-lg text-white/65">{t.lede}</p>
      </Reveal>

      <div className="mt-10 w-full max-w-5xl space-y-12">
        {groups.map(({ group, title, skills, reverse }) => (
          <div key={group}>
            <Reveal>
              <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
                {title}
              </p>
            </Reveal>
            <SkillMarquee group={group} reverse={reverse} />
            <p className="sr-only">
              {title}: {skills.map((skill) => skill.name).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
