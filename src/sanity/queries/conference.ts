import { sanityClient } from "../client";
import type { ConferenceEvent, ConferenceEventsResult } from "@/types/conference";

const CONFERENCE_PROJECTION = /* groq */ `{
  _id,
  title,
  venue,
  mode,
  timing,
  date,
  summary,
  description,
  images[] {
    _key,
    alt,
    caption,
    "asset": asset.asset,
    "lqip": asset.asset->metadata.lqip,
    "dimensions": asset.asset->metadata.dimensions
  },
  video {
    title,
    caption,
    "url": asset.asset->url,
    "posterUrl": poster.asset->url,
    "posterLqip": poster.asset->metadata.lqip
  },
  "abstractBookUrl": abstractBook.asset->url,
  link
}`;

const ALL_CONFERENCES_QUERY = /* groq */ `
  *[
    _type == "conferenceEvent" &&
    !(_id in path("drafts.**"))
  ]
  | order(date desc, _id desc)
  ${CONFERENCE_PROJECTION}
`;

export async function fetchAllConferenceEvents(): Promise<ConferenceEventsResult> {
  const events = await sanityClient.fetch<ConferenceEvent[]>(ALL_CONFERENCES_QUERY);
  return { events };
}
