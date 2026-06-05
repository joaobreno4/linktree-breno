import Image from "next/image";
import type { ProfileData } from "@/types/profile";

type AvatarProfileProps = Pick<ProfileData, "name" | "bio" | "avatarUrl">;

export function AvatarProfile({ name, bio, avatarUrl }: AvatarProfileProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div
        className="
          relative size-24 rounded-full overflow-hidden
          ring-2 ring-zinc-200 dark:ring-zinc-700
          bg-zinc-100 dark:bg-zinc-800
        "
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`Foto de ${name}`}
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        ) : (
          <div
            aria-hidden="true"
            className="
              size-full flex items-center justify-center
              text-3xl font-semibold
              text-zinc-500 dark:text-zinc-300
            "
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {name}
        </h1>
        {bio && (
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xs">
            {bio}
          </p>
        )}
      </div>
    </div>
  );
}
