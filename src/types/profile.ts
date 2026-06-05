export type SocialPlatform =
  | "github"
  | "linkedin"
  | "instagram"
  | "twitter"
  | "youtube"
  | "website";

export interface ProfileLink {
  title: string;
  url: string;
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface ProfileData {
  name: string;
  bio: string;
  avatarUrl: string | null;
  links: ProfileLink[];
  socialLinks: SocialLink[];
}
