import { sanityClient } from "../client";
import type { Contributor } from "@/types/contributor";

const QUERY = /* groq */ `
  *[
    _type == "contributor" &&
    !(_id in path("drafts.**"))
  ]
  | order(category asc, order asc, name asc)
  {
    _id,
    name,
    location,
    category,
    anonymous,
    order
  }
`;

export async function fetchContributors(): Promise<Contributor[]> {
  return sanityClient.fetch<Contributor[]>(QUERY);
}
