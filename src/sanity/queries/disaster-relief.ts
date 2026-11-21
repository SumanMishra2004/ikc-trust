import { sanityClient } from "../client";
import type {
  DisasterReliefEvent,
  DisasterReliefEventsResult,
  PaginationCursor,
} from "@/types/disaster-relief";

export const PAGE_SIZE = 5;

const EVENT_PROJECTION = /* groq */ `{
  _id,
  title,
  objective,
  date,
  venue,
  mode,
  description,
  eventType,
  images[] {
    _key,
    alt,
    caption,
    "asset": asset.asset,
    "lqip": asset.asset->metadata.lqip,
    "dimensions": asset.asset->metadata.dimensions
  },
  videos[] {
    _key,
    title,
    caption,
    "url": asset.asset->url,
    "posterUrl": poster.asset->url,
    "posterLqip": poster.asset->metadata.lqip
  },
  mediaCoverage[] {
    _key,
    type,
    title,
    description,
    "imageUrl": image.asset->url,
    imageAlt,
    "imageLqip": image.asset->metadata.lqip,
    youtubeUrl,
    source,
    coverageDate
  }
}`;

const INITIAL_QUERY = /* groq */ `
  *[
    _type == "disasterReliefEvent" &&
    !(_id in path("drafts.**")) &&
    defined(date)
  ]
  | order(date desc, _id desc)
  [0...${PAGE_SIZE + 1}]
  ${EVENT_PROJECTION}
`;

const CURSOR_QUERY = /* groq */ `
  *[
    _type == "disasterReliefEvent" &&
    !(_id in path("drafts.**")) &&
    defined(date) &&
    (
      date < $lastDate ||
      (date == $lastDate && _id < $lastId)
    )
  ]
  | order(date desc, _id desc)
  [0...${PAGE_SIZE + 1}]
  ${EVENT_PROJECTION}
`;

export async function fetchInitialDisasterReliefEvents(): Promise<DisasterReliefEventsResult> {
  const raw = await sanityClient.fetch<DisasterReliefEvent[]>(INITIAL_QUERY);
  return buildResult(raw);
}

export async function fetchMoreDisasterReliefEvents(
  cursor: PaginationCursor
): Promise<DisasterReliefEventsResult> {
  const raw = await sanityClient.fetch<DisasterReliefEvent[]>(CURSOR_QUERY, {
    lastDate: cursor.lastDate,
    lastId: cursor.lastId,
  });
  return buildResult(raw);
}

function buildResult(raw: DisasterReliefEvent[]): DisasterReliefEventsResult {
  const hasMore = raw.length > PAGE_SIZE;
  const events = raw.slice(0, PAGE_SIZE);
  const cursor: PaginationCursor | null =
    events.length > 0
      ? { lastDate: events[events.length - 1].date, lastId: events[events.length - 1]._id }
      : null;
  return { events, hasMore, cursor };
}
