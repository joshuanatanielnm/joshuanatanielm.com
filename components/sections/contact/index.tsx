import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { customMetadata } from "@/site.config";
import { socialLinks } from "@/app/(default)/links";
import { Reveal } from "@/components/motion/reveal";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand/10 via-card to-card px-6 py-14 sm:px-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s build something together
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            I&apos;m always happy to talk about frontend work, open-source, or a
            product you&apos;re trying to get off the ground.
          </p>

          <div className="mt-8">
            <Link
              href={customMetadata.emailUrl}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" weight="bold" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {socialLinks
              .filter((link) => !link.internal)
              .map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
                >
                  <link.Icon className="h-5 w-5" />
                </Link>
              ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
