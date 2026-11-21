import { sanityClient } from "../client";
import type { TeamMember, AdvisoryBoardMember } from "@/types/people";

// ── Team Members ─────────────────────────────────────────────────────────────

const TEAM_QUERY = /* groq */ `
  *[
    _type == "teamMember" &&
    !(_id in path("drafts.**"))
  ]
  | order(order asc, name asc)
  {
    _id,
    name,
    position,
    affiliation,
    "photo": {
      "asset": photo.asset,
      "hotspot": photo.hotspot,
      "lqip": photo.asset->metadata.lqip
    },
    linkedin,
    email,
    order
  }
`;

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  return sanityClient.fetch<TeamMember[]>(TEAM_QUERY);
}

// ── Advisory Board Members ───────────────────────────────────────────────────

const ADVISORY_QUERY = /* groq */ `
  *[
    _type == "advisoryBoardMember" &&
    !(_id in path("drafts.**"))
  ]
  | order(isFeatured desc, order asc, name asc)
  {
    _id,
    name,
    affiliation,
    expertise,
    "photo": {
      "asset": photo.asset,
      "hotspot": photo.hotspot,
      "lqip": photo.asset->metadata.lqip
    },
    description,
    isFeatured,
    order
  }
`;

export async function fetchAdvisoryBoardMembers(): Promise<AdvisoryBoardMember[]> {
  return sanityClient.fetch<AdvisoryBoardMember[]>(ADVISORY_QUERY);
}
