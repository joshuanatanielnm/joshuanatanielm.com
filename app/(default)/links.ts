import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FileIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { customMetadata } from "@/site.config";

export const links = [
  { href: customMetadata.resumeUrl, Icon: FileIcon, label: "Resume" },
  { href: customMetadata.twitterUrl, Icon: TwitterLogoIcon, label: "Twitter" },
  { href: customMetadata.githubUrl, Icon: GitHubLogoIcon, label: "Github" },
  {
    href: customMetadata.linkedInUrl,
    Icon: LinkedInLogoIcon,
    label: "Linkedin",
  },
  {
    href: customMetadata.emailUrl,
    Icon: EnvelopeClosedIcon,
    label: "Email",
  },
  {
    href: customMetadata.calUrl,
    Icon: CalendarIcon,
    label: "Schedule",
  },
];

export const homeNavLinks = [
  { href: "#about", label: "About" },
  { href: "#experiences", label: "Experiences" },
  { href: "#projects", label: "Projects" },
];
