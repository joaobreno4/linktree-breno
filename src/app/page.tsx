import { getProfileData } from "@/lib/cms";
import { AvatarProfile } from "@/components/avatar-profile";
import { LinkButton } from "@/components/link-button";
import { SocialLinks } from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function Home() {
  const profile = await getProfileData();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
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
    </div>
  );
}
