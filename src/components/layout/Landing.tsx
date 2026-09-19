import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SceneBackground } from "@/components/three/SceneBackground";
import {
  About,
  Contact,
  Experience,
  Hero,
  Skills,
} from "@/components/sections";
import { Aurora, ScrollProgress, ScrollToTopButton } from "@/components/ui";
import type { Dictionary, Locale } from "@/i18n/dictionaries";

interface LandingProps {
  locale: Locale;
  dict: Dictionary;
}

export function Landing({ locale, dict }: LandingProps) {
  return (
    <>
      <Aurora />
      <SceneBackground />
      <ScrollProgress />
      <Header dict={dict} locale={locale} />
      <main id="content" className="relative flex flex-col">
        <Hero dict={dict} />
        <About dict={dict} />
        <Skills dict={dict} />
        <Experience dict={dict} />
        <Contact dict={dict} />
        <ScrollToTopButton label={dict.common.scrollToTop} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
