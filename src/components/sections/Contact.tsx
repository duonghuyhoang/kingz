import { ChatIcon, MailIcon, PhoneIcon } from "@/components/icons";
import {
  Badge,
  CopyButton,
  MagneticLink,
  Reveal,
  Section,
  SectionHeading,
  SocialLinks,
} from "@/components/ui";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";

export function Contact({ dict }: { dict: Dictionary }) {
  const t = dict.contact;

  const channels = [
    {
      label: t.email,
      Icon: MailIcon,
      href: `mailto:${siteConfig.email}`,
      display: siteConfig.email,
      copyValue: siteConfig.email,
      copyLabel: t.emailLabel,
    },
    {
      label: t.phone,
      Icon: PhoneIcon,
      href: siteConfig.phone.href,
      display: siteConfig.phone.display,
      copyValue: siteConfig.phone.raw,
      copyLabel: t.phoneLabel,
    },
  ] as const;

  return (
    <Section
      id="contact"
      label={t.label}
      scrim
      className="flex flex-col items-center gap-6 py-32"
    >
      <Reveal>
        <Badge>{t.badge}</Badge>
      </Reveal>

      <SectionHeading text={t.heading} className="text-center" />

      <Reveal delay={0.1} variant="blur">
        <p className="max-w-lg text-center text-lg text-white/65">{t.lede}</p>
      </Reveal>

      <Reveal delay={0.2} variant="scale" className="w-full max-w-3xl">
        <div className="glass relative mt-8 overflow-hidden rounded-3xl p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-color-main/20 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-8">
            <MagneticLink
              href={`mailto:${siteConfig.email}`}
              className="h-14 bg-color-main px-8 text-base font-semibold text-white shadow-glow hover:bg-color-main/90"
            >
              <ChatIcon width={22} height={22} />
              {t.sendEmail}
            </MagneticLink>

            <ul className="flex w-full max-w-md flex-col gap-3">
              {channels.map(
                ({ label, Icon, href, display, copyValue, copyLabel }) => (
                  <li
                    key={label}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3"
                  >
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/55">
                      <Icon width={20} height={20} />
                      {label}
                    </span>
                    <span className="flex items-center gap-1">
                      <a
                        href={href}
                        className="text-base font-medium text-white transition-colors hover:text-color-main"
                      >
                        {display}
                      </a>
                      <CopyButton
                        value={copyValue}
                        label={copyLabel}
                        copyText={dict.common.copy}
                        copiedText={dict.common.copied}
                      />
                    </span>
                  </li>
                ),
              )}
            </ul>

            <div className="h-px w-24 bg-white/10" />

            <SocialLinks />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
