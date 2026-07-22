import {
  CalendarBlank,
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { customMetadata } from "@/site.config";

export type NavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  href: string;
  label: string;
  Icon: Icon;
  internal?: boolean;
};

export const navLinks: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/books", label: "Reading" },
  { href: "/games", label: "Games" },
  { href: "/photos", label: "Photos" },
  { href: "/setup", label: "Setup" },
  { href: "/resume", label: "Résumé" },
];

export const socialLinks: SocialLink[] = [
  {
    href: customMetadata.resumeUrl,
    Icon: FileText,
    label: "Résumé",
    internal: true,
  },
  { href: customMetadata.githubUrl, Icon: GithubLogo, label: "GitHub" },
  { href: customMetadata.twitterUrl, Icon: XLogo, label: "X" },
  {
    href: customMetadata.linkedInUrl,
    Icon: LinkedinLogo,
    label: "LinkedIn",
  },
  { href: customMetadata.emailUrl, Icon: EnvelopeSimple, label: "Email" },
  { href: customMetadata.calUrl, Icon: CalendarBlank, label: "Schedule" },
];
