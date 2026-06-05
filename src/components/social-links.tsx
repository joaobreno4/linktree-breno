import {
  Code2,
  Briefcase,
  Camera,
  AtSign,
  PlayCircle,
  Globe,
  type LucideIcon,
} from "lucide-react";
import type { SocialLink, SocialPlatform } from "@/types/profile";

// lucide-react removeu ícones de marcas — mapeamos para equivalentes semânticos
const PLATFORM_META: Record<SocialPlatform, { icon: LucideIcon; label: string }> = {
  github: { icon: Code2, label: "GitHub" },
  linkedin: { icon: Briefcase, label: "LinkedIn" },
  instagram: { icon: Camera, label: "Instagram" },
  twitter: { icon: AtSign, label: "Twitter / X" },
  youtube: { icon: PlayCircle, label: "YouTube" },
  website: { icon: Globe, label: "Website" },
};

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  if (!socialLinks.length) return null;

  return (
    <div className="flex items-center gap-1" role="list" aria-label="Redes sociais">
      {socialLinks.map(({ platform, url }) => {
        const { icon: Icon, label } = PLATFORM_META[platform];

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label={label}
            title={label}
            className="
              inline-flex items-center justify-center size-9 rounded-full
              text-zinc-500 dark:text-zinc-400
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              hover:text-zinc-900 dark:hover:text-zinc-100
              transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-zinc-500 focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-zinc-950
            "
          >
            <Icon className="size-5" />
          </a>
        );
      })}
    </div>
  );
}
