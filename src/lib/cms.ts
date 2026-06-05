import * as prismic from "@prismicio/client";
import { unstable_cache } from "next/cache";
import { client } from "./prismic";
import type { ProfileData, SocialPlatform } from "@/types/profile";

function resolveText(field: unknown): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (Array.isArray(field)) return prismic.asText(field as prismic.RichTextField) || "";
  return "";
}

async function fetchProfileData(): Promise<ProfileData> {
  let document: Awaited<ReturnType<typeof client.getSingle>>;

  try {
    document = await client.getSingle("profile");
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      return {
        name: "João Breno",
        bio: "DevOps Intern",
        avatarUrl: "https://media.licdn.com/dms/image/v2/D5603AQHLeRbTV6SVdQ/profile-displayphoto-shrink_200_200/B56ZYHTb_jHoAg-/0/1743879259234?e=1782345600&v=beta&t=oS9nJhqBPr5Qx21iI2TynVJ0Ym_Bxv7mnHDLzSeX0lY",
        links: [
          { title: "GitHub", url: "https://github.com/joaobreno4" },
          { title: "LinkedIn", url: "https://www.linkedin.com/in/joaobreno4/" },
        ],
        socialLinks: [
          { platform: "github", url: "https://github.com/joaobreno4" },
          { platform: "linkedin", url: "https://www.linkedin.com/in/joaobreno4/" },
        ],
      };
    }
    throw error;
  }

  const data = document.data;

  const links = Array.isArray(data.links)
    ? (data.links as Record<string, unknown>[])
        .filter(
          (item) =>
            typeof item.title === "string" &&
            item.title.trim() !== "" &&
            prismic.isFilled.link(item.url as prismic.LinkField)
        )
        .map((item) => ({
          title: item.title as string,
          url: prismic.asLink(item.url as prismic.LinkField) ?? "#",
        }))
    : [];

  const socialLinks = Array.isArray(data.social_links)
    ? (data.social_links as Record<string, unknown>[])
        .filter(
          (item) =>
            prismic.isFilled.select(item.platform as prismic.SelectField) &&
            prismic.isFilled.link(item.url as prismic.LinkField)
        )
        .map((item) => ({
          platform: item.platform as SocialPlatform,
          url: prismic.asLink(item.url as prismic.LinkField) ?? "#",
        }))
    : [];

  return {
    name: resolveText(data.name) || "Profile",
    bio: resolveText(data.bio),
    avatarUrl: prismic.isFilled.image(data.avatar as prismic.ImageField)
      ? ((data.avatar as prismic.ImageField).url ?? null)
      : null,
    links,
    socialLinks,
  };
}

// Cache de 5 minutos com tag para revalidação sob demanda via revalidateTag("profile")
export const getProfileData = unstable_cache(fetchProfileData, ["profile-data"], {
  revalidate: 300,
  tags: ["profile"],
});
