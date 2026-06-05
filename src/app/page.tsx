import { getProfileData } from "@/lib/cms";
import { AvatarProfile } from "@/components/avatar-profile";
import { LinkButton } from "@/components/link-button";
import { SocialLinks } from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function Home() {
  const profile = await getProfileData();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <AvatarProfile
          name={profile.name}
          bio={profile.bio}
          avatarUrl={profile.avatarUrl}
        />

        <SocialLinks socialLinks={profile.socialLinks} />

        {profile.links.length > 0 && (
          <nav className="w-full flex flex-col gap-3" aria-label="Links do perfil">
            {profile.links.map((link) => (
              <LinkButton key={link.url} title={link.title} url={link.url} />
            ))}
          </nav>
        )}
      </div>
    </main>
  );
}
