import { NavLink } from "@/components/navigation/nav-link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getAbout } from "@/server/keystatic";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/utils/ui";

function teaserParagraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export async function AboutSection() {
  const about = await getAbout();
  const paragraphs = teaserParagraphs(
    about.homepageTeaser ?? about.professionalSummary
  );

  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            title="A bit about me"
            action={
              <NavLink
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand/80"
              >
                More about me
                <span className="grid h-7 w-7 place-items-center rounded-[4px] bg-brand/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" weight="bold" />
                </span>
              </NavLink>
            }
          />
        </div>
        <div className="lg:col-span-8">
          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={cn(
                  "text-[15px] leading-relaxed text-muted-foreground",
                  index === 0 && "text-base text-foreground/90"
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <NavLink
            href="/about"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand/80 lg:hidden"
          >
            Read the full story
            <ArrowRight className="h-4 w-4" weight="bold" />
          </NavLink>
        </div>
      </Reveal>
    </section>
  );
}
