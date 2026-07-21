import { getAbout } from "@/server/keystatic";
import { Reveal } from "@/components/motion/reveal";
import { HeroBackdrop } from "@/components/three/hero-canvas";
import { HeroIntro } from "./hero-intro";
import { NowPanel } from "./now-panel";

export async function Hero() {
  const { professionalSummary } = await getAbout();
  const isOpenToWork = process.env.NEXT_PUBLIC_IS_OPEN_TO_WORK === "true";

  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />

      <div className="relative mx-auto grid max-w-5xl gap-10 px-4 pb-4 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <HeroIntro
            professionalSummary={professionalSummary}
            isOpenToWork={isOpenToWork}
          />
        </div>

        <div className="flex items-center lg:col-span-5">
          <Reveal delay={0.15} className="w-full">
            <NowPanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
