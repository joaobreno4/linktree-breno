import { ArrowUpRight } from "lucide-react";
import type { ProfileLink } from "@/types/profile";

export function LinkButton({ title, url }: ProfileLink) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex items-center justify-between w-full
        px-5 py-4 rounded-xl
        bg-white dark:bg-zinc-800/60
        border border-zinc-200 dark:border-zinc-700/60
        text-zinc-800 dark:text-zinc-100
        text-sm font-medium
        shadow-xs
        transition-all duration-200 ease-out
        hover:-translate-y-0.5 hover:shadow-md
        hover:border-zinc-300 dark:hover:border-zinc-600
        hover:bg-zinc-50 dark:hover:bg-zinc-800
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-zinc-500 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-zinc-950
      "
    >
      <span>{title}</span>
      <ArrowUpRight
        className="
          size-4 shrink-0
          text-zinc-400 dark:text-zinc-500
          group-hover:text-zinc-600 dark:group-hover:text-zinc-300
          transition-colors duration-200
        "
      />
    </a>
  );
}
