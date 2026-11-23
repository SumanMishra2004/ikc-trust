import { sanityClient } from "../client";
import type { Collaborator } from "@/types/collaborator";

const QUERY = /* groq */ `
  *[
    _type == "collaborator" &&
    !(_id in path("drafts.**")) &&
    defined(date)
  ]
  | order(date desc, _id desc)
  {
    _id,
    title,
    date,
    "image": {
      "asset": image.asset,
      "hotspot": image.hotspot,
      "lqip": image.asset->metadata.lqip,
      "dimensions": image.asset->metadata.dimensions
    },
    order
  }
`;

export async function fetchCollaborators(): Promise<Collaborator[]> {
  return sanityClient.fetch<Collaborator[]>(QUERY);
}
