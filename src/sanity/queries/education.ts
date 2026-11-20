import { sanityClient } from "../client";
import type {
  EducationEvent,
  EducationEventsResult,
  PaginationCursor,
} from "@/types/education";

/** Number of events shown per page. */
export const PAGE_SIZE = 5;

/**
 * Fields projected for each education event.
 * We fetch the asset reference fully to build optimised image URLs client-side.
 */
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
  }
}`;

/**
 * Initial query — no cursor, fetch the first PAGE_SIZE + 1 documents.
 * The extra document tells us whether there are more pages.
 */
const INITIAL_QUERY = /* groq */ `
  *[
    _type == "educationEvent" &&
    !(_id in path("drafts.**")) &&
    defined(date)
  ]
  | order(date desc, _id desc)
  [0...${PAGE_SIZE + 1}]
  ${EVENT_PROJECTION}
`;

/**
 * Cursor query — fetches the next PAGE_SIZE + 1 documents after the cursor.
 *
 * Uses compound cursor: (date < lastDate) OR (date == lastDate AND _id < lastId)
 * This is stable even when records are added or modified during browsing.
 */
const CURSOR_QUERY = /* groq */ `
  *[
    _type == "educationEvent" &&
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

/**
 * Fetch the initial batch of education events (no cursor).
 */
export async function fetchInitialEducationEvents(): Promise<EducationEventsResult> {
  const raw = await sanityClient.fetch<EducationEvent[]>(INITIAL_QUERY);
  return buildResult(raw);
}

/**
 * Fetch the next batch of education events using a cursor.
 */
export async function fetchMoreEducationEvents(
  cursor: PaginationCursor
): Promise<EducationEventsResult> {
  const raw = await sanityClient.fetch<EducationEvent[]>(CURSOR_QUERY, {
    lastDate: cursor.lastDate,
    lastId: cursor.lastId,
  });
  return buildResult(raw);
}

/**
 * Splits the raw PAGE_SIZE+1 result into displayable events, hasMore flag,
 * and the next cursor derived from the last *displayed* event.
 */
function buildResult(raw: EducationEvent[]): EducationEventsResult {
  const hasMore = raw.length > PAGE_SIZE;
  const events = raw.slice(0, PAGE_SIZE);

  const cursor: PaginationCursor | null =
    events.length > 0
      ? {
          lastDate: events[events.length - 1].date,
          lastId: events[events.length - 1]._id,
        }
      : null;

  return { events, hasMore, cursor };
}
